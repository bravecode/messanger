package routes

import (
	"messanger/services"
	"messanger/utils/middleware"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	group := app.Group("/users").Use(middleware.Auth)

	group.Get("/search", services.SearchUsers)
}
