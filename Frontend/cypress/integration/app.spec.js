describe("form submission",()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/#/login')  
    })
    it("should validate email",()=>{
        cy.get('#emailInput')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
    })
    it("password should not be empty",()=>{
        cy.get('#passwordInput')
      .type('hello')
      .should('have.value', 'hello')
    })
    it("Validate button",()=>{
        // cy.get('#emailInput')
        // .type('')
        // .should('have.value', '')
        cy.get("#loginButton").click()
        cy.get("#passwordError").should('eq',"Password field is required.")
        
    })

    // it("should submit the form",()=>{
    //     cy.get('#text').type("test")
    //     cy.get('#submitted').should('not.exist')
    //     cy.get('form').submit()
    //     cy.get('#submitted').should('exist')
    // })
})