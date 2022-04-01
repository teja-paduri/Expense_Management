package controllers

import (
	"encoding/json"
	"expenseManagement/database"
	"expenseManagement/models"
	"expenseManagement/utils"
	"log"
	"net/http"
)

var payment models.Payment

func InsertPaymentRecord(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside insert payment method")
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)

	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}
	keyVal := utils.ParsePostBody(r, make(map[string]string))
	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {

		output := db.RecordPayment(keyVal)

		log.Printf("output '%v'", output)
		if output {
			k := `Payment record created Successfully`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := "Failied creating Payment record"
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}

}
