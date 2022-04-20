package controllers

import (
	"bytes"
	//"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateExpense1(t *testing.T) {

	var jsonstr = []byte(`{"Name":"springbreak","category":"food","userid":"4","amount":"100","spent_on":"sb"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/expense", bytes.NewBuffer(jsonstr))
	InsertExpense(w, response)
	//log.Print(w.Result().Status)
	assert.Equal(t, w.Result().Status, "200 OK")

}
func TestCreateExpense2(t *testing.T) {

	var jsonstr = []byte(`{"Name":"springbreak","category":"food","userid":"4","amount":"100"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/expense", bytes.NewBuffer(jsonstr))
	InsertExpense(w, response)
	assert.Equal(t, w.Result().Status, "Expense Already exists")

}
func TestUpdateExpense(t *testing.T) {

	var jsonstr = []byte(`{"Name":"springbreak","amount":"200"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/expense/update", bytes.NewBuffer(jsonstr))
	UpdateExpense(w, response)
	assert.Equal(t, w.Result().Status, "Expense updated")

}
func TestDeleteExpense(t *testing.T) {

	var jsonstr = []byte(`{"Name":"springbreak"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/expense/remove", bytes.NewBuffer(jsonstr))
	DeleteExpense(w, response)
	assert.Equal(t, w.Result().Status, "Expense Deleted")

}
