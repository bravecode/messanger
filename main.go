package main

import (
	"messanger/database"
	"messanger/models"
	"messanger/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	// Get Env Variables
	err := godotenv.Load(".env")

	if err != nil {
		panic("Could not load .env file")
	}

	database.Connect()
	database.Migrate(&models.Room{}, &models.User{})

	app := fiber.New()

	routes.AuthRoutes(app)
	routes.RoomRoutes(app)

	app.Listen(":8000")
}
