package models

import (
	"errors"
	"fmt"
	"messanger/database"

	"github.com/gomodule/redigo/redis"
)

func GetConversationMessages(id uint) []string {
	c := database.DBPool.Get()

	res, _ := redis.Strings(
		c.Do(
			"LRANGE",
			fmt.Sprintf("relationship:%d:messages", id),
			"1",
			"-1",
		),
	)

	c.Close()

	return res
}

func CreateConversationMessage(id uint, message string, userID uint) error {
	c := database.DBPool.Get()

	_, err := c.Do(
		"RPUSH",
		fmt.Sprintf("relationship:%d:messages", id),
		fmt.Sprintf("%s:%d:%s", "USER", userID, message),
	)

	c.Close()

	if err != nil {
		return errors.New("something went wrong")
	}

	return nil
}

// Note: This is very poor execution of keeping game history, but I don't have time to implement something better. Maybe another time.
func CreateConversationSystemMessage(id uint, message string) error {
	c := database.DBPool.Get()

	_, err := c.Do(
		"RPUSH",
		fmt.Sprintf("relationship:%d:messages", id),
		fmt.Sprintf("%s:%d:%s", "SYS", 0, message),
	)

	c.Close()

	if err != nil {
		return errors.New("something went wrong")
	}

	return nil
}
