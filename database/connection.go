package database

import (
	"../models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(mysql.Open("root:rootroot@/yt_go_auth"), &gorm.Config{})

	if err != nil {
		panic("DB connection failed :( !!")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}
