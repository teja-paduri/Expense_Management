package database

import (
	"database/sql"
	"expenseManagement/models"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// ExpenseStoreSQL is an implementaton of ExpenseStore in sqlite3
type ExpenseStoreSQL struct {
	*sql.DB
}

// GetUser queries the database for a user and returns it if it's found, nil otherwise
func (es *ExpenseStoreSQL) GetUser(inputid int) *models.User {
	var user *models.User

	rows, err := es.Query("SELECT * FROM user WHERE id = ?", inputid)

	if err != nil {
		log.Fatalln(err)
	}

	var (
		id       int64
		name     string
		email    string
		password string
	)

	for rows.Next() {
		if err = rows.Scan(&id, &name, &email, &password); err != nil {
			log.Fatalln(err)
		}
		user = &models.User{id, name, email, password}
	}

	return user
}

func (es *ExpenseStoreSQL) CreateUser(Name string, Email string, Password string) bool {
	stmt, err := es.Prepare("INSERT into user(ID, name, email, password) values(?,?,?,?)")

	_, err1 := stmt.Exec(nil, Name, Email, Password)
	defer stmt.Close()

	if err1 != nil || err != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) LoginUser(requestEmail string, requestPassword string) *models.User {
	var user *models.User
	var (
		id       int64
		name     string
		email    string
		password string
	)
	err := es.QueryRow("SELECT * FROM user WHERE email = ?", requestEmail).Scan(&id, &name, &email, &password)
	if err != nil {
		if err != sql.ErrNoRows {
			log.Fatalln(err)
		} else {
			log.Println("User doesn't exist!")
			return nil
		}
	} else {
		if password != requestPassword {
			log.Println("Incorrect password!")
			return nil
		}
		user = &models.User{id, name, email, password}
	}
	return user
}

func (es *ExpenseStoreSQL) GetUsers() []string {
	rows, err := es.Query("SELECT name FROM user")
	if err != nil {
		return nil
	}
	defer rows.Close()

	var usersArr []string
	for rows.Next() {
		var user string
		err := rows.Scan(&user)
		if err != nil {
			return nil
		}
		usersArr = append(usersArr, user)
	}
	return usersArr
}

func (es *ExpenseStoreSQL) CreateExpense(expenseObj map[string]string) bool {
	stmt, err := es.Prepare("INSERT into expense(ID, name, description, category, amount, userid) values(?,?,?,?,?,?)")
	_, err1 := stmt.Exec(nil, expenseObj["name"], expenseObj["spent_on"], expenseObj["category"], expenseObj["amount"], expenseObj["userid"])
	if err1 != nil {
		return false
	}
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}
func (es *ExpenseStoreSQL) UpdateExpense(expenseObj map[string]string) bool {

	// stmt0, err0:= es.QueryRow("SELECT COUNT(*) FROM expense WHERE name=?",expenseObj["name"])
	// if err0 != nil || {
	// 	return false
	// }
	stmt, err := es.Prepare("UPDATE expense SET amount=? WHERE name=?")
	_, err1 := stmt.Exec(expenseObj["amount"], expenseObj["name"])
	if err1 != nil {
		return false
	}
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) RetrieveExpense(reqName string, reqCategory string, reqDesc string) *models.Expense {
	var expense *models.Expense
	var (
		id          int64
		name        string
		category    string
		description string
		amount      float64
		userid      int64
	)
	err := es.QueryRow("SELECT * from expense WHERE name = ? and category = ? and description = ?", reqName, reqCategory, reqDesc).Scan(&id, &name, &category, &description, &amount, &userid)
	if err != nil {
		log.Println(err)
		if err != sql.ErrNoRows {
			log.Println(err)
		} else {
			log.Println("No expense record exist")
			return nil
		}
	} else {
		expense = &models.Expense{id, userid, name, category, description, amount}
	}
	return expense
}

func (es *ExpenseStoreSQL) RecordIncome(incomeObj map[string]string) bool {
	stmt, err := es.Prepare("INSERT into income(ID, income_source, amount, description, user_id, timestamp) values(?,?,?,?,?,?)")
	_, err1 := stmt.Exec(nil, incomeObj["income_source"], incomeObj["amount"], incomeObj["description"], incomeObj["user_id"], incomeObj["timestamp"])
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) DeletePaymentRecord(paymentID string) bool {
	stmt, err := es.Prepare("DELETE from payment(ID, name, description, category_id, amount) where ?")
	_, err1 := stmt.Exec(paymentID)
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) UpdateIncomeRecord(IncomeObj map[string]string) bool {
	log.Println(IncomeObj)
	_, err := es.Exec("UPDATE income SET amount = ? where ID = ?", IncomeObj["amount"], IncomeObj["ID"])

	log.Println(err)
	if err != nil {
		return false
	}
	return true
}
func (es *ExpenseStoreSQL) DeleteIncomeRecord(incomeID int) bool {
	stmt, err := es.Prepare("DELETE from income where ID=?")
	_, err1 := stmt.Exec(incomeID)
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) RecordPaymentSplit(borrowers string, amount float64, user_id string, username string, description string, timestamp string) bool {
	stmt, err := es.Prepare("INSERT into payment_split(ID, borrowers, amount, user_id, username, description, timestamp) values(?,?,?,?,?,?,?)")
	_, err1 := stmt.Exec(nil, borrowers, amount, user_id, username, description, timestamp)
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) DeletePaymentSplitRecord(paymentID int) bool {
	stmt, err := es.Prepare("DELETE from payment_split where ID=?")
	_, err1 := stmt.Exec(paymentID)

	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}

	defer stmt.Close()
	return true
}

func (es *ExpenseStoreSQL) UpdatePassword(incomeObj map[string]string) bool {
	stmt, err := es.Prepare("UPDATE user SET password=? where ID=?")
	_, err1 := stmt.Exec(incomeObj["password"], incomeObj["userid"])
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) GetAmount(username string) float32 {
	//var user *models.User
	var total float32

	err := es.QueryRow("SELECT SUM(amount) from payment_split where username=? GROUP by username", username).Scan(&total)

	log.Print(total)

	if err != nil {
		log.Fatalln(err)
	}

	return total
}

func (es *ExpenseStoreSQL) GetAmountUserOwes(username string) float32 {
	var totalAmount float32
	err := es.QueryRow("SELECT SUM(amount) from payment_split where borrowers=? GROUP by borrowers", username).Scan(&totalAmount)

	log.Print(totalAmount)

	if err != nil {
		log.Fatalln(err)
	}
	return totalAmount
}

// NewExpenseStoreSQL returns a pointer to an initialized ExpenseStoreSQL
func NewExpenseStoreSQL() (*ExpenseStoreSQL, error) {
	e := ExpenseStoreSQL{}

	db, err := sql.Open("sqlite3", "./expense_management.db")
	if err != nil {
		return nil, err
	}

	e.DB = db

	return &e, nil
}
