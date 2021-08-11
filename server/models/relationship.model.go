package models

type RelationshipStatus string

const (
	RequestedFromA RelationshipStatus = "requested_from_a"
	RequestedFromB RelationshipStatus = "requested_from_b"
	Friends        RelationshipStatus = "friends"
)

type Relationship struct {
	UserA  uint               `gorm:"not null"`
	UserB  uint               `gorm:"not null"`
	Status RelationshipStatus `gorm:"not null"`
}
