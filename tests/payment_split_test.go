package tests

import (
	"bytes"
	"expenseManagement/controllers"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestInsertPaymentSplit(t *testing.T) {
	var ps_jsonStr = []byte(`{"borrowers":"anusha,karthik,upender","amount":"90","user_id":"1","username":"teja","description":"starbucks","timestamp":"04-20-22"}`)
	w := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "localhost:8080/expense/insertpaymentsplit", bytes.NewBuffer(ps_jsonStr))
	controllers.InsertPaymentSplitRecord(w, request)
	assert.Equal(t, "200 OK", w.Result().Status)
}
