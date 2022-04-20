package models

type income struct {
	ID            int64  `json:"ID"`
	User_id       int64  `json:"user_id"`
	Amount        int64  `json:"amount"`
	Income_Source string `json:"income_source"`
	TimeStamp     string `json:"timestamp"`
	Description   string `json:"description"`
}
