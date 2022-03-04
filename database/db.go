package database

import (
	"database/sql"
	"expenseManagement/models"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// ExpenseStoreSQL is an implementaton of ExpenseStore in sqlite3
type ExpenseStoreSQL struct {
	*sql.DB
}

// GetUser queries the database for a user and returns it if it's found, nil otherwise
func (es *ExpenseStoreSQL) GetUser(inputid int) *models.User {
	var user *models.User

	rows, err := es.Query("SELECT * FROM user WHERE id = ?", inputid)

	if err != nil {
		log.Fatalln(err)
	}

	var (
		id       int64
		name     string
		email    string
		password string
	)

	for rows.Next() {
		if err = rows.Scan(&id, &name, &email, &password); err != nil {
			log.Fatalln(err)
		}
		user = &models.User{id, name, email, password}
	}

	return user
}

func (es *ExpenseStoreSQL) CreateUser(Name string, Email string, Password string) bool {
	stmt, err := es.Prepare("INSERT into user(ID, name, email, password) values(?,?,?,?)")

	_, err1 := stmt.Exec(nil, Name, Email, Password)
	defer stmt.Close()

	if err1 != nil {
		log.Print("Insert Unsuccessful")
		return false
	}

	if err != nil {
		log.Fatalln(err)
		return false
	}
	return true

}

// NewExpenseStoreSQL returns a pointer to an initialized ExpenseStoreSQL
func NewExpenseStoreSQL() (*ExpenseStoreSQL, error) {
	e := ExpenseStoreSQL{}

	db, err := sql.Open("sqlite3", "./expense_management.db")
	if err != nil {
		return nil, err
	}

	e.DB = db

	return &e, nil
}