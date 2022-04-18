package routes

import (
	"expenseManagement/controllers"

	"github.com/gorilla/mux"
)

func Setup(r *mux.Router) {
	r.HandleFunc("/users/{id}", controllers.RetrieveUser).Methods("GET", "OPTIONS")
	r.HandleFunc("/user/register", controllers.InsertUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/user/login", controllers.LoginUser).Methods("POST", "OPTIONS")
	// r.HandleFunc("/user/passwordudpate", controllers.UpdateUserPassword).Methods("POST", "OPTIONS")

	//Expense routes
	r.HandleFunc("/expense/get", controllers.GetExpense).Methods("GET", "OPTIONS")
	r.HandleFunc("/expense", controllers.InsertExpense).Methods("POST", "OPTIONS")
	r.HandleFunc("/expense/update", controllers.UpdateExpense).Methods("PUT", "OPTIONS")
	r.HandleFunc("/expense/remove", controllers.DeleteExpense).Methods("DELETE", "OPTIONS")

	// //Payment routes
	// r.HandleFunc("/expense/insertpayment", controllers.InsertPaymentRecord).Methods("POST", "OPTIONS")
	// r.HandleFunc("/expense/deletepayment", controllers.DeletePayment).Methods("DELETE", "OPTIONS")

	//Income routes
	r.HandleFunc("/expense/insertincome", controllers.InsertIncome).Methods("POST", "OPTIONS")
	r.HandleFunc("/expense/updateincome", controllers.UpdateIncome).Methods("PUT", "OPTIONS")
	r.HandleFunc("/expense/deleteincome", controllers.DeleteIncome).Methods("DELETE", "OPTIONS")

	//PaymentSplit routes
	r.HandleFunc("/expense/insertpaymentsplit", controllers.InsertPaymentSplitRecord).Methods("POST", "OPTIONS")
	r.HandleFunc("/expense/deletepaymentsplit/{id}", controllers.DeletePaymentSplit).Methods("DELETE", "OPTIONS")
}
