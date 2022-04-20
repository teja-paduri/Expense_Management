package models

type Paymentsplit struct {
	ID          int64   `json:"ID"`
	UserId      int64   `json:"user_id"`
	Username    string  `json:"username"`
	Borrowers   string  `json:"borrowers"`
	Amount      float64 `json:"amount"`
	Description string  `json:"description"`
	Timestamp   string  `json:"timestamp"`
}
