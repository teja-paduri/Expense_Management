package models

type income struct {
	UserId       int64  `json:"userid"`
	Amount       int64  `json:"amount"`
	IncomeSource string `json:"incomesource"`
	TimeStamp    string `json:"email"`
	Description  string `json:"description"`
}
