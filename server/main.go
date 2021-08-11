package main

import (
	"messanger/database"
	_ "messanger/docs"
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

	// Configure Database - Redis
	database.Connect()

	// Create Application Instnace
	app := fiber.New()

	// CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	// Swagger
	app.Get("/swagger/*", swagger.Handler)

	routes.AuthRoutes(app)
	routes.RelationshipRoutes(app)

	app.Listen(":8000")
}
