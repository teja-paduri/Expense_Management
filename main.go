package main

import (
	"expense_management/database"
	"expense_management/routes"

	"github.com/gofiber/fiber"
	//"github.com/gofiber/fiber/middleware/cors"
)

func main() {
	database.Connect()

	app := fiber.New()

	routes.Setup(app)

	app.Listen(":8000")
}
