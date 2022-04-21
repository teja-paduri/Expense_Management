describe('Split Page Test Cases Suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/split')  
    })
  
    it("To check Valid Split Page or Not",()=>{
        cy.visit('http://localhost:3000/#/dashboard')
        cy.get('#menubutton').click()
        cy.get('a[href*="/splitwise"]').click({ multiple: true })
        //cy.get('a[href*="/split"]').click({ multiple: true })
        cy.visit('http://localhost:3000/#/split')  
        cy.url().should('eq', 'http://localhost:3000/#/split')
        cy.contains('Money that you owe').should('exist')
        cy.contains("Money you are owed").should('exist')
      })
  
      it("To check Title for Splitwise page is present",()=>{
        cy.visit('http://localhost:3000/#/dashboard')
        cy.get('#menubutton').click()
        cy.get('a[href*="/splitwise"]').click({ multiple: true })
        //cy.get('a[href*="/split"]').click({ multiple: true })
        cy.visit('http://localhost:3000/#/split')  
        cy.url().should('eq', 'http://localhost:3000/#/split')
        cy.get('div').contains('Money that you owe').should('exist')
        cy.get('div').contains('Money you are owed').should('exist')
       
       
      })
      it("validate username field at Money that you owe",()=>{
        cy.get('#susername1')
      .type('Sri sai')
      .should('have.value', 'Sri sai')
    })
      
    it("validate username field at Money you are owed",()=>{
        cy.get('#susername2')
      .type('Sri sai')
      .should('have.value', 'Sri sai')
    })
      
    it(" validate userid at Money that you owe",()=>{
        cy.get('#suserid1')
      .type('32')
      .should('have.value', '32')
    })
    it(" validate userid at money you are owed",()=>{
        cy.get('#suserid2')
      .type('32')
      .should('have.value', '32')
    })
  
   
  
    
  
    
  
    
  
    
  
    /*it("to check valid name or not",()=>{
        cy.visit('http://localhost:3000/#/')
        cy.get('a[href*="/register"]').click()
        cy.url().should('eq', 'http://localhost:3000/#/register')
        SignUp('TejaT','Teja2408@gmail.com','Teja12345')
      
        
    })*/
   
        
  })
  

  /*const SignUp = (name, email, password) => {
    cy.get('#rname').type(name)
    cy.get('#remail').type(email)
    cy.get('#rpassword').type(password)
    cy.get('#registerbutton').click()
    cy.url().should('eq', 'http://localhost:3000/#/register')
      cy.get('#l1').click()
      cy.url().should('eq', 'http://localhost:3000/#/login')
      cy.get('#emailInput').type(email)
        cy.get('#passwordInput').type(password)

        cy.get('#loginButton').click()
        cy.visit('http://localhost:3000/#/dashboard') 
        cy.get('#menubutton').click()
        cy.get('a[href*="/splitwise"]').click({ multiple: true })
        cy.visit('http://localhost:3000/#/split')
      cy.get('#susername1').should('have.value',name)
      cy.get('#susername2').should('have.value',name)
      
      
  }*/