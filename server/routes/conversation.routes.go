package routes

import (
	"messanger/services"
	"messanger/utils/middleware"

	"github.com/gofiber/fiber/v2"
)

func ConversationRoutes(app *fiber.App) {
	group := app.Group("/conversations").Use(middleware.Auth)

	group.Get("", services.GetConversations)
	group.Get("/:ID", services.GetConversationMessages)
}
