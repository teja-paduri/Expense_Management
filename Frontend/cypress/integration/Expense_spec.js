describe('Expense Page Test Cases Suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/expense')  
    })

    it("To check Valid Expense Page or Not",()=>{
  
        cy.url().should('eq', 'http://localhost:3000/#/expense')
        cy.contains('View Expenses').should('exist')
        cy.contains('Here are few expenses').should('exist')
        cy.contains("you've added").should('exist')
      })

      it("To check Title for Expense page is present",()=>{
  
        cy.visit('http://localhost:3000/#/expense')
        cy.get('div').contains('View Expenses').should('exist')
       
       
      })

      it("To check serial column is Present in Expense Page",()=>{
  
        cy.visit('http://localhost:3000/#/expense')
        cy.get('span').contains('Serial').should('exist')
       
       
      })

      it("To check Spent On column is Present in Expense Page",()=>{
  
        cy.visit('http://localhost:3000/#/expense')
        cy.get('span').contains('Spent On').should('exist')
       
       
      })

      it("To check Category column is Present in Expense Page",()=>{
  
        cy.visit('http://localhost:3000/#/expense')
        cy.get('span').contains('Category').should('exist')
       
       
      })

      it("To check Amount column is Present in Expense Page",()=>{
  
        cy.visit('http://localhost:3000/#/expense')
        cy.get('span').contains('Amount').should('exist')
       
       
      })

      
      
})