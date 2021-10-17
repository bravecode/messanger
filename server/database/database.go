package database

import (
	"fmt"
	"time"

	"github.com/gomodule/redigo/redis"
)

var DBPool *redis.Pool

// In the future instead of sqlite it would be nice to finally
// integrate with noSQL database such as MongoDB just for practice
// and a little break from relational databases.
func Connect() {
	DBPool = &redis.Pool{
		MaxIdle:     60,                // adjust to your needs
		IdleTimeout: 240 * time.Second, // adjust to your needs
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", "localhost:6379")

			if err != nil {
				panic("Database Connection - Fail (1)")
			}

			fmt.Println("Database Connection - Success")

			return c, err
		},
	}
}
