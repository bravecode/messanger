package routes

import (
	"messanger/services"

	"github.com/antoniodipinto/ikisocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func SocketRoutes(app *fiber.App) {
	app.Get("/ws/:id", ikisocket.New(services.SocketConnection)).Use(upgradeMiddleware)
}

func upgradeMiddleware(c *fiber.Ctx) error {
	if websocket.IsWebSocketUpgrade(c) {
		c.Locals("allowed", true)
		return c.Next()
	}
	return fiber.ErrUpgradeRequired
}
