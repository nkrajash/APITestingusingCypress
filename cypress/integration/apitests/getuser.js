///<reference types = "cypress"/>

//https://gorest.co.in/ --> Online REST API for Testing and Prototyping

describe("Get API User Tests" , ()=> {

    let accessToken = '8d0a4bf9530c1874c0c5f079bbf06f646e1ce85189c4d29d584f70ae494bcf1a'

    it("Get Users " , ()=>{
        cy.request({
            method :"GET",
            url: "https://gorest.co.in/public-api/users",
            headers:{
                'authorization': "Bearer " + accessToken
            }
        }).then((res) => {
            expect(res.status).to.be.eql(200)
            expect(res.body.meta.pagination.limit).to.be.eq(20)
        })
    })

    it("Get Users by user id test " , () =>{
        cy.request({
            method :"GET",
            url: "https://gorest.co.in/public-api/users/2396",
            headers:{
                'authorization':  "Bearer " + accessToken
            }
        }).then((res) => {
            expect(res.status).to.be.eql(200)
            expect(res.body.data.name).to.be.eq("Eleanora")
        })
    })

})
