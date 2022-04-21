package controllers

import (
	"encoding/json"
	"expenseManagement/database"
	"expenseManagement/utils"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
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
func DeleteIncome(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	log.Printf("Inside delete income method")
	db, err := database.NewExpenseStoreSQL()

	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}

	utils.AddCorsHeaders(w, r)
	enc := json.NewEncoder(w)
	incomeID, err1 := strconv.Atoi(params["id"])

	if err1 != nil {
		log.Printf("couldn't get incomeID from URL path: '%v'", err)
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get incomeID from URL path: %v", incomeID))
		enc.Encode(errorJSON)
		return
	}

	output := db.DeleteIncomeRecord(incomeID)

	log.Printf("output '%v'", output)

	if output {
		k := `Income record deleted!`
		w.WriteHeader(http.StatusOK)
		enc.Encode(k)

	} else {
		k := "Income record deletion failed"
		w.WriteHeader(http.StatusBadRequest)
		enc.Encode(k)
	}

}
