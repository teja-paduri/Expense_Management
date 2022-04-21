

export const host = process.env.REACT_APP_API_HOST;

export const authApiEndpoints = {
  login: 'http://localhost:8080/user/login',
  register: 'http://localhost:8080/user/register',
  expense : 'http://localhost:8080/expense',
  updatePwd : 'http://localhost:8080/user/passwordudpate',
  paymentsplit : 'http://localhost:8080/expense/insertpaymentsplit',
  owedApiUrl:'http://localhost:8080/expense/user/owes/',
  owesApiUrl:'http://localhost:8080/expense/useramountowed/'
  // userData:'http://localhost:8080/users/'
};

export const incomeApiEndpoints ={
  insertIncome:'http://localhost:8080/expense/insertincome',
}