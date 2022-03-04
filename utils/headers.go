package utils

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func AddCorsHeaders(w http.ResponseWriter, r *http.Request) {

	//Allow CORS here By * or specific origin
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func ParsePostBody(r *http.Request, keyVal map[string]string) map[string]string {
	body, errRead := ioutil.ReadAll(r.Body)
	if errRead != nil {
		panic(errRead.Error())
	}
	json.Unmarshal(body, &keyVal)
	return keyVal
}
