package types

type SocketEventType string

const (
	ConversationOpen    SocketEventType = "CONVERSATION:OPEN"
	ConversationMessage SocketEventType = "CONVERSATION:MESSAGE"
	RelationshipRefresh SocketEventType = "RELATIONSHIP:REFRESH"
)

type SocketEvent struct {
	Event string `json:"event" validate:"required"`
}

type SocketResponse struct {
	Success bool     `json:"success" validate:"required"`
	Errors  []string `json:"errors"`
}
