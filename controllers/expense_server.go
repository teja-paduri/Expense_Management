package controllers

import (
	"encoding/json"
	"expenseManagement/database"
	"expenseManagement/models"
	"expenseManagement/utils"

	// "github.com/gorilla/mux"
	"fmt"
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
	enc := json.NewEncoder(w)

	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}
	keyVal := utils.ParsePostBody(r, make(map[string]string))
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {
		log.Println("KEY VAL HERE")
		log.Println(keyVal)
		name := keyVal["name"]
		category := keyVal["category"]
		description := keyVal["spent_on"]

		op := db.RetrieveExpense(name, category, description)
		log.Printf("GetExpense output: '%v'", op)

		if op == nil {
			w.WriteHeader(http.StatusBadRequest)
			errorJSON := CreateErrorNotFound(fmt.Sprintf("Requested expense %v not found.", name))
			enc.Encode(errorJSON)
		} else {
			w.WriteHeader(http.StatusOK)
			enc.Encode(op)
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
	log.Printf("Inside Delete expense")
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

func UpdateExpense(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside Update expense")
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)
	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}
	keyVal := utils.ParsePostBody(r, make(map[string]string))
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {

		output := db.UpdateExpense(keyVal)

		log.Printf("output '%v'", output)
		if output {
			k := `Expense updation Successfully`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := "Expense updation failed"
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}
}
