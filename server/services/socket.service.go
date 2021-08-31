package services

import (
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

	// TODO: Notify user's friends to update status.
	kws.Broadcast([]byte("New user in the house."), true)

	//Write welcome message
	kws.Emit([]byte("Connected"))
}
