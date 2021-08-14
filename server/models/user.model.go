package models

import (
	"errors"
	"fmt"
	"messanger/database"
	"messanger/types"

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
		index = 1

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
		return errors.New("something went wrong. Try again later 1")
	}

	// Store Email
	sadd, err := database.Conn.Do(
		"SADD",
		fmt.Sprintf("users:email:%s", values.Email),
		values.ID,
	)

	if err != nil || sadd == nil {
		return errors.New("something went wrong. Try again later 2")
	}

	// Store Email for search feature
	_, err = database.Conn.Do(
		"SET",
		fmt.Sprintf("users:username:%s", values.Username),
		values.ID,
	)

	if err != nil || sadd == nil {
		return errors.New("something went wrong. Try again later 3")
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

func SearchUsersByUsername(name string) ([]*types.UserSearchResponse, error) {
	result := []*types.UserSearchResponse{}

	users, err := redis.Strings(database.Conn.Do(
		"KEYS",
		fmt.Sprintf("users:username:%s*", name),
	))

	if err != nil {
		return nil, errors.New("something went wrong")
	}

	for _, k := range users {
		v, _ := redis.Int(database.Conn.Do(
			"GET",
			k,
		))

		u, _ := FindUserByID(uint(v))

		result = append(result, &types.UserSearchResponse{
			ID:       u.ID,
			Username: u.Username,
		})
	}

	return result, nil
}
