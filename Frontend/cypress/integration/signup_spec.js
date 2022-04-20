describe('SignUp', () => {
    beforeEach(() => {
      visitSignUpPage()
    })
  
    it("To check Valid Signup Page or Not",()=>{
  
      cy.url().should('eq', 'http://localhost:3000/#/register')
      cy.contains('Register').should('exist')
      cy.contains('Enter your info to register').should('exist')
    })

    it("should validate email",()=>{
      cy.get('#remail')
    .type('fake@email.com')
    .should('have.value', 'fake@email.com')
  })
  
  it("password should not be empty",()=>{
      cy.get('#rpassword')
    .type('hello')
    .should('have.value', 'hello')
  })

    it("name should not be empty",()=>{
      cy.get('#rname')
    .type('hello')
  .should('have.value', 'hello')
  })

    it('A User Signs up succesfully and sees an acknowledgement message', () => {
      SignUp('TejaT','Teja2408@gmail.com','Teja12345')
      cy.url().should('eq', 'http://localhost:3000/#/register')
      cy.contains('Registration successful. Go to login.').should('exist')

    })
  
    it('If a User Already exists', () => {
      SignUp('Sri sai','Srisai123@gmail.com','12345678')
      cy.url().should('eq', 'http://localhost:3000/#/register')
      cy.contains('Hey, This User already exists').should('exist')
    })
    
    it("Validating the login link, which redirects to login page ",()=>{
      cy.get('#l1').click()
      cy.url().should('eq', 'http://localhost:3000/#/login')
      
    })
    
    

  })
  
  const visitSignUpPage = () => {
    cy.visit('http://localhost:3000/#register')
  }
  
  const SignUp = (name, email, password) => {
    cy.get('#rname').type(name)
    cy.get('#remail').type(email)
    cy.get('#rpassword').type(password)
    cy.get('#registerbutton').click()
  }
  