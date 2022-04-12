import { number } from "yup"

describe("Expense Cration",()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/#/dashboard')  
    })
    it("Amount",()=>{
        cy.get('#passwordInput').type("have.value")
    })

    it("Description",()=>{
        cy.get().type("")
    })
})