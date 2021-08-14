package models

import (
	"errors"
	"fmt"
	"messanger/database"

	"github.com/gomodule/redigo/redis"
)

type RelationshipStatus string

const (
	RequestedFromA RelationshipStatus = "requested_from_a"
	RequestedFromB RelationshipStatus = "requested_from_b"
	Friends        RelationshipStatus = "friends"
)

type Relationship struct {
	ID     uint
	UserA  uint
	UserB  uint
	Status RelationshipStatus
}

func GetNextRelationshipID() uint {
	index, err := redis.Int(database.Conn.Do(
		"GET",
		"relationship:index",
	))

	if err != nil || index == 0 {
		index = 1

		database.Conn.Do(
			"SET",
			"relationship:index",
			index,
		)
	}

	return uint(index)
}

func IncreaseNextRelationshipID() {
	database.Conn.Do(
		"INCR",
		"relationship:index",
	)
}

func IsRelationshipUnique(userA uint, userB uint) error {
	exists, err := redis.Ints(database.Conn.Do(
		"SINTER",
		fmt.Sprintf("users:%d:relationships", userA),
		fmt.Sprintf("users:%d:relationships", userB),
	))

	if err != nil || len(exists) > 0 {
		return errors.New("relationship already exists")
	}

	return nil
}

func FindRelationshipByID(id uint) (*Relationship, error) {
	r, err := redis.Values(database.Conn.Do(
		"HGETALL",
		fmt.Sprintf("relationship:%d", id),
	))

	if err != nil {
		return nil, errors.New("something went wrong. Try again later")
	}

	relationship := &Relationship{}

	err = redis.ScanStruct(r, relationship)

	if err != nil {
		return nil, errors.New("something went wrong. Try again later")
	}

	return relationship, nil
}

func FindRelationshipsForUser(uid uint) ([]uint, error) {
	r, err := redis.Ints(database.Conn.Do(
		"SMEMBERS",
		fmt.Sprintf("users:%d:relationships", uid),
	))

	if err != nil {
		return nil, errors.New("something went wrong. Try again later")
	}

	ur := []uint{}

	for _, val := range r {
		ur = append(ur, uint(val))
	}

	return ur, nil
}

func CreateRelationship(values *Relationship) error {
	// Create Hash
	_, err := database.Conn.Do(
		"HMSET",
		fmt.Sprintf("relationship:%d", values.ID),
		"ID",
		values.ID,
		"Status",
		values.Status,
		"UserA",
		values.UserA,
		"UserB",
		values.UserB,
	)

	if err != nil {
		return errors.New("something went wrong. Try again later 1")
	}

	// Assign relationship to user
	_, err = database.Conn.Do(
		"SADD",
		fmt.Sprintf("users:%d:relationships", values.UserA),
		values.ID,
	)

	if err != nil {
		return errors.New("something went wrong. Try again later 2")
	}

	_, err = database.Conn.Do(
		"SADD",
		fmt.Sprintf("users:%d:relationships", values.UserB),
		values.ID,
	)

	if err != nil {
		return errors.New("something went wrong. Try again later 3")
	}

	// Assign users to relationship
	_, err = database.Conn.Do(
		"SADD",
		fmt.Sprintf("relationship:%d:users", values.ID),
		values.UserA,
		values.UserB,
	)

	if err != nil {
		return errors.New("something went wrong. Try again later 4")
	}

	return nil
}

func UpdateRelationshipStatus(id uint, status RelationshipStatus) error {
	_, err := database.Conn.Do(
		"HSET",
		fmt.Sprintf("relationship:%d", id),
		"Status",
		status,
	)

	if err != nil {
		return errors.New("something went wrong. Try again later")
	}

	return nil
}

func DeleteRelationship(id uint) error {
	// Get Users of the relation
	users, err := redis.Ints(database.Conn.Do(
		"SMEMBERS",
		fmt.Sprintf("relationship:%d:users", id),
	))

	if err != nil {
		return errors.New("something went wrong. Try again later")
	}

	// Remove Hash
	database.Conn.Do(
		"DEL",
		fmt.Sprintf("relationship:%d", id),
	)

	// Remove Relations (Relationship)
	database.Conn.Do(
		"DEL",
		fmt.Sprintf("relationship:%d:users", id),
	)

	// Remove Relations (Users)
	for _, user := range users {
		database.Conn.Do(
			"SREM",
			fmt.Sprintf("users:%d:relationships", user),
			id,
		)
	}

	return nil
}
