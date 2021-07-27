package services

import (
	"messanger/database"
	"messanger/models"
	"messanger/types"
	validatorUtils "messanger/utils/validator"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
)

func RelationshipList(c *fiber.Ctx) error {
	currentUserID := c.Locals("USER_ID")

	var r []models.Relationship

	if err := database.DB.Find(&r, "user_a = ? OR user_b = ?", currentUserID, currentUserID); err.Error != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	return c.Status(200).JSON(r)
}

func RelationshipInvite(c *fiber.Ctx) error {
	b := new(types.RelationshipInviteDTO)

	if err := c.BodyParser(b); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	v := validator.New()

	if err := v.Struct(b); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: validatorUtils.FormatValidatorErrors(err),
		})
	}

	currentUserID := c.Locals("USER_ID").(uint)

	// Check if user exist (may be solved by relations)

	vr := &models.Relationship{}
	r := &models.Relationship{}

	// TODO: Clean this code, it's ugly
	if currentUserID < b.To {
		r.UserA = currentUserID
		r.UserB = b.To
		r.Status = models.RequestedFromA

		if err := models.FindRelationship(vr, "user_a = ? AND user_b = ?", currentUserID, b.To); err.Error == nil {
			return c.Status(400).JSON(&types.ErrorResponse{
				Errors: []string{
					"Relationship already exists.",
				},
			})
		}
	} else {
		r.UserA = b.To
		r.UserB = currentUserID
		r.Status = models.RequestedFromB

		if err := models.FindRelationship(vr, "user_a = ? AND user_b = ?", b.To, currentUserID); err.Error == nil {
			return c.Status(400).JSON(&types.ErrorResponse{
				Errors: []string{
					"Relationship already exists.",
				},
			})
		}
	}

	if err := models.CreateRelationship(r); err.Error != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	return c.JSON(&types.RelationshipResponse{
		UserA:  r.UserA,
		UserB:  r.UserB,
		Status: r.Status,
	})
}

// TODO: Definitely there is more clear way to do this
func RelationshipAccept(c *fiber.Ctx) error {
	rid := c.Params("ID")

	r := &models.Relationship{}

	if err := models.FindRelationship(r, "id = ?", rid); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	// Verify if user is a part of this relationship
	currentUserID := c.Locals("USER_ID").(uint)

	if r.UserA != currentUserID && r.UserB != currentUserID {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Relationship with specified ID does not exist.",
			},
		})
	}

	if err := database.DB.Model(&models.Relationship{}).Where("id = ?", rid).Update("status", models.Friends); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	return c.SendStatus(200)
}

func RelationshipDecline(c *fiber.Ctx) error {
	rid := c.Params("ID")

	r := &models.Relationship{}

	if err := models.FindRelationship(r, "id = ?", rid); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	// Verify if user is a part of this relationship
	currentUserID := c.Locals("USER_ID").(uint)

	if r.UserA != currentUserID && r.UserB != currentUserID {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Relationship with specified ID does not exist.",
			},
		})
	}

	if err := models.DeleteRelationship(r); err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	return c.SendStatus(200)
}
