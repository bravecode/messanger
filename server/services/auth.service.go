package services

import (
	"messanger/models"
	"messanger/types"
	"messanger/utils/auth"
	validatorUtils "messanger/utils/validator"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// Login
// @Summary Access your account
// @Tags Auth
// @Accept json
// @Produce json
// @Param data body types.LoginDTO true "Login Data"
// @Success 200 {object} types.AuthResponse
// @Failure 400 {object} types.ErrorResponse
// @Failure 404 {object} types.ErrorResponse
// @Router /auth/login [post]
func Login(c *fiber.Ctx) error {
	v := validator.New()
	b := new(types.LoginDTO)

	if err := c.BodyParser(b); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	if err := v.Struct(b); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: validatorUtils.FormatValidatorErrors(err),
		})
	}

	// Find User
	user, err := models.FindUserByEmail(b.Email)

	if err != nil {
		return c.Status(404).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	if err := verifyPassword(user.Password, b.Password); err != nil {
		return c.Status(404).JSON(&types.ErrorResponse{
			Errors: []string{
				"Invalid email or password",
			},
		})
	}

	return c.Status(200).JSON(&types.AuthResponse{
		Auth: &types.AccessResponse{
			Token: auth.EncodeToken(&auth.TokenPayload{
				ID: user.ID,
			}),
		},
		User: &types.UserResponse{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		},
	})
}

// Register
// @Summary Create new account
// @Tags Auth
// @Accept json
// @Produce json
// @Param data body types.RegisterDTO true "Register Data"
// @Success 200 {object} types.AuthResponse
// @Failure 400 {object} types.ErrorResponse
// @Router /auth/register [post]
func Register(c *fiber.Ctx) error {
	v := validator.New()
	b := new(types.RegisterDTO)

	if err := c.BodyParser(b); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	if err := v.Struct(b); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: validatorUtils.FormatValidatorErrors(err),
		})
	}

	// Make sure email is unique
	err := models.IsUserEmailUnique(b.Email)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"User already exists.",
			},
		})
	}

	// Create User
	index := models.GetNextUserID()

	err = models.CreateUser(&models.User{
		ID:       index,
		Username: b.Username,
		Email:    b.Email,
		Password: hashPassword(b.Password),
	})

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	models.IncreaseNextUserID()

	return c.Status(200).JSON(&types.AuthResponse{
		Auth: &types.AccessResponse{
			Token: auth.EncodeToken(&auth.TokenPayload{
				ID: index,
			}),
		},
		User: &types.UserResponse{
			ID:       index,
			Username: b.Username,
			Email:    b.Email,
		},
	})
}

// Profile
// @Summary Fetch info about signed in user
// @Tags Auth
// @Produce json
// @Success 200 {object} types.UserResponse
// @Failure 400 {object} types.ErrorResponse
// @Router /auth/profile [get]
// @Security ApiKeyAuth
func Profile(c *fiber.Ctx) error {
	uid := c.Locals("USER_ID").(uint)

	user, err := models.FindUserByID(uid)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	return c.Status(200).JSON(&types.UserResponse{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
	})
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
