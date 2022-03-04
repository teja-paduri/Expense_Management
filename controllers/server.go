package controllers

import (
	"encoding/json"
	"expenseManagement/database"
	"expenseManagement/models"
	"expenseManagement/utils"
	"fmt"

	"github.com/gorilla/mux"

	"log"
	"net/http"
	"strconv"
)

const contentTypeJSON = "application/json"

var user models.User

var Store, err = database.NewExpenseStoreSQL()

type ExpenseStore interface {
	GetUser(id int) *models.User
}

// ExpenseServer is an HTTP interface for Expense Tracking
type ExpenseServer struct {
	Store ExpenseStore
}

func RetrieveUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db, err1 := database.NewExpenseStoreSQL()

	if err1 != nil {
		log.Printf("couldn't get UserID from URL path: '%v'", err)
	}

	utils.AddCorsHeaders(w, r)

	enc := json.NewEncoder(w)

	userID, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Printf("couldn't get UserID from URL path: '%v'", err)
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get UserID from URL path: %v", userID))
		enc.Encode(errorJSON)
		return
	}

	user := db.GetUser(userID)

	w.WriteHeader(http.StatusOK)
	enc.Encode(user)
}

func InsertUser(w http.ResponseWriter, r *http.Request) {

	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)

	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}

	keyVal := utils.ParsePostBody(r, make(map[string]string))
	name := keyVal["Name"]
	email := keyVal["Email"]
	password := keyVal["Password"]

	op := db.CreateUser(name, email, password)

	if op {
		k := `Inserted User Successfully`
		w.WriteHeader(http.StatusOK)
		enc := json.NewEncoder(w)
		enc.Encode(k)

	} else {
		k := "User Already Exists"
		w.WriteHeader(http.StatusBadRequest)
		enc := json.NewEncoder(w)
		enc.Encode(k)
	}

}
