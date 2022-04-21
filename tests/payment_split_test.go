package tests

import (
	"bytes"
	"expenseManagement/controllers"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func TestInsertPaymentSplit1(t *testing.T) {
	var ps_jsonStr = []byte(`{"borrowers":"anusha,karthik,upender","amount":"90","user_id":"1","username":"teja","description":"starbucks","timestamp":"04-20-22"}`)
	w := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "localhost:8080/expense/insertpaymentsplit", bytes.NewBuffer(ps_jsonStr))
	controllers.InsertPaymentSplitRecord(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestInsertPaymentSplit2(t *testing.T) {
	var ps_jsonStr = []byte(`{"borrowers":"anusha,upender","amount":"40","user_id":"2","username":"karthik","description":"dinner","timestamp":"04-14-22"}`)
	w := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "localhost:8080/expense/insertpaymentsplit", bytes.NewBuffer(ps_jsonStr))
	controllers.InsertPaymentSplitRecord(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestInsertPaymentSplit3(t *testing.T) {
	var ps_jsonStr = []byte(`{"borrowers":"karthik,upender","amount":"30","user_id":"1","username":"teja","description":"cab","timestamp":"04-10-22"}`)
	w := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "localhost:8080/expense/insertpaymentsplit", bytes.NewBuffer(ps_jsonStr))
	controllers.InsertPaymentSplitRecord(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestAmountUserOwed(t *testing.T) {
	w := httptest.NewRecorder()
	request := httptest.NewRequest("GET", "localhost:8080/expense/useramountowed/teja", nil)
	vars := map[string]string{
		"name": "teja",
	}
	request = mux.SetURLVars(request, vars)
	controllers.UserAmountOwed(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestAmountUserOwes(t *testing.T) {
	w := httptest.NewRecorder()
	request := httptest.NewRequest("GET", "localhost:8080/expense/user/owes/karthik", nil)
	vars := map[string]string{
		"username": "karthik",
	}
	request = mux.SetURLVars(request, vars)
	controllers.AmountUserOwes(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestDeletePaymentSplit(t *testing.T) {
	w := httptest.NewRecorder()
	request := httptest.NewRequest("DELETE", "localhost:8080/expense/deletepaymentsplit/1", nil)
	vars := map[string]string{
		"id": "1",
	}
	request = mux.SetURLVars(request, vars)
	controllers.DeletePaymentSplit(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
