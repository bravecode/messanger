package types

type SocketEventType string

const (
	ConversationOpenEvent            SocketEventType = "CONVERSATION:OPEN"
	ConversationMessageEvent         SocketEventType = "CONVERSATION:MESSAGE"
	RelationshipRefreshEvent         SocketEventType = "RELATIONSHIP:REFRESH"
	ConversationMessageReceivedEvent SocketEventType = "CONVERSATION:MESSAGE:RECEIVED"
	UpdateUserStatusEvent            SocketEventType = "USER:STATUS"
	GameStartEvent                   SocketEventType = "GAME:START"
	GameResultEvent                  SocketEventType = "GAME:RESULT"
)

type SocketEvent struct {
	Event string `json:"event" validate:"required"`
}

type SocketResponse struct {
	Success bool     `json:"success" validate:"required"`
	Errors  []string `json:"errors"`
}

type UpdateUserStatus struct {
	Event  string `json:"event" validate:"required"`
	UserID uint   `json:"id" validate:"required"`
	Online bool   `json:"online" validate:"required"`
}
