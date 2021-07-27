package routes

import (
	"fmt"

	"github.com/antoniodipinto/ikisocket"
	"github.com/gofiber/fiber/v2"
)

func SocketRoutes(app *fiber.App) {
	users := map[string]string{}

	app.Get("/ws/:userID", ikisocket.New(func(kws *ikisocket.Websocket) {
		// Note: this should be extracted from JWT token because any user can pick any userid
		// Connect userID & socketID
		userID := kws.Params("userID")
		users[userID] = kws.UUID

		// Store ID in session
		kws.SetAttribute("uid", userID)

		// TODO: Notify user's friends to update status.
		kws.Broadcast([]byte("New user in the house."), true)

		//Write welcome message
		kws.Emit([]byte("Connected"))
	}))

	ikisocket.On(ikisocket.EventDisconnect, func(ep *ikisocket.EventPayload) {
		fmt.Println("User with ID is deleted: ")
		fmt.Println(ep.Kws.GetAttribute("uid"))
	})

	ikisocket.On(ikisocket.EventMessage, func(ep *ikisocket.EventPayload) {
		fmt.Println(fmt.Sprintf("Message event - User: %s - Message: %s", ep.Kws.GetStringAttribute("uid"), string(ep.Data)))
	})
}
