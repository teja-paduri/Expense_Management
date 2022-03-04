package controllers

import (
	"encoding/json"
	"expenseManagement/database"
	"expenseManagement/models"
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
	// userIDString := strings.TrimPrefix(r.URL.Path, "/users/")
	// println(userIDString)
	db, err1 := database.NewExpenseStoreSQL()

	if err1 != nil {
		log.Printf("couldn't get UserID from URL path: '%v'", err)
	}

	// w.Header().Set("Content-Type", contentTypeJSON)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	enc := json.NewEncoder(w)

	log.Printf(params["id"])

	userID, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Printf("couldn't get UserID from URL path: '%v'", err)
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get UserID from URL path: %v", userID))
		enc.Encode(errorJSON)
		return
	}

	user := db.GetUser(userID)

	// if user == nil {
	// 	w.WriteHeader(http.StatusNotFound)
	// 	errorJSON := CreateErrorNotFound(fmt.Sprintf("Requested user %v not found.", userID))
	// 	enc.Encode(errorJSON)
	// 	return
	// }

	// user = {"Name":"teja"}

	w.WriteHeader(http.StatusOK)
	println(user.Name)
	enc.Encode(user)
}
