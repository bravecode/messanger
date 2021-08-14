package services

import (
	"fmt"
	"messanger/models"
	"messanger/types"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// Search for a user
// @Summary Search for users with specified username.
// @Tags Users
// @Produce json
// @Param username query string true "Username query value" minlength(3)
// @Success 200 {array} types.UserSearchResponse
// @Failure 400 {object} types.ErrorResponse
// @Router /users/search [get]
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
