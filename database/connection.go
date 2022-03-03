package database

import (
	"expense_Management/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	connection, err := gorm.Open(sqlite.Open("./management.db"), &gorm.Config{})

	if err != nil {
		panic("DB not connected !!")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}
