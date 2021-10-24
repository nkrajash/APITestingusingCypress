/// <reference types = "Cypress" />

describe("Intercept with Cypress examples" , ()=> {

    it("Test API with Simple Intercept" , ()=>{
        cy.visit("https://jsonplaceholder.typicode.com/")
        cy.intercept({
            path: "/posts",
        }).as("posts")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@posts").then( inter => {
            cy.log(JSON.stringify(inter))
            console.log(JSON.stringify(inter))
            expect(inter.response.body).to.have.length(100)
        })
    })

    it("Mocking with Intercept Test with static response" , () =>{
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.intercept( 'GET' , '/posts', { totalpost : 5 , name: 'Naveen' } ).as("posts")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@posts")
    })


    it("Mocking with Intercept Test with dynamic fixture" , () =>{
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.intercept( 'GET' , '/posts', { fixture: 'createuser.json' } ).as("posts")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@posts")
    })
    
    it("Mocking with Intercept Test with dynamic fixture with json" , () =>{
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.intercept( 'GET' , '/posts', (req) => {
            req.reply( (res) => {
                res.send( { fixture: 'createuser.json' } )
            })
        })
    })

})

