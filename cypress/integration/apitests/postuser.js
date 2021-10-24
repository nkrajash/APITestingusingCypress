/// <reference types = "cypress"/>

//https://gorest.co.in/ --> Online REST API for Testing and Prototyping

const dataJson = require("../../fixtures/createuser.json")

describe("Post API User Tests" , ()=> {

    let accessToken = '8d0a4bf9530c1874c0c5f079bbf06f646e1ce85189c4d29d584f70ae494bcf1a'
    let randomText = ""
    let testEmail = ""

    it("Get Users - API Chaining " , ()=>{
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        for(var i=0;i<10;i++){
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
        }

        testEmail += randomText + "@gmail.com"

        cy.fixture('createuser').then((payload) => {
            //1. POST Call API
            cy.request({
                method :"POST",
                url: "https://gorest.co.in/public/v1/users",
                headers:{
                    'authorization': "Bearer " + accessToken
                },
                body:{
                    "name": payload.name,
                    "email": testEmail,
                    "gender": payload.gender,
                    "status": payload.status
                }
            }).then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data.name).to.eq(payload.name)
                expect(res.body.data).has.property('email',testEmail)
                expect(res.body.data).has.property('gender',payload.gender)
                expect(res.body.data).has.property('status',payload.status)
            }).then((res) => {
                const userId = res.body.data.id
                cy.log("user Id is : " + userId)
                cy.request({
                    //2. GET Call API
                    method :"GET",
                    url: "https://gorest.co.in/public/v1/users/" + userId,
                    headers:{
                        'authorization': "Bearer " + accessToken
                    }
                }).then((res)=> {
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id',userId)
                    expect(res.body.data).has.property('email',testEmail)
                    expect(res.body.data).has.property('gender',payload.gender)
                    expect(res.body.data).has.property('status',payload.status)
                })
            })
        })
    })

})

