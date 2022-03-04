package main

import (
	"expenseManagement/controllers"
	"expenseManagement/database"
	"fmt"
	"log"
	"net/http"
	"os"

	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
	// database.Connect()
	// connection, err := gorm.Open(sqlite.Open("expense_management.db"), &gorm.Config{})

	// if err != nil {
	// 	panic("DB connection failed !!")
	// }

	// DB = connection

	// connection.AutoMigrate(&models.User{})

	// app := fiber.New()

	// app.Use(cors.New(cors.Config{
	// 	AllowCredentials: true,
	// }))
	// routes.Setup(app)

	// app.Listen(":8000")
	store, err := database.NewExpenseStoreSQL()
	if err != nil {
		log.Fatalf("could not connect to db: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	server := controllers.ExpenseServer{store}
	loggedServer := controllers.Logger(&server)
	fmt.Printf("Listening on port: %v\t(http://localhost:%v)\n", port, port)
	if err := http.ListenAndServe(fmt.Sprintf(":%v", port), loggedServer); err != nil {
		log.Fatalf("could not listen on port %v %v", port, err)
	}
}
