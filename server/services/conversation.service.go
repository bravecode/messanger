package services

import (
	"encoding/json"
	"fmt"
	"messanger/models"
	"messanger/types"

	"github.com/antoniodipinto/ikisocket"
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

		currentUserID := ep.SocketAttributes["uid"].(uint)
		otherUserID := relationship.UserA

		if currentUserID == otherUserID {
			otherUserID = relationship.UserB
		}

		ep.Kws.EmitTo(
			Users[otherUserID],
			[]byte("conversation:open"),
		)
	})

	ikisocket.On("CONVERSATION:MESSAGE", func(ep *ikisocket.EventPayload) {
		message := &types.ConversationMessageDTO{}

		if err := json.Unmarshal(ep.Data, message); err != nil {
			fmt.Println("Cannot parse JSON. (3))")

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
