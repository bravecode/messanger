package auth

import (
	"errors"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type TokenPayload struct {
	ID uint
}

type TokenClaims struct {
	TokenPayload
	jwt.StandardClaims
}

func EncodeToken(payload *TokenPayload) string {
	duration, err := time.ParseDuration(os.Getenv("TOKEN_DURATION"))

	if err != nil {
		panic("Invalid token duration, checkout env.go file for mroe instructions.")
	}

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(duration).Unix(),
		"ID":  payload.ID,
	})

	token, err := t.SignedString([]byte(os.Getenv("TOKEN_SECRET")))

	if err != nil {
		panic(err)
	}

	return token
}

func ValidateToken(token string) (*TokenClaims, error) {
	parsed, err := jwt.ParseWithClaims(
		token,
		&TokenClaims{},
		func(t *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("TOKEN_SECRET")), nil
		},
	)

	if err != nil {
		return nil, err
	}

	claims, ok := parsed.Claims.(*TokenClaims)

	if !ok {
		return nil, err
	}

	if claims.ExpiresAt < time.Now().Local().Unix() {
		return nil, errors.New("token expires")
	}

	return claims, nil
}
