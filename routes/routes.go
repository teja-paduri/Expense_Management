package routes

import (
	"expenseManagement/controllers"

	"github.com/gorilla/mux"
)

func Setup(r *mux.Router) {
	r.HandleFunc("/users/all", controllers.GetAllUsers).Methods("GET", "OPTIONS")
	r.HandleFunc("/users/{id}", controllers.RetrieveUser).Methods("GET", "OPTIONS")
	r.HandleFunc("/user/register", controllers.InsertUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/user/login", controllers.LoginUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/user/passwordudpate", controllers.UpdateUserPassword).Methods("PUT", "OPTIONS")

	//Expense routes
	r.HandleFunc("/expense/get", controllers.GetExpense).Methods("GET", "OPTIONS")
	r.HandleFunc("/expense", controllers.InsertExpense).Methods("POST", "OPTIONS")
	r.HandleFunc("/expense/update", controllers.UpdateExpense).Methods("PUT", "OPTIONS")
	r.HandleFunc("/expense/remove", controllers.DeleteExpense).Methods("DELETE", "OPTIONS")

	//Income routes
	r.HandleFunc("/expense/insertincome", controllers.InsertIncome).Methods("POST", "OPTIONS")
	r.HandleFunc("/expense/updateincome", controllers.UpdateIncome).Methods("PUT", "OPTIONS")
	r.HandleFunc("/expense/deleteincome/{id}", controllers.DeleteIncome).Methods("DELETE", "OPTIONS")

	//PaymentSplit routes
	r.HandleFunc("/expense/insertpaymentsplit", controllers.InsertPaymentSplitRecord).Methods("POST", "OPTIONS")
	r.HandleFunc("/expense/deletepaymentsplit/{id}", controllers.DeletePaymentSplit).Methods("DELETE", "OPTIONS")
	r.HandleFunc("/expense/useramountowed/{name}", controllers.UserAmountOwed).Methods("GET", "OPTIONS")
	r.HandleFunc("/expense/user/owes/{username}", controllers.AmountUserOwes).Methods("GET", "OPTIONS")

}
