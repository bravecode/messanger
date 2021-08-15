package types

type SocketUser struct {
	SID string
	UID int32
}

type SocketEvent struct {
	Event string `json:"event" validate:"required"`
}
