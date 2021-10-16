package services

import (
	"encoding/json"
	"fmt"
	"messanger/models"
	"messanger/types"
	"strconv"
	"strings"

	"github.com/antoniodipinto/ikisocket"
	"github.com/gofiber/fiber/v2"
)

func SetupConversationSocketListeners() {
	// Note: This function is responsbile for firing custom events
	// ALL logic should be handled by custom events not this func.
	ikisocket.On(ikisocket.EventMessage, func(ep *ikisocket.EventPayload) {
		event := &types.SocketEvent{}

		if err := json.Unmarshal(ep.Data, event); err != nil {
			fmt.Println("Cannot parse JSON. (1)")

			return
		}

		ep.Kws.Fire(event.Event, []byte(ep.Data))
	})

	ikisocket.On(string(types.ConversationMessageEvent), func(ep *ikisocket.EventPayload) {
		message := &types.ConversationMessageDTO{}

		if err := json.Unmarshal(ep.Data, message); err != nil {
			fmt.Println("Cannot parse JSON. (3)")

			return
		}

		relationship, err := models.FindRelationshipByID(message.RelationshipID)

		if err != nil {
			fmt.Println("Relationship with specified ID does not exist.")

			return
		}

		currentUserID := ep.SocketAttributes["uid"].(uint)

		if relationship.UserA != currentUserID && relationship.UserB != currentUserID {
			fmt.Println("User is not part of this relationship.")

			return
		}

		if relationship.Status != models.Friends {
			fmt.Println("The other user has not accepted your friend request.")

			return
		}

		err = models.CreateConversationMessage(message.RelationshipID, message.Content, currentUserID)

		if err != nil {
			fmt.Println("Could not send message. Try again later.")

			return
		}

		// otherUserID := relationship.UserA

		// if currentUserID == otherUserID {
		// 	otherUserID = relationship.UserB
		// }

		event := &types.ConversationMessageReceived{
			Event:          string(types.ConversationMessageReceivedEvent),
			RelationshipID: relationship.ID,
		}

		eventJson, err := json.Marshal(event)

		if err == nil {
			ep.Kws.EmitToList(
				[]string{Users[relationship.UserA], Users[relationship.UserB]},
				[]byte(eventJson),
			)
		}
	})
}

// Get Conversation Messages
// @Summary Get all messages for specified conversation.
// @Tags Conversations
// @Produce json
// @Param id path int true "Relationship ID"
// @Success 200 {object} types.ConversationMessages
// @Failure 400 {object} types.ErrorResponse
// @Router /conversations/{id} [get]
func GetConversationMessages(c *fiber.Ctx) error {
	currentUserID := c.Locals("USER_ID").(uint)
	rID := c.Params("ID")

	relationshipID, err := strconv.ParseUint(rID, 10, 32)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Could not fetch your messages. (1)",
			},
		})
	}

	// Validate if user is part of relationship
	relationship, err := models.FindRelationshipByID(uint(relationshipID))

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Could not fetch your messages. (2)",
			},
		})
	}

	if relationship.UserA != currentUserID && relationship.UserB != currentUserID {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Could not fetch your messages. (3)",
			},
		})
	}

	// Fetch Messages
	messages := models.GetConversationMessages(relationship.ID)

	result := []types.ConversationMessage{}

	for _, v := range messages {
		split := strings.SplitN(v, ":", 2)
		content := split[1]

		result = append(result, types.ConversationMessage{
			Author:  split[0] == strconv.FormatUint(uint64(currentUserID), 10),
			Content: content,
		})
	}

	// Fetch Score
	yourScore := models.GetScore(relationship.ID, currentUserID)
	foeScore := models.GetScore(relationship.ID, getOtherUserID(relationship, currentUserID))

	return c.JSON(&types.ConversationMessages{
		Score: types.GameScore{
			You: yourScore,
			Foe: foeScore,
		},
		Messages: result,
	})
}
