package services

import (
	"messanger/models"
	"messanger/types"
	validatorUtils "messanger/utils/validator"
	"strconv"

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
			otherUserID := getOtherUserID(r, currentUserID)
			otherUser, _ := models.FindUserByID(otherUserID)

			if r.Status == models.Friends {
				result.Friends = append(result.Friends, types.RelationshipResponseItem{
					ID:       r.ID,
					UserID:   otherUser.ID,
					Username: otherUser.Username,
				})

				continue
			}

			if (r.Status == models.RequestedFromA && r.UserA == currentUserID) || (r.Status == models.RequestedFromB && r.UserB == currentUserID) {
				result.OutgoingRequests = append(result.OutgoingRequests, types.RelationshipResponseItem{
					ID:       r.ID,
					UserID:   otherUser.ID,
					Username: otherUser.Username,
				})

				continue
			}

			result.IncomingRequests = append(result.IncomingRequests, types.RelationshipResponseItem{
				ID:       r.ID,
				UserID:   otherUser.ID,
				Username: otherUser.Username,
			})
		}
	}

	return c.Status(200).JSON(result)
}

// Invite User
// @Summary Sends friend request to specified user.
// @Tags Relationship
// @Produce json
// @Param data body types.RelationshipInviteDTO true "Invite Data"
// @Success 200 {array} types.RelationshipResponseItem
// @Failure 400 {object} types.ErrorResponse
// @Router /relationship [post]
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
	otherUser, err := models.FindUserByID(b.To)

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
	ikisocket.EmitToList([]string{Users[r.UserA], Users[r.UserB]}, []byte("relationships:refresh"))

	return c.JSON(&types.RelationshipResponseItem{
		ID:       r.ID,
		UserID:   otherUser.ID,
		Username: otherUser.Username,
	})
}

// Accept Friend request
// @Summary Accept friend request.
// @Tags Relationship
// @Param id path int true "Relationship ID"
// @Success 200
// @Failure 400 {object} types.ErrorResponse
// @Router /relationship/{id}/accept [get]
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
	ikisocket.EmitToList([]string{Users[r.UserA], Users[r.UserB]}, []byte("relationships:refresh"))

	return c.SendStatus(200)
}

// Decline Friend request
// @Summary Decline friend request.
// @Tags Relationship
// @Param id path int true "Relationship ID"
// @Success 200
// @Failure 400 {object} types.ErrorResponse
// @Router /relationship/{id}/decline [get]
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
	ikisocket.EmitToList([]string{Users[r.UserA], Users[r.UserB]}, []byte("relationships:refresh"))

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
