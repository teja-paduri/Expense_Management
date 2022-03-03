package controllers

import (
	"encoding/json"
	"expenseManagement/models"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
)

const contentTypeJSON = "application/json"

type ExpenseStore interface {
	GetUser(id int) *models.User
}

// ExpenseServer is an HTTP interface for Expense Tracking
type ExpenseServer struct {
	store ExpenseStore
}

func (es *ExpenseServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		es.retrieveUser(w, r)
	}
}

func (es *ExpenseServer) retrieveUser(w http.ResponseWriter, r *http.Request) {
	userIDString := strings.TrimPrefix(r.URL.Path, "/users/")

	w.Header().Set("content-type", contentTypeJSON)
	enc := json.NewEncoder(w)

	userID, err := strconv.Atoi(userIDString)

	if err != nil {
		log.Printf("couldn't get UserID from URL path: '%v'", err)
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get UserID from URL path: %v", userIDString))
		enc.Encode(errorJSON)
		return
	}

	user := es.store.GetUser(userID)

	if user == nil {
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Requested user %v not found.", userID))
		enc.Encode(errorJSON)
		return
	}

	w.WriteHeader(http.StatusOK)
	enc.Encode(user)

}
