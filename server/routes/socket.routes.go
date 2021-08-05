package routes

import (
	"fmt"
	"messanger/services"

	"github.com/antoniodipinto/ikisocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func SocketRoutes(app *fiber.App) {
	app.Use(func(c *fiber.Ctx) error {
		// IsWebSocketUpgrade returns true if the client
		// requested upgrade to the WebSocket protocol.
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	}).Get("/ws/:id", ikisocket.New(services.SocketConnection))

	ikisocket.On(ikisocket.EventDisconnect, func(ep *ikisocket.EventPayload) {
		fmt.Println("User with ID is deleted: ")
		fmt.Println(ep.Kws.GetAttribute("uid"))
	})

	ikisocket.On(ikisocket.EventMessage, func(ep *ikisocket.EventPayload) {
		fmt.Println(fmt.Sprintf("Message event - User: %s - Message: %s", ep.Kws.GetStringAttribute("uid"), string(ep.Data)))
	})
}
