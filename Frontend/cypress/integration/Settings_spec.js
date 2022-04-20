describe('Setting Page Test Cases Suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/dashboard')  
    })

    it("To check Valid Settings Page or Not",()=>{
  
      cy.get('#menubutton').click()
      cy.get('a[href*="/setting"]').click()
      cy.url().should('eq', 'http://localhost:3000/#/setting')
        cy.contains('INTERFACE SETTINGS').should('exist')
        cy.contains('Below are the current setup for this UI.').should('exist')
      })

      it("To check for Titles present in Settings Page ",()=>{
  
        cy.get('#menubutton').click()
        cy.get('a[href*="/setting"]').click()
        cy.url().should('eq', 'http://localhost:3000/#/setting')
        cy.get('div').contains('INTERFACE SETTINGS').should('exist')
        cy.get('div').contains('Below are the current setup for this UI.').should('exist')
       
       
      })

      it("To check Menu Color Heading is Present in Settings Page",()=>{
  
        cy.visit('http://localhost:3000/#/setting')
        cy.get('div').contains('Menu Color:').should('exist')
       
       
      })

      it("To check Menu Mode Heading is Present in Settings Page",()=>{
  
        cy.visit('http://localhost:3000/#/setting')
        cy.get('h3').contains('Menu Mode:').should('exist')
       
       
      })

      it("To check Language Heading is Present in Settings Page",()=>{
  
        cy.visit('http://localhost:3000/#/setting')
        cy.get('h3').contains('Language:').should('exist')
       
       
      })

      it("To check toggle button for Menu color",()=>{
  
        cy.visit('http://localhost:3000/#/setting')
        cy.get('#menucolor').click()
        cy.contains('Light').should('exist')
    })
        it("To check toggle button for Menu mode",()=>{
  
            cy.visit('http://localhost:3000/#/setting')
            cy.get('#menumode').click()
            cy.contains('Overlay').should('exist')
      })

      it("To check toggle button for language",()=>{
  
        cy.visit('http://localhost:3000/#/setting')
        cy.get('#language').click()
        cy.contains('বাংলা').should('exist')

     
    })
      
      
})