# Expense Management Service
This application helps the user in managing both individual and group expenses by avoiding all the tidious calculations and also provides the analysis of all the transactions which gives the complete picture of their expenses.


# Team Members
SNO | Name                          | Github username| Type of development|
--- | -------------                 |:-------------: | :------------------:
1   | Surya Teja Paduri   | teja-paduri | Backend (Go lang)  |
2   | Anusha Chintha        |anusha-chintha| Backend (Go lang)    |
3   | Venkata Karthik Nakka |   karthiknakka7| Frontend(React)    |
4   | Upendar Penmetcha     | upendarpenmetcha  | Frontend (React)

**Tech Stack**

1. Go Lang.   
2. React JS
3. SQLite Database
4. Gorm

# Project Description

Expense management has multiple applications and services. One part of it allows its users to keep track of user's expenses and gives its users insights about the money spent on different categories. The other application of the Expense management keeps track of the money that is owed to the user and the money that user owes to others. This means that it allows to store the amount that the user spent for others or the amount that user lent for others. Similary, it stores and keeps track of the amount that user borrowed from others. This application gives the equal split for each individual (any number of individuals )for the specific amount spent by the user. The website also comprises of other features such as calculator, seetings page, proofile update etc. It also allows to store the income and the different sources from which you have got the particular income amount. 

The following functions are implemented int the final version of the project.
1. Registeration
2. Login 
3. Logout
4. Keep track of the expenses
5. Keep track of the income
7. Split the money that user paid
8. Monitor the amount you owe.
9. Monitor the amount you are owed. 
10. Dark and light mode.
11. Updating the user account details

## How to run the app?

### Start Backend
1. start backend by running the following commands
```
go run main.go
```
2. Running Backend Unit Testcases.   
```
cd tests
go test -v
```
### Start Frontend
1. start frontend by running the following commands
```
cd Frontend
npm install
npm start
```
2. Running Frontend Cypress Tests.   
```
cd Frontend
npx cypress open
```
## Frontend Info

* Frontend/src/app/landing/Website.jsx- Home page of the website which shows basic information about the website.
* Frontend/src/app/auth/Register.jsx- Register page of the website. Takes details like name, email, password and checks for uniqueness with DB and makes successful registeration
* Frontend/src/app/auth/Login.jsx- Login page of the website. Takes email and password to authenticate the user.
* Frontend/src/app/dashboard/Dashboard.jsx- The Main page of the Website. It contains the menu, which contains Income, Expense, Splitwise, Settings, Profile in the menu. This Page takes the inputs related to Expenses from user, such as amount,category,time, and inserts them in the DB.This page also has an inbuilt calculator for manual calculation of Expenses.
* Frontend/src/app/income/Expense.jsx- This Page retrieves the expenses made by user with their categories of expenses.
* Frontend/src/app/income/Income.jsx- This Page takes the inputs related to Income from user, such as source,amount,category,time, and inserts them in the DB.
* Frontend/src/app/income/Splitwise.jsx- It is the Splitwise page, It takes the inputs from user, such as borrowers name, amount, spent on, description. And then it splits the amount equally between everyone(user and the borrowers given) and inserts them into DB.  
* Frontend/src/app/income/Split.jsx- This page shows the amount,others owe to the user, and the amount,the user owes to others. 
* Frontend/src/app/income/Setting.jsx- This Page enables to change the menu color, menu mode and language of the Application Dashboard.
* Frontend/src/app/income/Profile.jsx- This page displays the Username  and email id of the user. And it also gives us the option to change the password for the user profile

## References

### Application Functionality Video:

https://user-images.githubusercontent.com/90812081/164535097-b6d0a471-15aa-4744-b8e8-df336d0bb00a.mp4



### Cypress Test Video:


https://user-images.githubusercontent.com/37012026/164549858-6e8c2e5b-cd8d-497d-9868-bc0d2bbdcab8.mp4



### Backend Unit Test Video:

https://user-images.githubusercontent.com/90118940/164564836-3a44bfeb-48ee-4e17-9fea-3143393dc360.mp4

```
https://github.com/teja-paduri/Expense_Management/blob/main/Sprint4/Backend%20Unit%20Tests%20Demo.mp4
```

### Link to API Documentation:
```
https://github.com/teja-paduri/Expense_Management/blob/main/Sprint4/SPRINT%204%20Backend%20Documentation.pdf
```

### Link to Project board:
```
https://github.com/teja-paduri/Expense_Management/projects
```

### Link to Sprint-4 deliverables:
```
https://github.com/teja-paduri/Expense_Management/projects/4
```

