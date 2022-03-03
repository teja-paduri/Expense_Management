package main

import (
	"expenseManagement/database"
	"expenseManagement/models"
	"expenseManagement/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
	database.Connect()
	connection, err := gorm.Open(sqlite.Open("expense_management.db"), &gorm.Config{})

	if err != nil {
		panic("DB connection failed !!")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	routes.Setup(app)

	app.Listen(":8000")
}
