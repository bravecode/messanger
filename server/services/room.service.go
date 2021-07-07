package services

import (
	"github.com/gofiber/fiber/v2"
)

func RoomConnection(c *fiber.Ctx) error {
	return c.SendString("Test")
}
