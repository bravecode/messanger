package routes

import (
	"fmt"
	"messanger/services"
	"messanger/utils/middleware"

	"github.com/antoniodipinto/ikisocket"
	"github.com/gofiber/fiber/v2"
)

func SocketRoutes(app *fiber.App) {
	app.Use(middleware.Auth).Get("/ws/connect", ikisocket.New(services.SocketConnection))

	ikisocket.On(ikisocket.EventDisconnect, func(ep *ikisocket.EventPayload) {
		fmt.Println("User with ID is deleted: ")
		fmt.Println(ep.Kws.GetAttribute("uid"))
	})

	ikisocket.On(ikisocket.EventMessage, func(ep *ikisocket.EventPayload) {
		fmt.Println(fmt.Sprintf("Message event - User: %s - Message: %s", ep.Kws.GetStringAttribute("uid"), string(ep.Data)))
	})
}
