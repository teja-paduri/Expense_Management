package routes

import (
	"expenseManagement/controllers"

	"github.com/gorilla/mux"
)

func Setup(r *mux.Router) {
	r.HandleFunc("/users/{id}", controllers.RetrieveUser).Methods("GET")
}
