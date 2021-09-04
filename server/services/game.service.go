package services

import (
	"encoding/json"
	"fmt"
	"messanger/models"
	"messanger/types"

	"github.com/antoniodipinto/ikisocket"
)

func SetupGameSocketListeners() {
	ikisocket.On("GAME:CHOICE", func(ep *ikisocket.EventPayload) {
		message := &types.GameChoiceDTO{}

		if err := json.Unmarshal(ep.Data, message); err != nil {
			fmt.Println("Cannot parse JSON. (2)")

			return
		}

		if !verifyChoice(message.Choice) {
			fmt.Println("This choice is not allowed.")

			return
		}

		relationship, err := models.FindRelationshipByID(message.RelationshipID)

		if err != nil {
			fmt.Println("Relationship with specified ID does not exist.")

			return
		}

		currentUserID := ep.SocketAttributes["uid"].(uint)

		if relationship.UserA != currentUserID && relationship.UserB != currentUserID {
			fmt.Println("User is not part of this relationship.")

			return
		}

		if relationship.Status != models.Friends {
			fmt.Println("The other user has not accepted your friend request.")

			return
		}

		currentGame, err := models.GetCurrentGame(relationship.ID)

		// IF last_move does not exist -> New Game
		if err != nil {
			models.CreateGame(
				relationship.ID,
				message.Choice,
				currentUserID,
			)

			// TODO: Send Socket Message about new game
			fmt.Println("New game has been created.")

			return
		}

		// If last action was made by current user block it
		if currentGame.UserID == currentUserID {
			fmt.Println("Not your turn.")

			return
		}

		// IF last_move exists then increase score and send proper message type
		gameResult := resolveGameScore(currentGame.UserAction, message.Choice)

		if gameResult == 1 {
			models.IncreaseScore(relationship.ID, currentUserID)

			fmt.Println("You've won")
		} else if gameResult == -1 {
			models.DecreaseScore(relationship.ID, currentUserID)

			fmt.Println("You've lost. Game Over.")
		} else {
			fmt.Println("DRAW")
		}

		// TODO: Send Socket Message with the result & Total Score

		models.DeleteCurrentGame(relationship.ID)
	})
}

func resolveGameScore(prevChoice string, currentChoice string) int {
	if prevChoice == currentChoice {
		return 0
	}

	if prevChoice == "paper" && currentChoice == "scissors" {
		return 1
	}

	if prevChoice == "scissors" && currentChoice == "rock" {
		return 1
	}

	if prevChoice == "rock" && currentChoice == "paper" {
		return 1
	}

	return -1
}

func verifyChoice(choice string) bool {
	if choice != "paper" && choice != "scissors" && choice != "rock" {
		return false
	}

	return true
}
