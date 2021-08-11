package database

import (
	"fmt"

	"github.com/gomodule/redigo/redis"
)

var Conn redis.Conn

// In the future instead of sqlite it would be nice to finally
// integrate with noSQL database such as MongoDB just for practice
// and a little break from relational databases.
func Connect() {
	conn, err := redis.Dial("tcp", "localhost:6379")

	if err != nil {
		panic("Database Connection - Fail")
	}

	Conn = conn

	fmt.Println("Database Connection - Success")
}
