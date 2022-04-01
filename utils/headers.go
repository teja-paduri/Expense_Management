package utils

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

func AddCorsHeaders(w http.ResponseWriter, r *http.Request) {

	//Allow CORS here By * or specific origin
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func ParsePostBody(r *http.Request, keyVal map[string]string) map[string]string {
	if r.Method == "OPTIONS" {
		//handle preflight in here
		var colorMap = map[string]string{"options": "true"}
		return colorMap
	} else {
		log.Println("hey hoo")
		body, errRead := ioutil.ReadAll(r.Body)
		bodyString := string(body)
		log.Print(bodyString)
		if errRead != nil {
			panic(errRead.Error())
		}
		json.Unmarshal(body, &keyVal)
		return keyVal
	}

}
