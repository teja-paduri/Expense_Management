package models

type Expense struct {
	Id          int64  `json:"id"`
	UserId      int64  `json:"userid"`
	Name        string `json:"name"`
	Category    string `json:"category"`
	Description string `json:"description"`
	Amount      string `json:"amount"`
}
