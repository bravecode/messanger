package services

import (
	"errors"
	"messanger/models"
	"messanger/types"
	"messanger/utils/auth"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Login(c *fiber.Ctx) error {
	v := validator.New()
	b := new(types.LoginDTO)

	if err := c.BodyParser(b); err != nil {
		return err
	}

	// TODO: This returns ugly error message, refactor it later on
	if err := v.Struct(b); err != nil {
		return err
	}

	u := &types.UserResponse{}

	err := models.FindUserByEmail(u, b.Email).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(404).SendString("Invalid email or password")
	}

	if err := verifyPassword(u.Password, b.Password); err != nil {
		return c.Status(404).SendString("Invalid email or password")
	}

	return c.JSON(&types.AuthResponse{
		User: u,
		Auth: &types.AccessResponse{
			Token: auth.EncodeToken(&auth.TokenPayload{
				ID: u.ID,
			}),
		},
	})
}

// User should have unique email
func Register(c *fiber.Ctx) error {
	v := validator.New()
	b := new(types.RegisterDTO)

	if err := c.BodyParser(b); err != nil {
		return err
	}

	// TODO: This returns ugly error message, refactor it later on
	if err := v.Struct(b); err != nil {
		return err
	}

	err := models.FindUserByEmail(&struct{ ID string }{}, b.Email).Error

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(400).SendString("User with specified email already exists.")
	}

	u := &models.User{
		Username: b.Username,
		Password: hashPassword(b.Password),
		Email:    b.Email,
	}

	if err := models.CreateUser(u); err.Error != nil {
		return c.Status(400).SendString(err.Error.Error())
	}

	return c.JSON(&types.AuthResponse{
		User: &types.UserResponse{
			ID:       u.ID,
			Username: u.Username,
			Email:    u.Email,
		},
		Auth: &types.AccessResponse{
			Token: auth.EncodeToken(&auth.TokenPayload{
				ID: u.ID,
			}),
		},
	})
}

func Profile(c *fiber.Ctx) error {
	u := &types.UserResponse{}

	err := models.FindUser(u, "id = ?", c.Locals("USER_ID").(uint)).Error

	if err != nil {
		return c.Status(400).SendString(err.Error())
	}

	return c.JSON(u)
}

// Helpers
func hashPassword(raw string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(raw), 10)

	if err != nil {
		panic("Hasing password has failed.")
	}

	return string(hash)
}

func verifyPassword(hash string, raw string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(raw))
}