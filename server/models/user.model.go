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
	c := database.DBPool.Get()

	index, err := redis.Int(c.Do(
		"GET",
		"users:index",
	))

	if err != nil || index == 0 {
		index = 1

		c.Do(
			"SET",
			"users:index",
			index,
		)
	}

	c.Close()

	return uint(index)
}

func IncreaseNextUserID() {
	c := database.DBPool.Get()

	c.Do(
		"INCR",
		"users:index",
	)

	c.Close()
}

func CreateUser(values *User) error {
	c := database.DBPool.Get()

	hmset, err := c.Do(
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
		c.Close()

		return errors.New("something went wrong. Try again later 1")
	}

	// Store Email
	sadd, err := c.Do(
		"SADD",
		fmt.Sprintf("users:email:%s", values.Email),
		values.ID,
	)

	if err != nil || sadd == nil {
		c.Close()

		return errors.New("something went wrong. Try again later 2")
	}

	// Store Email for search feature
	_, err = c.Do(
		"SET",
		fmt.Sprintf("users:username:%s", values.Username),
		values.ID,
	)

	c.Close()

	if err != nil || sadd == nil {
		return errors.New("something went wrong. Try again later 3")
	}

	return nil
}

func IsUserEmailUnique(email string) error {
	c := database.DBPool.Get()

	res, err := redis.Int(c.Do(
		"SCARD",
		fmt.Sprintf("users:email:%s", email),
	))

	c.Close()

	if err != nil || res != 0 {
		return errors.New("user already exists")
	}

	return nil
}

func FindUserByEmail(email string) (*User, error) {
	c := database.DBPool.Get()

	uid, err := redis.Ints(c.Do(
		"SMEMBERS",
		fmt.Sprintf("users:email:%s", email),
	))

	if err != nil || len(uid) != 1 {
		c.Close()

		return nil, errors.New("invalid email or password")
	}

	u, err := redis.Values(c.Do(
		"HGETALL",
		fmt.Sprintf("users:%d", uid[0]),
	))

	c.Close()

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
	c := database.DBPool.Get()

	u, err := redis.Values(
		c.Do(
			"HGETALL",
			fmt.Sprintf("users:%d", id),
		),
	)

	c.Close()

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
	c := database.DBPool.Get()
	result := []*types.UserSearchResponse{}

	users, err := redis.Strings(c.Do(
		"KEYS",
		fmt.Sprintf("users:username:%s*", name),
	))

	if err != nil {
		c.Close()

		return nil, errors.New("something went wrong")
	}

	for _, k := range users {
		v, _ := redis.Int(c.Do(
			"GET",
			k,
		))

		u, _ := FindUserByID(uint(v))

		result = append(result, &types.UserSearchResponse{
			ID:       u.ID,
			Username: u.Username,
		})
	}

	c.Close()

	return result, nil
}
