package services

import (
	"encoding/json"
	"fmt"
	"messanger/database"
	"messanger/models"
	"messanger/types"

	"github.com/antoniodipinto/ikisocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gomodule/redigo/redis"
)

// Dummy Route
// @Summary This is a dummy route for generting socket types (WIP)
// @Tags Socket
// @Product json
// @Success 200 {object} types.SocketEvent
// @Success 200 {object} types.SocketResponse
// @Success 200 {object} types.ConversationMessageDTO
// @Success 200 {object} types.ConversationOpenDTO
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

	ikisocket.On("CONVERSATION:OPEN", func(ep *ikisocket.EventPayload) {
		message := &types.ConversationOpenDTO{}

		if err := json.Unmarshal(ep.Data, message); err != nil {
			fmt.Println("Cannot parse JSON. (2)")

			return
		}

		relationship, err := models.FindRelationshipByID(message.RelationshipID)

		if err != nil {
			fmt.Println("Relationship with specified ID does not exist.")

			return
		}

		err = models.CreateConversation(relationship.ID, relationship.UserA, relationship.UserB)

		if err != nil {
			fmt.Println(err)

			return
		}

		response, err := json.Marshal(&types.Conversation{
			RelationshipID: relationship.ID,
			Messages:       []string{"Siema"},
		})

		if err != nil {
			fmt.Println("Could not fetch specified conversation.")

			return
		}

		ep.Kws.EmitToList(
			[]string{Users[relationship.UserA], Users[relationship.UserB]},
			[]byte(response),
		)
	})

	ikisocket.On("CONVERSATION:MESSAGE", func(ep *ikisocket.EventPayload) {
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

		err = models.CreateConversationMessage(message.RelationshipID, message.Content)

		if err != nil {
			fmt.Println("Could not send message. Try again later.")

			return
		}

		otherUserID := relationship.UserA

		if currentUserID == otherUserID {
			otherUserID = relationship.UserB
		}

		ep.Kws.EmitTo(Users[otherUserID], []byte(message.Content))
	})
}

// List Conversations
// @Summary Get all conversations for signed in user.
// @Tags Conversations
// @Produce json
// @Success 200 {array} types.Conversation
// @Failure 400 {object} types.ErrorResponse
// @Router /conversations [get]
func GetConversations(c *fiber.Ctx) error {
	currentUserID := c.Locals("USER_ID").(uint)

	// Get Relationship IDs
	relations, err := redis.Ints(
		database.Conn.Do(
			"SMEMBERS",
			fmt.Sprintf("users:%d:conversations", currentUserID),
		),
	)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Could not fetch your conversations.",
			},
		})
	}

	// Get Messages
	response := []types.Conversation{}

	for _, relation := range relations {
		relationID := uint(relation)

		response = append(response, types.Conversation{
			RelationshipID: relationID,
			Messages:       []string{},
		})
	}

	return c.JSON(response)
}
