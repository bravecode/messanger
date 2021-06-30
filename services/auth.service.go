package services

import (
	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	return c.SendString("Auth - Login")
}

func Register(c *fiber.Ctx) error {
	return c.SendString("Auth - Register")
}
