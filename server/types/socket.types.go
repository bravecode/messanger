package types

type SocketEvent struct {
	Event string `json:"event" validate:"required"`
}
