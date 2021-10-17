package models

import (
	"errors"
	"fmt"
	"messanger/database"

	"github.com/gomodule/redigo/redis"
)

type Game struct {
	RelationshipID uint   `json:"relationship_id" validate:"required"`
	UserAction     string `json:"user_action" validate:"required"`
	UserID         uint   `json:"user_id" validate:"required"`
}

func CreateGame(relationshipID uint, userAction string, userID uint) error {
	c := database.DBPool.Get()

	_, err := c.Do(
		"HMSET",
		fmt.Sprintf("relationship:%d:game", relationshipID),
		"RelationshipID",
		relationshipID,
		"UserAction",
		userAction,
		"UserID",
		userID,
	)

	c.Close()

	if err != nil {
		return err
	}

	return nil
}

func GetCurrentGame(relationshipID uint) (*Game, error) {
	c := database.DBPool.Get()

	t, _ := redis.Uint64(c.Do(
		"HLEN",
		fmt.Sprintf("relationship:%d:game", relationshipID),
	))

	if t == 0 {
		c.Close()

		return nil, errors.New("relationship does not exist")
	}

	res, err := redis.Values(c.Do(
		"HGETALL",
		fmt.Sprintf("relationship:%d:game", relationshipID),
	))

	c.Close()

	if err != nil {
		return nil, errors.New("relationship does not exist")
	}

	game := &Game{}
	err = redis.ScanStruct(res, game)

	if err != nil {
		return nil, errors.New("relationship does not exist")
	}

	return game, nil
}

func DeleteCurrentGame(relationshipID uint) error {
	c := database.DBPool.Get()

	_, err := c.Do(
		"del",
		fmt.Sprintf("relationship:%d:game", relationshipID),
	)

	c.Close()

	if err != nil {
		return errors.New("relationship does not exist")
	}

	return nil
}

func IncreaseScore(relationshipID uint, userID uint) error {
	c := database.DBPool.Get()

	c.Do(
		"INCR",
		fmt.Sprintf("relationship:%d:score:%d", relationshipID, userID),
	)

	c.Close()

	return nil
}

func DecreaseScore(relationshipID uint, userID uint) error {
	c := database.DBPool.Get()

	c.Do(
		"DECR",
		fmt.Sprintf("relationship:%d:score:%d", relationshipID, userID),
	)

	c.Close()

	return nil
}

func GetScore(relationshipID uint, userID uint) uint {
	c := database.DBPool.Get()

	res, err := redis.Uint64(
		c.Do(
			"GET",
			fmt.Sprintf("relationship:%d:score:%d", relationshipID, userID),
		),
	)

	c.Close()

	if err != nil {
		return 0
	}

	return uint(res)
}
