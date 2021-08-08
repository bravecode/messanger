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
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func main() {
	// Get Env Variables
	err := godotenv.Load(".env")

	if err != nil {
		panic("Could not load .env file")
	}

	database.Connect()
	database.Migrate(&models.User{})
	database.Migrate(&models.Relationship{})

	app := fiber.New()

	// CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	// Swagger
	app.Get("/swagger/*", swagger.Handler)

	routes.AuthRoutes(app)
	routes.RelationshipRoutes(app)

	// Note: This needs to be last, because of "Upgrade needed" error message
	routes.SocketRoutes(app)

	app.Listen(":8000")
}
