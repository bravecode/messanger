package models

import "gorm.io/gorm"

// I want each room to have password, have an ability to query
// all users in the room as well as their messages.
type Room struct {
	gorm.Model
	Name  string
	Theme string
}
