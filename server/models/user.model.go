package models

import (
	"errors"
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

func GetNextUserID() uint {
	index, err := redis.Int(database.Conn.Do(
		"GET",
		"users:index",
	))

	if err != nil || index == 0 {
		index = 0

		database.Conn.Do(
			"SET",
			"users:index",
			index,
		)
	}

	return uint(index)
}

func IncreaseNextUserID() {
	database.Conn.Do(
		"INCR",
		"users:index",
	)
}

func CreateUser(values *User) error {
	hmset, err := database.Conn.Do(
		"HMSET",
		fmt.Sprintf("users:%d", values.ID),
		"ID",
		values.ID,
		"Email",
		values.Email,
		"Username",
		values.Username,
		"Password",
		values.Password,
	)

	if err != nil || hmset == nil {
		return errors.New("something went wrong. Try again later")
	}

	sadd, err := database.Conn.Do(
		"SADD",
		fmt.Sprintf("users:email:%s", values.Email),
		values.ID,
	)

	if err != nil || sadd == nil {
		return errors.New("something went wrong. Try again later")
	}

	return nil
}

func IsUserEmailUnique(email string) error {
	res, err := redis.Int(database.Conn.Do(
		"SCARD",
		fmt.Sprintf("users:email:%s", email),
	))

	if err != nil || res != 0 {
		return errors.New("user already exists")
	}

	return nil
}

func FindUserByEmail(email string) (*User, error) {
	uid, err := redis.Ints(database.Conn.Do(
		"SMEMBERS",
		fmt.Sprintf("users:email:%s", email),
	))

	if err != nil || len(uid) != 1 {
		return nil, errors.New("invalid email or password")
	}

	u, err := redis.Values(database.Conn.Do(
		"HGETALL",
		fmt.Sprintf("users:%d", uid[0]),
	))

	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	user := &User{}
	err = redis.ScanStruct(u, user)

	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	return user, nil
}

func FindUserByID(id uint) (*User, error) {
	u, err := redis.Values(
		database.Conn.Do(
			"HGETALL",
			fmt.Sprintf("users:%d", id),
		),
	)

	if err != nil {
		return nil, errors.New("something went wrong")
	}

	user := &User{}
	err = redis.ScanStruct(u, user)

	if err != nil {
		return nil, errors.New("something went wrong")
	}

	return user, nil
}
