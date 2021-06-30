package routes

import (
	"messanger/services"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	group := app.Group("/auth")

	group.Post("/login", services.Login)
	group.Post("/register", services.Register)
}
