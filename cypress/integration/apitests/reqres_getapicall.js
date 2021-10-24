///<reference types = "cypress"/>
describe("Get API for REST" , ()=> {

    it("Get API Test for Flask - motorbike" , ()=>{
        cy.request("https://www.flask-rest-api-demo.herokuapp.com/product/motorbike").then((res) => 
        {
            expect((res.status).equal(200))
            expect(res.body.product[0]).has.property("price",599.99)
            expect(res.body.product[0]).has.property("product","motorbike")
        })
    })

    it("Get API for Flask - users" , ()=>{
        cy.request("https://www.flask-rest-api-demo.herokuapp.com/users").then((res) => 
        {
            expect((res.status).equal(200))
            expect(res.body.users[0]).has.property("username","test_1")
            expect(res.body.users[1]).has.property("id",2)
            expect(res.body.users).has.length(5)
            expect(res.body.users[0]).not.have.property("price")
        })
    })
	
	it("Get API for Reqres API - Users" , ()=>{
        cy.request("https://www.reqres.in/api/users?page=2").then((res) => 
        {
            expect((res.status).equal(200))
            expect(res.body.data[0]).has.property("first_name","Micheal")
            expect(res.body.data[1]).has.property("email","lindsay.ferguson@reqres.in")
            expect(res.body.users).has.length(6)
        })
    })

})