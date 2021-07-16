package types

type LoginDTO struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=3"`
}

type RegisterDTO struct {
	LoginDTO
	Username string `json:"username" validate:"required,min=3,max=16"`
}

type UserResponse struct {
	ID       uint   `json:"id" validate:"required"`
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"-"`
}

type AccessResponse struct {
	Token string `json:"token" validate:"required"`
}

type AuthResponse struct {
	User *UserResponse   `json:"user" validate:"required"`
	Auth *AccessResponse `json:"auth" validate:"required"`
}
