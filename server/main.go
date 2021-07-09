package main

import (
	"messanger/database"
	_ "messanger/docs"
	"messanger/models"
	"messanger/routes"

	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

// @title Messanger API
// @version 1.0
// @description Learning GO (with Fiber) by creating messanger copy.
// @host localhost:8000
// @BasePath /
func main() {
	// Get Env Variables
	err := godotenv.Load(".env")

	if err != nil {
		panic("Could not load .env file")
	}

	database.Connect()
	database.Migrate(&models.User{})

	app := fiber.New()

	// CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	// Swagger
	app.Get("/swagger/*", swagger.Handler)

	routes.AuthRoutes(app)
	routes.RoomRoutes(app)

	app.Listen(":8000")
}
