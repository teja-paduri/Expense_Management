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

var user models.User

var Store, err = database.NewExpenseStoreSQL()

type ExpenseStore interface {
	GetUser(id int) *models.User
}

// ExpenseServer is an HTTP interface for Expense Tracking
type ExpenseServer struct {
	Store ExpenseStore
}

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)
	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}

	output := db.GetUsers()
	log.Printf("output '%v'", output)

	if output != nil {
		w.WriteHeader(http.StatusOK)
		enc := json.NewEncoder(w)
		enc.Encode(output)

	} else {
		k := "Login Error"
		w.WriteHeader(http.StatusBadRequest)
		enc := json.NewEncoder(w)
		enc.Encode(k)
	}
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

	if user == nil {
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Requested user %v not found.", userID))
		enc.Encode(errorJSON)
		return
	}

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
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {
		name := keyVal["Name"]
		email := keyVal["Email"]
		password := keyVal["Password"]

		op := db.CreateUser(name, email, password)
		log.Printf("output '%v'", op)
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

}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)
	log.Printf("entered")
	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}

	keyVal := utils.ParsePostBody(r, make(map[string]string))
	email := keyVal["Email"]
	password := keyVal["Password"]
	log.Printf("entered e'%v'", email)
	log.Printf("entered p'%v'", password)

	output := db.LoginUser(email, password)
	log.Printf("output '%v'", output)

	if output != nil {
		w.WriteHeader(http.StatusOK)
		enc := json.NewEncoder(w)
		enc.Encode(output)

	} else {
		k := "Login Error"
		w.WriteHeader(http.StatusBadRequest)
		enc := json.NewEncoder(w)
		enc.Encode(k)
	}
}

func UpdateUserPassword(w http.ResponseWriter, r *http.Request) {
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)
	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}
	keyVal := utils.ParsePostBody(r, make(map[string]string))
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {
		op := db.UpdatePassword(keyVal)
		log.Printf("output '%v'", op)
		if op {
			k := `Password updated Successfully`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := "User Does not exists"
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}

}
