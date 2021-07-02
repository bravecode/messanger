package middleware

import (
	"messanger/utils/auth"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Auth(c *fiber.Ctx) error {
	h := c.Get("Authorization")

	if h == "" {
		return c.Status(fiber.StatusUnauthorized).SendString("Unauthorized")
	}

	split := strings.Split(h, " ")

	if len(split) < 2 {
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid Token")
	}

	user, err := auth.ValidateToken(split[1])

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).SendString(err.Error())
	}

	c.Locals("USER_ID", user.ID)

	return c.Next()
}
