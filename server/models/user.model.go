package models

import (
	"fmt"
	"messanger/database"

	"github.com/gomodule/redigo/redis"
)

type User struct {
	ID       uint
	Username string
	Email    string
	Password string
}

func CreateUser(user *User) error {
	i, err := redis.Uint64(database.Conn.Do(
		"GET",
		"users:index",
	))

	if err != nil {
		if _, err := database.Conn.Do("SET", "users:index", 0); err != nil {
			return err
		}

		i = 0
	}

	// Create Users HSET
	if _, err := database.Conn.Do(
		"HSET",
		fmt.Sprintf("users:%d", i),
		"ID",
		i,
		"username",
		user.Username,
		"email",
		user.Email,
		"password",
		user.Password,
	); err != nil {
		return err
	}

	// Create Set for User's Email
	if _, err := database.Conn.Do(
		"SADD",
		fmt.Sprintf("users:email:%s", user.Email),
		i,
	); err != nil {
		return err
	}

	// Increase Index for the next user
	if _, err := database.Conn.Do(
		"INCR",
		"users:index",
	); err != nil {
		return err
	}

	user = &User{
		ID:       uint(i),
		Username: user.Username,
		Email:    user.Email,
		Password: user.Password,
	}

	return nil
}

func FindUserByEmail(email string) (User, error) {
	var user User

	// Get ID
	uid, err := database.Conn.Do("SMEMBERS", fmt.Sprintf("users:email:%s", email))

	if err != nil {
		return user, err
	}

	// Get Record
	if result, err := redis.Values(database.Conn.Do("HGETALL", uid)); err != nil {
		return user, err
	} else {
		err = redis.ScanStruct(result, &user)

		if err != nil {
			return user, err
		}
	}

	return user, nil
}
