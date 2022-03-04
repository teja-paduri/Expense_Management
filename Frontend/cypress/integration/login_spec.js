describe('login', () => {
  beforeEach(() => {
    visitLoginPage()
  })

  it('A User logs in and sees a welcome message', () => {
    loginWith('upendar@example.com', 'passsword')

    expect(cy.contains('Welcome back Upendar')).to.exist
  })

  it('A User logs off and sees a goodbye message', () => {
    loginWith('upendar@example.com', 'password')
    logout()

    expect(cy.contains('Goodbye! See you soon!'))
  })
})

const visitLoginPage = () => {
  cy.visit('http://localhost:3000')
}

const loginWith = (email, password) => {
  cy.get('[name="email"]').type(email)
  cy.get('[name="password"]').type(password)
  cy.get('button').click()
}
const logout = () => {
  cy.get('button').click()
}