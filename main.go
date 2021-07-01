package main

import (
	"messanger/database"
	"messanger/models"
	"messanger/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Connect()
	database.Migrate(&models.Room{}, &models.User{})

	app := fiber.New()

	routes.AuthRoutes(app)
	routes.RoomRoutes(app)

	app.Listen(":8000")
}
