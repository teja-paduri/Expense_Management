import Expense from "../../src/app/expense/Expense"

describe("Home Page",()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/#/')  
    })
    
    it("Validate Login button",()=>{
        cy.visit('http://localhost:3000/#/')
        cy.get('a[href*="/login"]').click()
        cy.url().should('eq', 'http://localhost:3000/#/login')

        
    })
    it("Validate Sign Up button",()=>{
      cy.visit('http://localhost:3000/#/')
      cy.get('a[href*="/register"]').click() 
      cy.url().should('eq', 'http://localhost:3000/#/register')     
  })

  it("Should contain Title Expense Management",()=>{
    cy.visit('http://localhost:3000/#/')
    cy.contains('Expense').should('exist')
    cy.contains('Management').should('exist')   
  })

  

    // it("should submit the form",()=>{
    //     cy.get('#text').type("test")
    //     cy.get('#submitted').should('not.exist')
    //     cy.get('form').submit()
    //     cy.get('#submitted').should('exist')
    // })
})