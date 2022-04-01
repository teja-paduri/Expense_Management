package controllers

import (
	"encoding/json"
	"expenseManagement/database"
	"expenseManagement/models"
	"expenseManagement/utils"

	// "github.com/gorilla/mux"

	"log"
	"net/http"
)

// const contentTypeJSON = "application/json"
var expense models.Expense

// var Store, err = database.NewExpenseStoreSQL()

// type ExpenseServer struct {
// 	Store ExpenseStore
// }

func GetExpense(w http.ResponseWriter, r *http.Request) {
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
		category := keyVal["Category"]
		description := keyVal["Description"]
		// amount := keyVal["Amount"]
		op := db.CreateUser(name, category, description)
		log.Printf("output '%v'", op)
		if op {
			k := `Inserted Expense Successfully`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := "Error"
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}

}

func InsertExpense(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside insert expense")
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)
	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}
	keyVal := utils.ParsePostBody(r, make(map[string]string))
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {

		output := db.CreateExpense(keyVal)

		log.Printf("output '%v'", output)
		if output {
			k := `Expense created Successfully`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := "Expense creation failed"
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}

}
func DeleteExpense(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside insert expense")
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)
	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}
	keyVal := utils.ParsePostBody(r, make(map[string]string))
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {

		output := db.CreateExpense(keyVal)

		log.Printf("output '%v'", output)
		if output {
			k := `Expense created Successfully`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := "Expense creation failed"
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}
}
