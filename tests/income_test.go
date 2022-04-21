package tests

import (
	"bytes"
	"expenseManagement/controllers"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func TestInsertIncome1(t *testing.T) {
	var income_jsonStr = []byte(`{"income_source":"payroll","amount":"100","description":"description!","user_id":"1","timestamp":"04-20-22"}`)
	w := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "/expense/insertincome", bytes.NewBuffer(income_jsonStr))
	controllers.InsertIncome(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestInsertIncome2(t *testing.T) {
	var income_jsonStr = []byte(`{"income_source":"stocks","amount":"50","description":"desc","user_id":"2","timestamp":"04-20-22"}`)
	w := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "/expense/insertincome", bytes.NewBuffer(income_jsonStr))
	controllers.InsertIncome(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestUpdateIncome3(t *testing.T) {
	var ps_jsonStr = []byte(`{"amount":"55","ID": "1"}`)
	w := httptest.NewRecorder()
	request := httptest.NewRequest("PUT", "localhost:8080/expense/updateincome", bytes.NewBuffer(ps_jsonStr))
	controllers.UpdateIncome(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestDeleteIncome4(t *testing.T) {
	w := httptest.NewRecorder()
	request := httptest.NewRequest("DELETE", "localhost:8080/expense/deleteincome/1", nil)
	vars := map[string]string{
		"id": "1",
	}
	request = mux.SetURLVars(request, vars)
	controllers.DeleteIncome(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
