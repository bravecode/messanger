package models

import (
	"messanger/database"

	"gorm.io/gorm"
)

type RelationshipStatus string

const (
	RequestedFromA RelationshipStatus = "requested_from_a"
	RequestedFromB RelationshipStatus = "requested_from_b"
	Friends        RelationshipStatus = "friends"
)

type Relationship struct {
	gorm.Model
	UserA  uint               `gorm:"not null"`
	UserB  uint               `gorm:"not null"`
	Status RelationshipStatus `gorm:"not null"`
}

func GetRelationships(dest interface{}, conds ...interface{}) *gorm.DB {
	return database.DB.Find(dest, conds)
}

func FindRelationship(dest interface{}, conds ...interface{}) *gorm.DB {
	return database.DB.Model(&Relationship{}).Take(dest, conds...)
}

func CreateRelationship(relationship *Relationship) *gorm.DB {
	return database.DB.Create(relationship)
}

func DeleteRelationship(value interface{}) *gorm.DB {
	return database.DB.Delete(value)
}
