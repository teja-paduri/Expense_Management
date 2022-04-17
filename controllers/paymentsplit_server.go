package controllers

import (
	"encoding/json"
	"expenseManagement/database"
	"expenseManagement/utils"
	"log"
	"net/http"
)

// var paymentsplit models.Paymentsplit

func InsertPaymentSplitRecord(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside insert paymentsplit method")
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)

	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}

	keyVal := utils.ParsePostBody(r, make(map[string]string))

	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {
		output := db.RecordPaymentSplit(keyVal)

		log.Printf("Output '%v'", output)
		if output {
			k := `PaymentSplit record created Successfully`
			w.WriteHeader(http.StatusOK)
			enc := json.NewEncoder(w)
			enc.Encode(k)

		} else {
			k := "Failied creating PaymentSplit record"
			w.WriteHeader(http.StatusBadRequest)
			enc := json.NewEncoder(w)
			enc.Encode(k)
		}

	}

}

func DeletePaymentSplit(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside delete paymentsplit method")
}
