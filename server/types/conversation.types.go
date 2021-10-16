package types

type ConversationMessageDTO struct {
	RelationshipID uint   `json:"relationship_id" validate:"required"`
	Content        string `json:"content" validate:"required"`
}

type ConversationOpenDTO struct {
	RelationshipID uint `json:"relationship_id" validate:"required"`
}

type Conversation struct {
	RelationshipID uint   `json:"relationship_id" validate:"required"`
	LastMessage    string `json:"last_message"`
}

type ConversationMessages struct {
	Score    GameScore             `json:"score" validate:"required"`
	Messages []ConversationMessage `json:"messages" validate:"required"`
}

type ConversationMessage struct {
	Author  bool   `json:"author" validate:"required"`
	Content string `json:"content" validate:"required"`
}

type ConversationMessageReceived struct {
	Event          string `json:"event" validate:"required"`
	RelationshipID uint   `json:"relationshipID" validate:"required"`
}
