package models

import (
	"errors"
	"fmt"
	"messanger/database"

	"github.com/gomodule/redigo/redis"
)

func GetConversationMessages(id uint) []string {
	res, _ := redis.Strings(
		database.Conn.Do(
			"LRANGE",
			fmt.Sprintf("relationship:%d:messages", id),
			"1",
			"-1",
		),
	)

	return res
}

func CreateConversationMessage(id uint, message string, userID uint) error {
	_, err := database.Conn.Do(
		"RPUSH",
		fmt.Sprintf("relationship:%d:messages", id),
		fmt.Sprintf("%d:%s", userID, message),
	)

	if err != nil {
		return errors.New("something went wrong")
	}

	return nil
}

func CreateConversation(id uint, userA uint, userB uint) error {
	_, err := database.Conn.Do(
		"SADD",
		fmt.Sprintf("users:%d:conversations", userA),
		id,
	)

	if err != nil {
		return errors.New("something went wrong while opening conversation (1)")
	}

	_, err = database.Conn.Do(
		"SADD",
		fmt.Sprintf("users:%d:conversations", userB),
		id,
	)

	if err != nil {
		return errors.New("something went wrong while opening conversation (2)")
	}

	return nil
}
