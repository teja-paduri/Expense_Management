package controllers

import (
	"encoding/json"
	"expenseManagement/database"

	//"expenseManagement/models"
	"expenseManagement/utils"
	"log"
	"net/http"
)

func InsertIncome(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside Insert Income method")
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)

	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}
	keyVal := utils.ParsePostBody(r, make(map[string]string))
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {

		output := db.RecordIncome(keyVal)

		log.Printf("output '%v'", output)
		if output {
			k := `Income record created Successfully`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := "Failied creating income record"
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}

}

func UpdateIncome(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside update income method ")
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)
	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}
	keyVal := utils.ParsePostBody(r, make(map[string]string))
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {

		output := db.UpdateIncomeRecord(keyVal)

		log.Printf("output '%v'", output)
		if output {
			k := `Updated Income record`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := ""
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}
}
