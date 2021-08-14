package types

type UserSearchResponse struct {
	ID       uint   `json:"id" validate:"required"`
	Username string `json:"username" validate:"required"`
}
