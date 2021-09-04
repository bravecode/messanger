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
	_, err := database.Conn.Do(
		"HMSET",
		fmt.Sprintf("relationship:%d:game", relationshipID),
		"RelationshipID",
		relationshipID,
		"UserAction",
		userAction,
		"UserID",
		userID,
	)

	if err != nil {
		return err
	}

	return nil
}

func GetCurrentGame(relationshipID uint) (*Game, error) {
	t, _ := redis.Uint64(database.Conn.Do(
		"HLEN",
		fmt.Sprintf("relationship:%d:game", relationshipID),
	))

	if t == 0 {
		return nil, errors.New("relationship does not exist")
	}

	res, err := redis.Values(database.Conn.Do(
		"HGETALL",
		fmt.Sprintf("relationship:%d:game", relationshipID),
	))

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
	_, err := database.Conn.Do(
		"del",
		fmt.Sprintf("relationship:%d:game", relationshipID),
	)

	if err != nil {
		return errors.New("relationship does not exist")
	}

	return nil
}

func IncreaseScore(relationshipID uint, userID uint) error {
	database.Conn.Do(
		"INCR",
		fmt.Sprintf("relationship:%d:score:%d", relationshipID, userID),
	)

	return nil
}

func DecreaseScore(relationshipID uint, userID uint) error {
	database.Conn.Do(
		"DECR",
		fmt.Sprintf("relationship:%d:score:%d", relationshipID, userID),
	)

	return nil
}

func GetScore(relationshipID uint, userID uint) uint {
	res, err := redis.Uint64(
		database.Conn.Do(
			"GET",
			fmt.Sprintf("relationship:%d:score:%d", relationshipID, userID),
		),
	)

	if err != nil {
		return 0
	}

	return uint(res)
}
