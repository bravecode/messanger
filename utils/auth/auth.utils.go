package auth

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func EncodeToken(ID uint) string {
	duration, err := time.ParseDuration(os.Getenv("TOKEN_DURATION"))

	if err != nil {
		panic("Invalid token duration, checkout env.go file for mroe instructions.")
	}

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(duration).Unix(),
		"ID":  ID,
	})

	token, err := t.SignedString([]byte(os.Getenv("TOKEN_SECRET")))

	if err != nil {
		panic(err)
	}

	return token
}

func DecodeToken() string {
	return "Token decoded"
}

func VerifyToken() string {
	return "Token verified"
}
