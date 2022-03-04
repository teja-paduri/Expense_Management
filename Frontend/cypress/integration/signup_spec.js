describe('SignUp', () => {
    beforeEach(() => {
      visitSignUpPage()
    })
  
    it('A User Signs in and sees a welcome message', () => {
      loginWith('upendar@example.com', 'passsword')
  
      expect(cy.contains('Welcome back Upendar')).to.exist
    })
  
    it('A User Already exists', () => {
      loginWith('upendar@example.com', 'password')
      expect(cy.contains('A user already exists!!'))
    })
  })
  
  const visitSignUpPage = () => {
    cy.visit('http://localhost:3000')
  }
  
  const loginWith = (email, password) => {
    cy.get('[name="email"]').type(email)
    cy.get('[name="password"]').type(password)
    cy.get('button').click()
  }
  