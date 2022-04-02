# Expense Management Service
 This application helps the user in managing both individual and group expenses by avoiding all the tidious calculations and also provides the analysis of all the transactions which gives the complete picture of their expenses.


## Functionalities  Implemented for Sprint3

 * Registration Page
 * Login Page and its Authentication.
 * Added Expenses Management Dashboard.
 * Expenses data Insertion.
 * To display and edit the user details. Created Profile, EditProfile Pages. 
 * Implemented a Calculator to manually calculate the user expenses.
 * Squashed Redirecting Bugs and Removed Unnecessary pages.
 * Added User Expenses and Payment API functionalities in backend.
 * Added Unit Tests for all the APIs implemented in Go Lang.
 * Cypress Testing for FrontEnd is Implemented.

## Front-End
 * Created a Landing Page
 * Created a Register page, Login Page with authentication from the database 
 * Added Profile page with displaying user details and an option to change password.
 * Added Edit Profile Page to edit the user deatils
 * Implemented a calculator, to calculate the user expenses manually.
 * Created Settings Page
 * Cypress Test is done over Register and Login Functionalities

## Back-End

 * Modified the errors occured while running user API test cases
 * Added new test cases for User Login and Authentication APIs.
 * Created Expense Database schema.
 * Created Payments Database schema.
 * Established connection between user and new database schemas.
 * Implemented Create, Retrieve, Update, Delete API functionalities for User Expenses.
 * Used Go Lang testing package for implementing Unit Test cases.
 * Added all valid and invalid unit test cases for the implemented Expense APIs.
 * Implemented Insert and Delete API functionalities for user payments and added unit test cases for these functionalities


## Installation
## Front-End

The frontend requires Node JS (version 14.17.1 and above) installed in your environment.

* You can download Node JS from [here](https://nodejs.org/en/download/) and follow the instructions to complete the installation.
* You can verify the installation by copying these command and running them in your terminal `node -v` and `npm -v`.
* Also, the above commands will run if you have an existing installation of Node JS.
* To install cypress for testing run the following command after installing Node JS `npm install cypress`, if you are facing any issues refer this [link](https://docs.cypress.io/guides/getting-started/installing-cypress#What-you-ll-learn).

## Back-End

The backend application requires the following packages to run.

* Go Lang must be installed in your system. It can be installed using [Go Lang](https://go.dev/doc/install).
* Currently we are using go version `go1.17.3 darwin/amd64`. Check Go version using the command `go version`.
* Along with Go Lang, we are using **Gorm** to integrate our application to the SQLite Database.
* And, we **mux** must be installed to access the router objects and send http requests to the frontend.
* For testing APIs locally, Postman application is being used.

## Steps to run the Project
## Cloning the Repository

* Clone the repository to your local environment by the running the below command in your terminal.

      git clone https://github.com/teja-paduri/Expense_Management.git

* Now in the directory where you cloned this repository open a terminal and run the following commands

## To run Front-End

 Now in the directory where you cloned this repository open a terminal and run the following commands

* `cd Frontend`

* `npm install` 

* `npm start`

The npm install command installs the required packages, dependencies and creates a react app.
To run the app, you can simply execute the npm start command, then a local server that hosts the react app is started.

## To run Back-End

 Now in the directory where you cloned this repository open a terminal and run the following commands
* `go run main.go`

Once you run the command, the backend application will start running on the local port 8080 [localhost:8080](http://localhost:8080/)

## To run cypress Tests for Front-End

To install cypress on your local environment refer installation page

* `cd Frontend`

* `npx cypress open`

## Screenshot of working of Backend APIs

Create Expense:

![expense POST](https://github.com/teja-paduri/Expense_Management/blob/main/Screenshots/create_expense.png)

Get Expense:

![expense_GET](https://github.com/teja-paduri/Expense_Management/blob/main/Screenshots/get_exp.png)

Get Expense(Fail):

![expense_GET_FAILED](https://github.com/teja-paduri/Expense_Management/blob/main/Screenshots/get_exp1.png)
 



