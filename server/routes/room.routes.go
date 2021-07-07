package routes

import (
	"github.com/antoniodipinto/ikisocket"
	"github.com/gofiber/fiber/v2"
)

func RoomRoutes(app *fiber.App) {
	group := app.Group("/rooms")

	group.Get("/:ID/connect", ikisocket.New(func(kws *ikisocket.Websocket) {
		roomID := kws.Params("ID")

		if roomID == "" {
			println("Room ID is nto specified.")

			return
		}

		kws.Broadcast([]byte("New user in the house."), true)

		// Welcome Message
		kws.EmitTo(kws.UUID, []byte("Hello World."))
	}))
}
