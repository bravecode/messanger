package validator

import (
	"strings"

	"github.com/go-playground/validator"
)

func FormatValidatorErrors(err error) []string {
	result := []string{}

	for _, err := range err.(validator.ValidationErrors) {
		var message string

		// Get Field's Name
		split := strings.Split(err.StructNamespace(), ".")
		message += "Field " + split[len(split)-1] + " "

		switch err.Tag() {
		case "required":
			message += "is required."
		case "min":
			message += "need to have minimum length of " + err.Param() + "."
		case "max":
			message += "need to have maximum length of " + err.Param() + "."
		case "email":
			message += "must be a valid email."
		case "unique":
			message += "must be unique."
		default:
			message += "is invalid (undentified error)."
		}

		result = append(result, message)
	}

	return result
}
