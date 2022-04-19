package models

type Paymentsplit struct {
	ID            int64   `json:"ID"`
	UserId        int64   `json:"userid"`
	Transactionid int64   `json:"transactionid"`
	Borrower      string  `json:"borrowername"`
	Amount        float64 `json:"amount"`
	ExpenseId     int64   `json:"expenseid"`
}
