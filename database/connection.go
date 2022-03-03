package database

import (
	"expenseManagement/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	// "gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// connection, err := gorm.Open(mysql.Open("root:rootroot@/yt_go_auth"), &gorm.Config{})
	// connection, err := gorm.Open(sqlite.Open("expense_management.db"), &gorm.Config{})

	// if err != nil {
	// 	panic("DB connection failed !!")
	// }

	// DB = connection

	// connection.AutoMigrate(&models.User{})
	db, err := gorm.Open("sqlite3", "/Users/suryatejapaduri/UF/SE/Expense_Management/expense_management.db")

	if err != nil {
		panic("DB connection failed !!")
	}
	defer db.Close()

	db.AutoMigrate(&models.User{})
}
