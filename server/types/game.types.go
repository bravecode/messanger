package types

type GameChoiceDTO struct {
	RelationshipID uint   `json:"relationship_id" validate:"required"`
	Choice         string `json:"choice" validate:"required"`
}
