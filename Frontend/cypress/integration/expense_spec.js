import { number } from "yup"

describe("Expense Creation",()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/#/dashboard')  
    })

    it("To check Valid Dashboard Page or Not",()=>{
        cy.contains('Expenses Info').should('exist')
        cy.contains('Enter your expenses').should('exist')
        cy.url().should('eq', 'http://localhost:3000/#/dashboard')
      })

      it("should validate name",()=>{
        cy.get('#ename')
      .type('Srisai')
      .should('have.value', 'Srisai')
    })

    it("should validate userid",()=>{
        cy.get('#euserid')
      .type('32')
      .should('have.value', '32')
    })

    it("should validate etimestamp",()=>{
        cy.get('#etimestamp')
      .type('32')
      .should('have.value', '')
    })

    it("should validate category",()=>{
        cy.get('#ecategory')
      .type('Food')
      .should('have.value', 'Food')
    })

    it("should validate description",()=>{
        cy.get('#edescription')
      .type('KFC')
      .should('have.value', 'KFC')
    })

    it("should validate amount",()=>{
        cy.get('#amountInputExpense')
      .type('25')
      .should('have.value', '25')
    })

    it("Testing the add Expense button and its funcionality",()=>{
        addExpense('Srisai','32')
        cy.get('#ecategory').type('Food').should('have.value','Food')
        cy.get('#edescription').type('KFC').should('have.value','KFC')
        cy.get('#amountInputExpense').type('20').should('have.value','20')
        cy.get('#eaddexpense').click()
        cy.contains('Expense Added Successfully').should('exist')
    })

    it("Validating Logout Button",()=>{
        cy.get('#logout').click()
        cy.url().should('eq', 'http://localhost:3000/#/register')
    })

    it("Check dashboard contains menu or not",()=>{
        cy.get('#menubutton').click()
        cy.contains('Dashboard').should('exist')
        cy.contains('Expense').should('exist')
        cy.contains('Income').should('exist')
        cy.contains('Splitwise').should('exist')
        cy.contains('Settings').should('exist')
        cy.contains('Profile').should('exist')
    })
    const addExpense = (name, userid) => {
        cy.get('#ename').type(name)
        cy.get('#euserid').type(userid)
        
       
      }
})