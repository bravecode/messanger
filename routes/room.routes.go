package routes

import (
	"messanger/services"

	"github.com/gofiber/fiber/v2"
)

func RoomRoutes(app *fiber.App) {
	group := app.Group("/rooms")

	group.Get("/", services.GetRooms)
}
