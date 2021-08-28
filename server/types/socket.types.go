package types

type SocketEvent struct {
	Event string `json:"event" validate:"required"`
}

type SocketResponse struct {
	Success bool     `json:"success" validate:"required"`
	Errors  []string `json:"errors"`
}
