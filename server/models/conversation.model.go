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
