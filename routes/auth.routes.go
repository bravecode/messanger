package routes

import (
	"messanger/services"
	"messanger/utils/middleware"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	group := app.Group("/auth")

	// Public Routes
	group.Post("/login", services.Login)
	group.Post("/register", services.Register)

	// Protected Routes
	group.Use(middleware.Auth).Get("/profile", services.Profile)
}
