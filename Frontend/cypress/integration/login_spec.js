describe('login Page', () => {
  beforeEach(() => {
    visitLoginPage()
  })

  it('A User logs in and sees a welcome message', () => {
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