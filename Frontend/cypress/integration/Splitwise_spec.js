describe('Splitwise Page Test Cases Suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/splitwise')  
    })
  
    it("To check Valid Splitwise Page or Not",()=>{
        cy.visit('http://localhost:3000/#/dashboard')
        cy.get('#menubutton').click()
        cy.get('a[href*="/splitwise"]').click({ multiple: true })
        cy.url().should('eq', 'http://localhost:3000/#/splitwise')
        cy.contains('Splitwise Info').should('exist')
        cy.contains("Enter the Split Amount and Names").should('exist')
      })
  
      it("To check Title for Splitwise page is present",()=>{
        cy.visit('http://localhost:3000/#/dashboard')
        cy.get('#menubutton').click()
        cy.get('a[href*="/splitwise"]').click({ multiple: true })
        cy.url().should('eq', 'http://localhost:3000/#/splitwise')
        cy.get('div').contains('Splitwise Info').should('exist')
        cy.get('div').contains('Enter the Split Amount and Names').should('exist')
       
       
      })
  
      it("should validate username",()=>{
        cy.get('#susername')
      .type('Sri sai')
      .should('have.value', 'Sri sai')
    })
    it("should validate userid",()=>{
        cy.get('#suserid')
      .type('32')
      .should('have.value', '32')
    })
  
    it("should validate etimestamp",()=>{
        cy.get('#stimestamp')
      .type('32')
      .should('have.value', '')
    })
  
    it("should validate borrowers",()=>{
        cy.get('#sborrowers')
      .type('Anusha,Karthik,Teja')
      .should('have.value', 'Anusha,Karthik,Teja')
    })
  
    it("should validate description",()=>{
        cy.get('#sdescription')
      .type('sdescription')
      .should('have.value', 'sdescription')
    })
  
    it("should validate amount",()=>{
        cy.get('#samount')
      .type('25')
      .should('have.value', '25')
    })
  
    
  
    it("Testing the Add Split button and its funcionality",()=>{
        addSplit('Sri sai','32','Anusha,Karthik,Teja','Paradise','40')
        cy.get('#stimestamp').type('32').should('have.value', '')
        //cy.get('#icategory').type('Salary').should('have.value', '')
        //cy.get('#isource').type('Company').should('have.value', 'Company')
        //cy.get('#iamount').type('25').should('have.value', '25')
        //cy.get('#inotes').type('Commvault').should('have.value', 'Commvault')
       
        cy.contains('Split Expense Added Successfully').should('exist')
    })
  
    it("to check valid name or not",()=>{
        cy.visit('http://localhost:3000/#/')
        cy.get('a[href*="/register"]').click()
        cy.url().should('eq', 'http://localhost:3000/#/register')
        SignUp('TejaT','Teja2408@gmail.com','Teja12345')
      
        
    })
   
        
  })
  const addSplit = (username,userid,borrowers,description,amount) => {    
    cy.get('#susername').type(username)
    cy.get('#suserid').type(userid)
    cy.get('#sborrowers').type(borrowers)
    cy.get('#sdescription').type(description)
    cy.get('#samount').type(amount)
    cy.get('#saddsplitexpense').click()
    
  }

  const SignUp = (name, email, password) => {
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
        cy.url().should('eq', 'http://localhost:3000/#/splitwise')
      cy.get('#susername').should('have.value',name)
      
  }