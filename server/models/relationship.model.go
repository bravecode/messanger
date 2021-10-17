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
	c := database.DBPool.Get()

	index, err := redis.Int(c.Do(
		"GET",
		"relationship:index",
	))

	c.Close()

	if err != nil || index == 0 {
		index = 1

		c.Do(
			"SET",
			"relationship:index",
			index,
		)
	}

	return uint(index)
}

func IncreaseNextRelationshipID() {
	c := database.DBPool.Get()

	c.Do(
		"INCR",
		"relationship:index",
	)

	c.Close()
}

func IsRelationshipUnique(userA uint, userB uint) error {
	c := database.DBPool.Get()

	exists, err := redis.Ints(c.Do(
		"SINTER",
		fmt.Sprintf("users:%d:relationships", userA),
		fmt.Sprintf("users:%d:relationships", userB),
	))

	c.Close()

	if err != nil || len(exists) > 0 {
		return errors.New("relationship already exists")
	}

	return nil
}

func FindRelationshipByID(id uint) (*Relationship, error) {
	c := database.DBPool.Get()

	r, err := redis.Values(c.Do(
		"HGETALL",
		fmt.Sprintf("relationship:%d", id),
	))

	c.Close()

	if err != nil {
		fmt.Println("----------")
		fmt.Println(id)
		fmt.Println(err.Error())
		return nil, errors.New("something went wrong. Try again later (1)")
	}

	relationship := &Relationship{}

	err = redis.ScanStruct(r, relationship)

	if err != nil {
		return nil, errors.New("something went wrong. Try again later (2)")
	}

	return relationship, nil
}

func FindRelationshipsForUser(uid uint) ([]uint, error) {
	c := database.DBPool.Get()

	r, err := redis.Ints(c.Do(
		"SMEMBERS",
		fmt.Sprintf("users:%d:relationships", uid),
	))

	c.Close()

	if err != nil {
		return nil, errors.New("something went wrong. Try again later (1)")
	}

	ur := []uint{}

	for _, val := range r {
		ur = append(ur, uint(val))
	}

	return ur, nil
}

func CreateRelationship(values *Relationship) error {
	c := database.DBPool.Get()

	// Create Hash
	_, err := c.Do(
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
		c.Close()

		return errors.New("something went wrong. Try again later (1)")
	}

	// Assign relationship to user
	_, err = c.Do(
		"SADD",
		fmt.Sprintf("users:%d:relationships", values.UserA),
		values.ID,
	)

	if err != nil {
		c.Close()

		return errors.New("something went wrong. Try again later (2)")
	}

	_, err = c.Do(
		"SADD",
		fmt.Sprintf("users:%d:relationships", values.UserB),
		values.ID,
	)

	if err != nil {
		c.Close()

		return errors.New("something went wrong. Try again later (3)")
	}

	// Assign users to relationship
	_, err = c.Do(
		"SADD",
		fmt.Sprintf("relationship:%d:users", values.ID),
		values.UserA,
		values.UserB,
	)

	c.Close()

	if err != nil {
		return errors.New("something went wrong. Try again later (4)")
	}

	return nil
}

func UpdateRelationshipStatus(id uint, status RelationshipStatus) error {
	c := database.DBPool.Get()

	_, err := c.Do(
		"HSET",
		fmt.Sprintf("relationship:%d", id),
		"Status",
		status,
	)

	c.Close()

	if err != nil {
		return errors.New("something went wrong. Try again later (1)")
	}

	return nil
}

func DeleteRelationship(id uint) error {
	c := database.DBPool.Get()

	// Get Users of the relation
	users, err := redis.Ints(c.Do(
		"SMEMBERS",
		fmt.Sprintf("relationship:%d:users", id),
	))

	if err != nil {
		c.Close()

		return errors.New("something went wrong. Try again later (1)")
	}

	// Remove Hash
	c.Do(
		"DEL",
		fmt.Sprintf("relationship:%d", id),
	)

	// Remove Relations (Relationship)
	c.Do(
		"DEL",
		fmt.Sprintf("relationship:%d:users", id),
	)

	// Remove Relations (Users)
	for _, user := range users {
		c.Do(
			"SREM",
			fmt.Sprintf("users:%d:relationships", user),
			id,
		)
	}

	c.Close()

	return nil
}
