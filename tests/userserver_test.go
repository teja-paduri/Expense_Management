package tests

import (
	"bytes"
	"expenseManagement/controllers"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateEvent0(t *testing.T) {

	var jsonstr = []byte(`{"Email":"karthik@gmail.com","Password":"12345"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/user/register", bytes.NewBuffer(jsonstr))
	controllers.InsertUser(w, response)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestCreateEvent1(t *testing.T) {

	var jsonstr = []byte(`{"Email":"karthik@gmail.com","Password":"12345"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/user/login", bytes.NewBuffer(jsonstr))
	controllers.LoginUser(w, response)
	assert.Equal(t, "200 OK", w.Result().Status)

}
func TestCreateEvent2(t *testing.T) {

	var jsonstr = []byte(`{"Email":"anusha@gmail.com","Password":"anushachintha"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/user/login", bytes.NewBuffer(jsonstr))
	controllers.LoginUser(w, response)
	assert.Equal(t, w.Result().Status, "400 Bad Request")

}
func TestCreateEvent5(t *testing.T) {

	var jsonstr = []byte(`{"Email":"anusha@gmail.com","Password":"anushachintha"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/user/register", bytes.NewBuffer(jsonstr))
	controllers.InsertUser(w, response)
	assert.Equal(t, "200 OK", w.Result().Status)
}
func TestCreateEvent3(t *testing.T) {

	var jsonstr = []byte(`{"Email":"anusha@gmail.com","Password":"expensemanagement"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("PUT", "localhost:8080/user/passwordudpate", bytes.NewBuffer(jsonstr))
	controllers.UpdateUserPassword(w, response)
	assert.Equal(t, w.Result().Status, "200 OK")

}
func TestCreateEvent6(t *testing.T) {

	var jsonstr = []byte(``)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("GET", "localhost:8080/users/all", bytes.NewBuffer(jsonstr))
	controllers.GetAllUsers(w, response)
	assert.Equal(t, w.Result().Status, "200 OK")

}
