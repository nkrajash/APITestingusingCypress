/// <reference types = "cypress"/>

//https://gorest.co.in/ --> Online REST API for Testing and Prototyping

describe("Delete API User Tests" , ()=> {

    let accessToken = '8d0a4bf9530c1874c0c5f079bbf06f646e1ce85189c4d29d584f70ae494bcf1a'

    it("Delete Users - API " , ()=>{
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

            //1. POST Call API
            cy.request({
                method :"POST",
                url: "https://gorest.co.in/public/v1/users",
                headers:{
                    'authorization': "Bearer " + accessToken
                },
                body:{
                    "name": "Naveen Automation Labs",
                    "email": "naveencypress23@gmail.com",
                    "gender": "male",
                    "status": "active"
                }
            }).then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data.name).to.eq("Naveen Automation Labs")
                expect(res.body.data).has.property('email',"naveencypress23@gmail.com")
                expect(res.body.data).has.property('gender',"male")
                expect(res.body.data).has.property('status',"active")
            }).then((res) => {
                const userId = res.body.data.id
                cy.log("user Id is : " + userId)
                cy.request({
                    //2. Delete Call API
                    method :"DELETE",
                    url: "https://gorest.co.in/public/v1/users/" + userId,
                    headers:{
                        'authorization': "Bearer " + accessToken
                    }
                }).then((res)=> {
                    expect(res.status).to.eq(204)
                })
            })
        })
})

