package models

type Paymentsplit struct {
	UserId        int64  `json:"userid"`
	Payer         string `json:"payername"`
	Transactionid int64  `json:"transactionid"`
	Borrower      string `json:"borrowername"`
}
