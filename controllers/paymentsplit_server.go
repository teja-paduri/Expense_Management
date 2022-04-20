package controllers

import (
	"encoding/json"
	"expenseManagement/database"
	"expenseManagement/utils"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

// var paymentsplit models.Paymentsplit

func InsertPaymentSplitRecord(w http.ResponseWriter, r *http.Request) {
	log.Printf("Inside insert Paymentsplit method")
	db, err := database.NewExpenseStoreSQL()
	utils.AddCorsHeaders(w, r)

	if err != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}

	keyVal := utils.ParsePostBody(r, make(map[string]string))

	if keyVal["options"] == "true" {
		w.WriteHeader(http.StatusOK)
	} else {

		user_id := keyVal["user_id"]
		username := keyVal["username"]
		description := keyVal["description"]
		timestamp := keyVal["timestamp"]
		borrowers := keyVal["borrowers"]
		amount, err := strconv.Atoi(keyVal["amount"])
		if err != nil {
			log.Printf("Failed during converting amount " + err.Error())
			return
		}

		borr_arr := strings.Split(borrowers, ",")

		for i := 0; i < len(borr_arr); i++ {

			output := db.RecordPaymentSplit(borr_arr[i], float64(amount)/float64(len(borr_arr)), user_id, username, description, timestamp)
			log.Printf("Output '%v'", output)
			if output {
				k := `PaymentSplit record created Successfully`
				w.WriteHeader(http.StatusOK)
				enc := json.NewEncoder(w)
				enc.Encode(k)

			} else {
				k := "Failed creating PaymentSplit record"
				w.WriteHeader(http.StatusBadRequest)
				enc := json.NewEncoder(w)
				enc.Encode(k)
			}

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

func UserAmountOwed(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db, err1 := database.NewExpenseStoreSQL()
	log.Print("in amount function")
	//output{}
	if err1 != nil {
		log.Printf("couldn't get UserID from URL path: '%v'", err)
	}

	utils.AddCorsHeaders(w, r)

	enc := json.NewEncoder(w)

	username, err := params["name"]

	if !err {
		log.Printf("couldn't get UserName from URL path: '%v'", err)
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get UserID from URL path: %v", username))
		enc.Encode(errorJSON)
		return
	}

	amount := db.GetAmount(username)
	// output := {
	// 	"u" : username
	// 	"amount" : amount
	// }
	// if user == nil {
	// 	w.WriteHeader(http.StatusNotFound)
	// 	errorJSON := CreateErrorNotFound(fmt.Sprintf("Requested user %v not found.", username))
	// 	enc.Encode(errorJSON)
	// 	return
	// }
	log.Print(amount)
	w.WriteHeader(http.StatusOK)
	enc.Encode(amount)
}

func AmountUserOwes(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db, err1 := database.NewExpenseStoreSQL()

	if err1 != nil {
		log.Printf("Failed connection to the database: '%v'", err)
	}

	utils.AddCorsHeaders(w, r)

	enc := json.NewEncoder(w)

	username, err := params["username"]

	if !err {
		log.Printf("Couldn't get UserName from URL path: '%v'", err)
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get UserName from URL path: %v", username))
		enc.Encode(errorJSON)
		return
	}

	amount := db.GetAmountUserOwes(username)
	// output := {
	// 	"u" : username
	// 	"amount" : amount
	// }
	// if user == nil {
	// 	w.WriteHeader(http.StatusNotFound)
	// 	errorJSON := CreateErrorNotFound(fmt.Sprintf("Requested user %v not found.", username))
	// 	enc.Encode(errorJSON)
	// 	return
	// }
	w.WriteHeader(http.StatusOK)
	enc.Encode(amount)
}
