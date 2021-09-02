package types

type SocketEventType string

const (
	ConversationOpenEvent            SocketEventType = "CONVERSATION:OPEN"
	ConversationMessageEvent         SocketEventType = "CONVERSATION:MESSAGE"
	RelationshipRefreshEvent         SocketEventType = "RELATIONSHIP:REFRESH"
	ConversationMessageReceivedEvent SocketEventType = "CONVERSATION:MESSAGE:RECEIVED"
)

type SocketEvent struct {
	Event string `json:"event" validate:"required"`
}

type SocketResponse struct {
	Success bool     `json:"success" validate:"required"`
	Errors  []string `json:"errors"`
}
