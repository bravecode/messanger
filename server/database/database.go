package database

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// In the future instead of sqlite it would be nice to finally
// integrate with noSQL database such as MongoDB just for practice
// and a little break from relational databases.
func Connect() {
	db, err := gorm.Open(sqlite.Open("database.db"))

	if err != nil {
		panic("Database Connection - Fail")
	}

	DB = db

	fmt.Println("Database Connection - Success")
}

func Migrate(tables ...interface{}) error {
	return DB.AutoMigrate(tables...)
}
