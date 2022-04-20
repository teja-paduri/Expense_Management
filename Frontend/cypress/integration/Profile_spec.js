describe('Profile Page Test Cases Suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/dashboard')  
    })

    it("To check Valid Profile Page or Not",()=>{
  
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
  
        cy.get('#menubutton').click()
        cy.get('a[href*="/profile"]').click()
        cy.url().should('eq', 'http://localhost:3000/#/profile')
        cy.get('div').contains('Profile Info').should('exist')
        cy.get('div').contains('Password Info').should('exist')
        cy.get('div').contains('Manage your current password here.').should('exist')
         
      })

      it("To check whether Headings are present",()=>{
  
        cy.visit('http://localhost:3000/#/income')
        cy.get('h3').contains('Name:').should('exist')
        cy.get('h3').contains('Email:').should('exist')
         
      })


    it("should validate userid",()=>{
        cy.get('#iuserid')
      .type('32')
      .should('have.value', '32')
    })

    it("should validate etimestamp",()=>{
        cy.get('#itimestamp')
      .type('32')
      .should('have.value', '')
    })

    it("should validate category",()=>{
        cy.get('#icategory')
      .type('Salary')
      .should('have.value', '')
    })

    it("should validate income source",()=>{
        cy.get('#isource')
      .type('Company')
      .should('have.value', 'Company')
    })

    it("should validate amount",()=>{
        cy.get('#iamount')
      .type('25')
      .should('have.value', '25')
    })

    it("should validate income notes field",()=>{
        cy.get('#inotes')
      .type('Commvault')
      .should('have.value', 'Commvault')
    })

    it("Testing the add Income button and its funcionality",()=>{
        addIncome('32','Company','300','Commvault')
        cy.get('#itimestamp').type('32').should('have.value', '')
        //cy.get('#icategory').type('Salary').should('have.value', '')
        //cy.get('#isource').type('Company').should('have.value', 'Company')
        //cy.get('#iamount').type('25').should('have.value', '25')
        //cy.get('#inotes').type('Commvault').should('have.value', 'Commvault')
       
        cy.contains('Income Added Successfully').should('exist')
    })


   
        
})
const addIncome = (userid,isource,iamount,inotes) => {    
    cy.get('#iuserid').type(userid)
    cy.get('#isource').type(isource)
    cy.get('#iamount').type(iamount)
    cy.get('#inotes').type(inotes)
    cy.get('#iaddincome').click()
    
}