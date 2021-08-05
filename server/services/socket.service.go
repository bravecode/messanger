package services

import (
	"github.com/antoniodipinto/ikisocket"
)

// This is global variable, may be replaced with Redis later on
var Users = map[uint]string{}

func SocketConnection(kws *ikisocket.Websocket) {
	// Connect userID & socketID
	userID := kws.Locals("USER_ID").(uint)
	Users[userID] = kws.UUID

	// Store ID in session
	kws.SetAttribute("uid", userID)

	// TODO: Notify user's friends to update status.
	kws.Broadcast([]byte("New user in the house."), true)

	//Write welcome message
	kws.Emit([]byte("Connected"))
}
