package services

import (
	"messanger/models"
	"messanger/types"
	validatorUtils "messanger/utils/validator"
	"strconv"

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

	relationships, err := models.FindRelationshipsForUser(currentUserID)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	result := &types.RelationshipResponse{
		Friends:          []types.RelationshipResponseItem{},
		IncomingRequests: []types.RelationshipResponseItem{},
		OutgoingRequests: []types.RelationshipResponseItem{},
	}

	for _, rid := range relationships {
		r, err := models.FindRelationshipByID(rid)

		if err == nil {
			if r.Status == models.Friends {
				result.Friends = append(result.Friends, types.RelationshipResponseItem{
					ID:     r.ID,
					UserID: getOtherUserID(r, currentUserID),
				})
			}

			if r.Status == models.RequestedFromA && r.UserA == currentUserID {
				result.OutgoingRequests = append(result.OutgoingRequests, types.RelationshipResponseItem{
					ID:     r.ID,
					UserID: getOtherUserID(r, currentUserID),
				})
			}

			if r.Status == models.RequestedFromB && r.UserB == currentUserID {
				result.IncomingRequests = append(result.IncomingRequests, types.RelationshipResponseItem{
					ID:     r.ID,
					UserID: getOtherUserID(r, currentUserID),
				})
			}
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

	// Validate if user Exists
	_, err := models.FindUserByID(b.To)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	index := models.GetNextRelationshipID()

	r := &models.Relationship{
		ID:     index,
		UserA:  currentUserID,
		UserB:  b.To,
		Status: models.RequestedFromA,
	}

	// Check if Unique
	err = models.IsRelationshipUnique(r.UserA, r.UserB)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	// Create Relationship
	err = models.CreateRelationship(r)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	models.IncreaseNextRelationshipID()

	// Emit Socket Message
	// ikisocket.EmitTo(Users[b.To], []byte("New Invite for you!"))

	return c.JSON(&types.RelationshipResponseItem{
		ID:     r.ID,
		UserID: getOtherUserID(r, currentUserID),
	})
}

func RelationshipAccept(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("ID"), 10, 32)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Something went wrong. Try again later.",
			},
		})
	}

	r, err := models.FindRelationshipByID(uint(id))

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	// Is user part of the relationship?
	currentUserID := c.Locals("USER_ID").(uint)

	if r.Status == models.RequestedFromA && r.UserA == currentUserID {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"You are not able to accept this request.",
			},
		})
	}

	if r.Status == models.RequestedFromB && r.UserB == currentUserID {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"You are not able to accept this request.",
			},
		})
	}

	if r.UserA != currentUserID && r.UserB != currentUserID {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"You are not able to accept this request.",
			},
		})
	}

	// Update Relationship
	err = models.UpdateRelationshipStatus(uint(id), models.Friends)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	// Emit Socket Message
	// ikisocket.EmitToList([]string{Users[r.UserA], Users[r.UserB]}, []byte("Invite Accepted!"))

	return c.SendStatus(200)
}

func RelationshipDecline(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("ID"), 10, 32)

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"Something went wrong. Try again later.",
			},
		})
	}

	r, err := models.FindRelationshipByID(uint(id))

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	// Is user part of the relationship?
	currentUserID := c.Locals("USER_ID").(uint)

	if r.UserA != currentUserID && r.UserB != currentUserID {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				"You are not able to accept this request.",
			},
		})
	}

	// Update Relationship
	err = models.DeleteRelationship(uint(id))

	if err != nil {
		return c.Status(400).JSON(&types.ErrorResponse{
			Errors: []string{
				err.Error(),
			},
		})
	}

	// Emit Socket Message
	// ikisocket.EmitToList([]string{Users[r.UserA], Users[r.UserB]}, []byte("Invite Accepted!"))

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
