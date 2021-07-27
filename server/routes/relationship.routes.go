package routes

import (
	"messanger/services"
	"messanger/utils/middleware"

	"github.com/gofiber/fiber/v2"
)

func RelationshipRoutes(app *fiber.App) {
	group := app.Use(middleware.Auth).Group("/relationship")

	// Protected Routes
	group.Get("/", services.RelationshipList)
	group.Post("/", services.RelationshipInvite)
	group.Get("/:ID/accept", services.RelationshipAccept)
	group.Get("/:ID/decline", services.RelationshipDecline)
}
