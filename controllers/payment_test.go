package controllers

// import (
// 	"bytes"
// 	"net/http/httptest"
// 	"testing"

// 	"github.com/stretchr/testify/assert"
// )

// func TestInsert1(t *testing.T) {

// 	var jsonstr = []byte(`{"EID":"4","Paidby":"2"}`)
// 	w := httptest.NewRecorder()
// 	response := httptest.NewRequest("POST", "localhost:8080/expense/insertpayment", bytes.NewBuffer(jsonstr))
// 	InsertPaymentRecord(w, response)
// 	assert.Equal(t, w.Result().Status, "Payment Details Inserted In Database")

// }
// func TestInsert2(t *testing.T) {

// 	var jsonstr = []byte(`{"ID":"2"}`)
// 	w := httptest.NewRecorder()
// 	response := httptest.NewRequest("POST", "localhost:8080/expense/deletepayment", bytes.NewBuffer(jsonstr))
// 	DeletePayment(w, response)
// 	assert.Equal(t, w.Result().Status, "Payment Details Deleted From Database")

// }
// func TestInsert3(t *testing.T) {

// 	var jsonstr = []byte(`{"ID":"100"}`)
// 	w := httptest.NewRecorder()
// 	response := httptest.NewRequest("POST", "localhost:8080/expense/deletepayment", bytes.NewBuffer(jsonstr))
// 	DeletePayment(w, response)
// 	assert.Equal(t, w.Result().Status, " Invalid Payment ID")

// }
