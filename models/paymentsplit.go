package models

type paymentsplit struct {
	UserId        int64  `json:"userid"`
	Payer         string `json:"payername"`
	Transactionid int64  `json:"transactionid"`
	borrower      string `json:"borrowername"`
}
