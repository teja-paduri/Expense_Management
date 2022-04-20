describe('Income Page Test Cases Suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/income')  
    })

    it("To check Valid Income Page or Not",()=>{
        cy.visit('http://localhost:3000/#/dashboard')
        cy.get('#menubutton').click()
        cy.get('a[href*="/income"]').click()
        cy.url().should('eq', 'http://localhost:3000/#/income')
        cy.contains('Add Income').should('exist')
        cy.contains("Add your income information below.").should('exist')
      })

      it("To check Title for Income page is present",()=>{
        cy.visit('http://localhost:3000/#/dashboard')
        cy.get('#menubutton').click()
        cy.get('a[href*="/income"]').click()
        cy.url().should('eq', 'http://localhost:3000/#/income')
        cy.get('div').contains('Add Income').should('exist')
        cy.get('div').contains('Add your income information below.').should('exist')
       
       
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