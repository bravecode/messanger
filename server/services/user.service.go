package services

import (
	"fmt"
	"messanger/models"
	"messanger/types"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func SearchUsers(c *fiber.Ctx) error {
	name := c.Query("username")

	if len(name) < 3 {
		return c.SendStatus(400)
	}

	users, err := models.SearchUsersByUsername(makeUsernameCaseInsensitive(name))

	if err != nil {
		return c.Status(404).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	return c.Status(200).JSON(users)
}

func makeUsernameCaseInsensitive(query string) string {
	result := ""

	for _, char := range query {
		result += fmt.Sprintf("[%s%s]", strings.ToLower(string(char)), strings.ToUpper(string(char)))
	}

	return result
}
