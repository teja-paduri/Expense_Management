describe('login Page', () => {
  beforeEach(() => {
    visitLoginPage()
  })

it('User logs in  successfully and sees a Dashboard', () => {
    loginWith('karthik@gmail.com', 'karthik123')
    cy.url().should('eq', 'http://localhost:3000/#/dashboard')
})

  it("should validate email",()=>{
    cy.get('#emailInput')
  .type('fake@email.com')
  .should('have.value', 'fake@email.com')
})

it("password should not be empty",()=>{
    cy.get('#passwordInput')
  .type('hello')
  .should('have.value', 'hello')
})

it("Validating Logout button",()=>{
  cy.visit('http://localhost:3000/#/dashboard')
  logout()
  cy.url().should('eq', 'http://localhost:3000/#/register')

})

it("To check Valid Login Page or Not",()=>{
  
  cy.url().should('eq', 'http://localhost:3000/#/login')
  cy.contains('Login').should('exist')
  cy.contains('Enter login credentials').should('exist')
})

it("Validating the sign up link, which redirects to register page ",()=>{
  cy.get('#r1').click()
  cy.url().should('eq', 'http://localhost:3000/#/register')
  
})

it(' Checking Invalid Login credentials', () => {
  loginWith('Srisai123@gmail.com','1234567899')
  cy.url().should('eq', 'http://localhost:3000/#/login')
  cy.contains('Incorrect email or password.').should('exist')
})

})

const visitLoginPage = () => {
  cy.visit('http://localhost:3000/#/login')
}

const loginWith = (email, password) => {
  cy.get('#emailInput').type(email)
  cy.get('#passwordInput').type(password)
  //cy.get('button').click()
  cy.get('#loginButton').click()
}
const logout = () => {
  cy.get('#logout').click()
}