package tests

import (
	"bytes"
	//"net/http"
	"expenseManagement/controllers"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateExpense1(t *testing.T) {

	var jsonstr = []byte(`{"name":"springbreak","category":"food","userid":"4","amount":"100","spent_on":"sb"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/expense", bytes.NewBuffer(jsonstr))
	controllers.InsertExpense(w, response)
	//log.Print(w.Result().Status)
	assert.Equal(t, w.Result().Status, "200 OK")

}
func TestCreateExpense2(t *testing.T) {

	var jsonstr = []byte(`{"name":"springbreak","category":"food","spent_on":"sb"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("GET", "localhost:8080/expense/get", bytes.NewBuffer(jsonstr))
	controllers.GetExpense(w, response)
	assert.Equal(t, w.Result().Status, "200 OK")

}
func TestCreateExpense3(t *testing.T) {

	var jsonstr = []byte(`{"name":"springbreak","category":"trip","spent_on":"sb"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("GET", "localhost:8080/expense/get", bytes.NewBuffer(jsonstr))
	controllers.GetExpense(w, response)
	assert.Equal(t, w.Result().Status, "400 Bad Request")

}
func TestUpdateExpense4(t *testing.T) {

	var jsonstr = []byte(`{"Name":"springbreak","amount":"300"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/expense/update", bytes.NewBuffer(jsonstr))
	controllers.UpdateExpense(w, response)
	assert.Equal(t, w.Result().Status, "200 OK")

}

// func TestUpdateExpense(t *testing.T) {

// 	var jsonstr = []byte(`{"name":"abcd","amount":"200"}`)
// 	w := httptest.NewRecorder()
// 	response := httptest.NewRequest("POST", "localhost:8080/expense/update", bytes.NewBuffer(jsonstr))
// 	controllers.UpdateExpense(w, response)
// 	assert.Equal(t, w.Result().Status, "400 Bad Request")

// }
