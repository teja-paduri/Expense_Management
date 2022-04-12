describe('login', () => {
  beforeEach(() => {
    visitLoginPage()
  })

  it('A User logs in and sees a welcome message', () => {
    loginWith('upendar@example.com', 'passsword')
    expect(cy.contains('Welcome back Upendar')).to.exist
  })

})

const visitLoginPage = () => {
  cy.visit('http://localhost:3000/#/login')
}

const loginWith = (email, password) => {
  cy.get('#emailInput').type(email)
  cy.get('#passwordInput').type(password)
  cy.get('button').click()
}
const logout = () => {
  cy.get('button').click()
}