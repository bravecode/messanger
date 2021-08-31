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
	Messages []string `json:"messages" validate:"required"`
}
