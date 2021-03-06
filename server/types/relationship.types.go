package types

type RelationshipInviteDTO struct {
	To uint `json:"to" validate:"required"`
}

type RelationshipResponseItem struct {
	ID          uint   `json:"id" validate:"required"`
	UserID      uint   `json:"user_id" validate:"required"`
	Username    string `json:"username" validate:"required"`
	Online      bool   `json:"online"`
	LastMessage string `json:"last_message"`
}

type RelationshipResponse struct {
	Friends          []RelationshipResponseItem `json:"friends" validate:"required"`
	IncomingRequests []RelationshipResponseItem `json:"incoming_requests" validate:"required"`
	OutgoingRequests []RelationshipResponseItem `json:"outgoing_requests" validate:"required"`
}
