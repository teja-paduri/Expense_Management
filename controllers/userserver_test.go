package controllers

import (
	"bytes"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateEvent1(t *testing.T) {

	var jsonstr = []byte(`{"Email":"karthik@gmail.com","Password":"karthik123"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/user/login", bytes.NewBuffer(jsonstr))
	LoginUser(w, response)
	assert.Equal(t, w.Result().Status, "200 OK")

}
func TestCreateEvent2(t *testing.T) {

	var jsonstr = []byte(`{"Name":"Anusha","Email":"anusha@gmail.com","Password":"anushachintha"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/user/register", bytes.NewBuffer(jsonstr))
	InsertUser(w, response)
	assert.Equal(t, w.Result().Status, "User Does not Exists")

}
func TestCreateEvent3(t *testing.T) {

	var jsonstr = []byte(`{"Name":"springbreak","category":"food","userid":"4","amount":"100"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/expense/get", bytes.NewBuffer(jsonstr))
	GetExpense(w, response)
	assert.Equal(t, w.Result().Status, "Expense Created")

}
