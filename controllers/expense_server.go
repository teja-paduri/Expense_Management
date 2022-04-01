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
