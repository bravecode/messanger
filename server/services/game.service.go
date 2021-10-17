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

		if err != nil {
			models.CreateGame(
				relationship.ID,
				message.Choice,
				currentUserID,
			)

			ev := &types.GameStart{
				Event:          string(types.GameStartEvent),
				RelationshipID: relationship.ID,
			}

			event, err := json.Marshal(ev)

			if err == nil {
				ep.Kws.EmitTo(
					Users[getOtherUserID(relationship, currentUserID)],
					[]byte(event),
				)
			}

			return
		}

		if currentGame.UserID == currentUserID {
			fmt.Println("Not your turn.")

			return
		}

		gameResult := resolveGameScore(currentGame.UserAction, message.Choice)

		yourScore := models.GetScore(relationship.ID, currentUserID)
		foeScore := models.GetScore(relationship.ID, currentGame.UserID)

		if gameResult == 1 {
			models.IncreaseScore(relationship.ID, currentUserID)

			ev := &types.GameResult{
				Event:          string(types.GameResultEvent),
				RelationshipID: relationship.ID,
				Result:         1,
				Score: types.GameScore{
					You: yourScore + 1,
					Foe: foeScore,
				},
			}

			event, err := json.Marshal(ev)

			if err == nil {
				ep.Kws.EmitTo(
					Users[currentUserID],
					[]byte(event),
				)
			}

			ev = &types.GameResult{
				Event:          string(types.GameResultEvent),
				RelationshipID: relationship.ID,
				Result:         -1,
				Score: types.GameScore{
					You: foeScore,
					Foe: yourScore + 1,
				},
			}

			event, err = json.Marshal(ev)

			if err == nil {
				ep.Kws.EmitTo(
					Users[currentGame.UserID],
					[]byte(event),
				)
			}

			user, err := models.FindUserByID(currentUserID)

			if err == nil {
				models.CreateConversationSystemMessage(relationship.ID, fmt.Sprintf("Rock, Paper, Scissors - %s has won the game!", user.Username))
			}
		} else if gameResult == -1 {
			models.IncreaseScore(relationship.ID, currentGame.UserID)

			ev := &types.GameResult{
				Event:          string(types.GameResultEvent),
				RelationshipID: relationship.ID,
				Result:         -1,
				Score: types.GameScore{
					You: yourScore,
					Foe: foeScore + 1,
				},
			}

			event, err := json.Marshal(ev)

			if err == nil {
				ep.Kws.EmitTo(
					Users[currentUserID],
					[]byte(event),
				)
			}

			ev = &types.GameResult{
				Event:          string(types.GameResultEvent),
				RelationshipID: relationship.ID,
				Result:         1,
				Score: types.GameScore{
					You: foeScore + 1,
					Foe: yourScore,
				},
			}

			event, err = json.Marshal(ev)

			if err == nil {
				ep.Kws.EmitTo(
					Users[currentGame.UserID],
					[]byte(event),
				)
			}

			user, err := models.FindUserByID(currentGame.UserID)

			if err == nil {
				models.CreateConversationSystemMessage(relationship.ID, fmt.Sprintf("Rock, Paper, Scissors - %s has won the game!", user.Username))
			}
		} else {
			ev := &types.GameResult{
				Event:          string(types.GameResultEvent),
				RelationshipID: relationship.ID,
				Result:         0,
				Score: types.GameScore{
					You: foeScore,
					Foe: yourScore,
				},
			}

			event, err := json.Marshal(ev)

			if err == nil {
				ep.Kws.EmitToList(
					[]string{Users[currentUserID], Users[currentGame.UserID]},
					[]byte(event),
				)
			}

			models.CreateConversationSystemMessage(relationship.ID, "Rock, Paper, Scissors - DRAW! Learn to play noobs.")
		}

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
