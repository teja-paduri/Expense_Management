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
	params := mux.Vars(r)
	log.Printf("Inside delete paymentsplit method")
	db, err := database.NewExpenseStoreSQL()

	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}

	utils.AddCorsHeaders(w, r)
	enc := json.NewEncoder(w)
	paymentID, err1 := strconv.Atoi(params["id"])

	if err1 != nil {
		log.Printf("couldn't get PaymentID from URL path: '%v'", err)
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get PaymentID from URL path: %v", paymentID))
		enc.Encode(errorJSON)
		return
	}

	output := db.DeletePaymentSplitRecord(paymentID)

	log.Printf("output '%v'", output)

	if output {
		k := `PaymentSplit record deleted!`
		w.WriteHeader(http.StatusOK)
		enc.Encode(k)

	} else {
		k := "PaymentSplit record deletion failed"
		w.WriteHeader(http.StatusBadRequest)
		enc.Encode(k)
	}

}
