package main

import (
	"expenseManagement/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	// "gorm.io/gorm"
)

// var db *gorm.DB

func main() {
	// database.Connect()
	// connection, err := gorm.Open(sqlite.Open("./expense_management.db"), &gorm.Config{})
	db, err := gorm.Open("sqlite3", "/Users/suryatejapaduri/UF/SE/Expense_Management/expense_management.db")

	if err != nil {
		panic("DB connection failed !!")
	}
	defer db.Close()

	db.AutoMigrate(&models.User{})

	// DB = connection

	// connection.AutoMigrate(&models.User{})

	// app := fiber.New()

	// app.Use(cors.New(cors.Config{
	// 	AllowCredentials: true,
	// }))
	// routes.Setup(app)

	// app.Listen(":8000")
}
