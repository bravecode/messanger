package services

import (
	"messanger/database"
	"messanger/models"
	"messanger/types"
	validatorUtils "messanger/utils/validator"

	"github.com/antoniodipinto/ikisocket"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
)

// List Relationships
// @Summary Get all relationships for signed in user.
// @Tags Relationship
// @Produce json
// @Success 200 {array} types.RelationshipResponse
// @Failure 400 {object} types.ErrorResponse
// @Router /relationship [get]
func RelationshipList(c *fiber.Ctx) error {
	currentUserID := c.Locals("USER_ID").(uint)

	var r []models.Relationship

	if err := database.DB.Find(&r, "user_a = ? OR user_b = ?", currentUserID, currentUserID); err.Error != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	result := &types.RelationshipResponse{
		Friends:          []types.RelationshipResponseItem{},
		IncomingRequests: []types.RelationshipResponseItem{},
		OutgoingRequests: []types.RelationshipResponseItem{},
	}

	for _, relationship := range r {
		if relationship.Status == models.Friends {
			result.Friends = append(result.Friends, types.RelationshipResponseItem{
				ID:     relationship.ID,
				UserID: getOtherUserID(&relationship, currentUserID),
			})
		}

		if relationship.Status == models.RequestedFromA && relationship.UserA == currentUserID {
			result.OutgoingRequests = append(result.OutgoingRequests, types.RelationshipResponseItem{
				ID:     relationship.ID,
				UserID: getOtherUserID(&relationship, currentUserID),
			})
		}

		if relationship.Status == models.RequestedFromB && relationship.UserB == currentUserID {
			result.IncomingRequests = append(result.IncomingRequests, types.RelationshipResponseItem{
				ID:     relationship.ID,
				UserID: getOtherUserID(&relationship, currentUserID),
			})
		}
	}

	return c.Status(200).JSON(result)
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

	ikisocket.EmitTo(Users[b.To], []byte("New Invite for you!"))

	return c.JSON(&types.RelationshipResponseItem{
		ID:     r.ID,
		UserID: getOtherUserID(r, currentUserID),
	})
}

// TODO: Definitely there is more clear way to do this
func RelationshipAccept(c *fiber.Ctx) error {
	rid := c.Params("ID")

	r := &models.Relationship{}

	if err := models.FindRelationship(r, "id = ?", rid); err.Error != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	// Verify if user is a part of this relationship
	currentUserID := c.Locals("USER_ID").(uint)

	if (r.UserA != currentUserID && r.Status == models.RequestedFromB) || (r.UserB != currentUserID && r.Status == models.RequestedFromA) {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Relationship with specified ID does not exist.",
			},
		})
	}

	if err := database.DB.Model(&models.Relationship{}).Where("id = ?", rid).Update("status", models.Friends); err.Error != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	ikisocket.EmitToList([]string{Users[r.UserA], Users[r.UserB]}, []byte("Invite Accepted!"))

	return c.SendStatus(200)
}

func RelationshipDecline(c *fiber.Ctx) error {
	rid := c.Params("ID")

	r := &models.Relationship{}

	if err := models.FindRelationship(r, "id = ?", rid); err.Error != nil {
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

	if err := models.DeleteRelationship(r); err.Error != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error.Error(),
			},
		})
	}

	ikisocket.EmitToList([]string{Users[r.UserA], Users[r.UserB]}, []byte("Invite Declined!"))

	return c.SendStatus(200)
}

// Helpers
func getOtherUserID(value *models.Relationship, currentUserID uint) uint {
	var otherUserID uint

	if value.UserA == currentUserID {
		otherUserID = value.UserB
	} else {
		otherUserID = value.UserA
	}

	return otherUserID
}
