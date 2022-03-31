package controllers

import (
	"bytes"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateEvent(t *testing.T) {

	var jsonstr = []byte(`{"Email":"karthik@gmail.com","Password":"karthik123"}`)
	w := httptest.NewRecorder()
	response := httptest.NewRequest("POST", "localhost:8080/user/login", bytes.NewBuffer(jsonstr))
	LoginUser(w, response)
	assert.Equal(t, w.Result().Status, "200 OK")

}
