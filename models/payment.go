package models

type Payment struct {
	Id     int64  `json:"id"`
	Eid    int64  `json:"ExpenseID"`
	Paidby int64  `json:UserID`
	State  string `json:String`
}
