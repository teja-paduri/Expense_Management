package main

import (
	"net/http"
	"os"

	routes "expenseManagement/routes"

	mux "github.com/gorilla/mux"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	router := mux.NewRouter()
	routes.Setup(router)
	http.Handle("/", router)
	http.ListenAndServe("localhost:8080", router)
}
