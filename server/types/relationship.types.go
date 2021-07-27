package types

import "messanger/models"

type RelationshipInviteDTO struct {
	To uint
}

type RelationshipResponse struct {
	UserA  uint
	UserB  uint
	Status models.RelationshipStatus
}
