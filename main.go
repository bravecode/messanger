package main

import (
	"messanger/database"
	"messanger/models"
	"messanger/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Connect()
	database.Migrate(&models.Room{})

	app := fiber.New()

	routes.AuthRoutes(app)

	app.Listen(":8000")
}
