package services

import (
	"encoding/json"
	"messanger/models"
	"messanger/types"
	"strconv"

	"github.com/antoniodipinto/ikisocket"
)

// This is global variable, may be replaced with Redis later on
var Users = map[uint]string{}

// Dummy Route
// @Summary This is a dummy route for generting socket types
// @Tags Socket
// @Product json
// @Success 200 {object} types.SocketEvent
// @Success 200 {object} types.SocketEventType
// @Success 200 {object} types.SocketResponse
// @Success 200 {object} types.ConversationMessageDTO
// @Success 200 {object} types.ConversationOpenDTO
// @Success 200 {object} types.GameChoiceDTO
// @Success 200 {object} types.GameResult
func SocketConnection(kws *ikisocket.Websocket) {
	// Connect userID & socketID
	userID, err := strconv.ParseInt(kws.Params("id"), 10, 32)

	if err != nil {
		// TODO: This should not stop application
		panic("Unable to convert")
	}

	Users[uint(userID)] = kws.UUID

	// Store ID in session
	kws.SetAttribute("uid", uint(userID))

	// Notify user's friends to update status.
	friends, err := models.FindRelationshipsForUser(uint(userID))

	if err == nil {
		friendsSocketIds := []string{}

		for _, v := range friends {
			if val, ok := Users[v]; ok {
				friendsSocketIds = append(friendsSocketIds, val)
			}

			event := &types.UpdateUserStatus{
				Event:  string(types.UpdateUserStatusEvent),
				UserID: uint(userID),
				Online: true,
			}

			eventJson, err := json.Marshal(event)

			if err == nil {
				kws.EmitToList(friendsSocketIds, []byte(eventJson))
			}

		}
	}

	//Write welcome message
	kws.Emit([]byte("Connected"))
}
