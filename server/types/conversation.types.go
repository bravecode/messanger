package types

type ConversationMessageDTO struct {
	RelationshipID uint   `json:"relationship_id"`
	Content        string `json:"content"`
}

type ConversationOpenDTO struct {
	RelationshipID uint `json:"relationship_id"`
}
