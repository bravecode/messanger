package services

import (
	"strconv"

	"github.com/antoniodipinto/ikisocket"
)

// This is global variable, may be replaced with Redis later on
var Users = map[uint]string{}

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
