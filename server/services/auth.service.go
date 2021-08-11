package services

import (
	"fmt"
	"messanger/database"
	"messanger/models"
	"messanger/types"
	"messanger/utils/auth"
	validatorUtils "messanger/utils/validator"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/gomodule/redigo/redis"
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

	uid, err := redis.Ints(database.Conn.Do(
		"SMEMBERS",
		fmt.Sprintf("users:email:%s", b.Email),
	))

	if err != nil || len(uid) != 1 {
		return c.Status(404).JSON(&types.ErrorResponse{
			Errors: []string{
				"Invalid email or password",
			},
		})
	}

	u, err := redis.Values(database.Conn.Do(
		"HGETALL",
		fmt.Sprintf("users:%d", uid[0]),
	))

	if err != nil {
		return c.Status(404).JSON(&types.ErrorResponse{
			Errors: []string{
				"Invalid email or password",
			},
		})
	}

	var user models.User
	err = redis.ScanStruct(u, &user)

	if err != nil {
		return c.Status(404).JSON(&types.ErrorResponse{
			Errors: []string{
				"Invalid email or password",
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

	// TODO: This returns ugly error message, refactor it later on
	if err := v.Struct(b); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: validatorUtils.FormatValidatorErrors(err),
		})
	}

	// Check if user already exists
	res, err := redis.Int(database.Conn.Do(
		"SCARD",
		fmt.Sprintf("users:email:%s", b.Email),
	))

	if err != nil || res != 0 {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"User already exists.",
			},
		})
	}

	// Get next user ID
	index, err := redis.Int(database.Conn.Do(
		"GET",
		"users:index",
	))

	if err != nil || index == 0 {
		index = 0

		database.Conn.Do(
			"SET",
			"users:index",
			index,
		)
	}

	uindex := uint(index)

	// Create User
	user, err := database.Conn.Do(
		"HMSET",
		fmt.Sprintf("users:%d", index),
		"ID",
		uindex,
		"Email",
		b.Email,
		"Username",
		b.Username,
		"Password",
		hashPassword(b.Password),
	)

	if err != nil || user == nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Something went wrong. Try again later.",
			},
		})
	}

	sadd, err := database.Conn.Do(
		"SADD",
		fmt.Sprintf("users:email:%s", b.Email),
		uindex,
	)

	if err != nil || sadd == nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Something went wrong. Try again later.",
			},
		})
	}

	database.Conn.Do(
		"INCR",
		"users:index",
	)

	return c.Status(200).JSON(&types.AuthResponse{
		Auth: &types.AccessResponse{
			Token: auth.EncodeToken(&auth.TokenPayload{
				ID: uindex,
			}),
		},
		User: &types.UserResponse{
			ID:       uindex,
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

	u, err := redis.Values(
		database.Conn.Do(
			"HGETALL",
			fmt.Sprintf("users:%d", uid),
		),
	)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Something went wrong.",
			},
		})
	}

	var user models.User
	err = redis.ScanStruct(u, &user)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Something went wrong.",
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
