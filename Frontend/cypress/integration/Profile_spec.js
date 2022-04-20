describe('Profile Page Test Cases Suite', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/#/profile')  
  })

  it("To check Valid Profile Page or Not",()=>{
      cy.visit('http://localhost:3000/#/dashboard') 
      cy.get('#menubutton').click()
      cy.get('a[href*="/profile"]').click()
      cy.url().should('eq', 'http://localhost:3000/#/profile')
      cy.contains('Profile Info').should('exist')
      cy.contains("Password Info").should('exist')
      cy.contains("Name:").should('exist')
      cy.contains("Email:").should('exist')
      cy.contains("Manage your current password here.").should('exist')
    })

    it("To check Title for Profile page is present",()=>{
      cy.visit('http://localhost:3000/#/dashboard') 
      cy.get('#menubutton').click()
      cy.get('a[href*="/profile"]').click()
      cy.url().should('eq', 'http://localhost:3000/#/profile')
      cy.get('div').contains('Profile Info').should('exist')
      cy.get('div').contains('Password Info').should('exist')
      cy.get('div').contains('Manage your current password here.').should('exist')
       
    })

    it("To check whether Headings are present",()=>{

      cy.visit('http://localhost:3000/#/profile')
      cy.get('h3').contains('Name:').should('exist')
      cy.get('h3').contains('Email:').should('exist')
       
    })


  it("should validate userid",()=>{
      cy.get('#puserid')
    .type('32')
    .should('have.value', '32')
  })

  it("should validate New password",()=>{
      cy.get('#pnewpassword')
    .type('srisai123')
    .should('have.value', 'srisai123')
  })

  it("should validate Confirm password",()=>{
      cy.get('#pconfirmpassword')
    .type('srisai123')
    .should('have.value', 'srisai123')
  })

  it("to check valid email or not",()=>{
      cy.visit('http://localhost:3000/#/')
      cy.get('a[href*="/login"]').click()
      cy.url().should('eq', 'http://localhost:3000/#/login')
      loginWith('karthik@gmail.com', 'karthik123')
      
  })

  it("to check valid name or not",()=>{
      cy.visit('http://localhost:3000/#/')
      cy.get('a[href*="/register"]').click()
      cy.url().should('eq', 'http://localhost:3000/#/register')
      SignUp('TejaT','Teja2408@gmail.com','Teja12345')
    
      
  })
  


  it("Testing the Change Password button and its funcionality",()=>{
      changePassword('32','srisai123','srisai123')
     // cy.contains('Password Updated Successfully').should('exist')
     
  })


  const loginWith = (email, password) => {
      cy.get('#emailInput').type(email)
      cy.get('#passwordInput').type(password)
      //cy.get('button').click()
      cy.get('#loginButton').click()
      cy.visit('http://localhost:3000/#/dashboard') 
      cy.get('#menubutton').click()
      cy.get('a[href*="/profile"]').click()
      cy.url().should('eq', 'http://localhost:3000/#/profile')
      
      cy.get('h3').contains(email).should('exist')
    }
      
})
const changePassword = (userid,newpassword,confirmpassword) => {    
  cy.get('#puserid').type(userid)
  cy.get('#pnewpassword').type(newpassword)
  cy.get('#pconfirmpassword').type(confirmpassword)
  
}
const SignUp = (name, email, password) => {
  cy.get('#rname').type(name)
  cy.get('#remail').type(email)
  cy.get('#rpassword').type(password)
  cy.get('#registerbutton').click()
  cy.url().should('eq', 'http://localhost:3000/#/register')
   //cy.contains('Registration successful. Go to login.').should('exist')
    //loginWith('Teja2408@gmail.com', 'Teja12345')
    cy.get('#l1').click()
    cy.url().should('eq', 'http://localhost:3000/#/login')
    cy.get('#emailInput').type(email)
      cy.get('#passwordInput').type(password)
      //cy.get('button').click()
      cy.get('#loginButton').click()
      cy.visit('http://localhost:3000/#/dashboard') 
      cy.get('#menubutton').click()
      cy.get('a[href*="/profile"]').click()
      cy.url().should('eq', 'http://localhost:3000/#/profile')
    cy.get('h3').contains(name).should('exist')
    
}
