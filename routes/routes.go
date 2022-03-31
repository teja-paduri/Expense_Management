package routes

import (
	"expenseManagement/controllers"

	"github.com/gorilla/mux"
)

func Setup(r *mux.Router) {
	r.HandleFunc("/users/{id}", controllers.RetrieveUser).Methods("GET", "OPTIONS")
	r.HandleFunc("/user/register", controllers.InsertUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/user/login", controllers.LoginUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/expense/get", controllers.LoginUser).Methods("GET", "OPTIONS")

}
