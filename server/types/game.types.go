package types

type GameChoiceDTO struct {
	RelationshipID uint   `json:"relationship_id" validate:"required"`
	Choice         string `json:"choice" validate:"required"`
}

type GameStart struct {
	Event          string `json:"event" validate:"required"`
	RelationshipID uint   `json:"relationship_id" validate:"required"`
}

type GameScore struct {
	You uint `json:"you" validate:"required"`
	Foe uint `json:"foe" validate:"required"`
}

type GameResult struct {
	Event          string    `json:"event" validate:"required"`
	RelationshipID uint      `json:"relationship_id" validate:"required"`
	Result         int       `json:"result" validate:"required"`
	Score          GameScore `json:"score" validate:"required"`
}
