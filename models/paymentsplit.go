package models

type Paymentsplit struct {
	ID            int64  `json:"ID"`
	UserId        int64  `json:"userid"`
	Payer         string `json:"payername"`
	Transactionid int64  `json:"transactionid"`
	Borrower      string `json:"borrowername"`
}
