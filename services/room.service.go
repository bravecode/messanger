package services

import "github.com/gofiber/fiber/v2"

func GetRooms(c *fiber.Ctx) error {
	return c.SendString("All Rooms")
}
