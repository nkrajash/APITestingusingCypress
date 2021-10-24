/// <reference types = "Cypress" />

describe("OAuth Feature APIs" , ()=> {

    let access_token = ''
    let user_id = ''

    beforeEach('generate the token' ,() => {
        //to get the access token
        cy.request({
            method : "POST",
            url: "/token",
            form: true,
            body: {
                "client_id" : "NavCypressApp",
                "client_secret" : "250b417279215add69d67bc0d8747d5b",
                "grant_type" : "client_credentials"
            }
        }).then( (response) => {
            cy.log(JSON.stringify(response))
            cy.log(response.body.access_token)
            access_token = response.body.access_token
        })
        cy.request({
            method: 'GET',
            url:'/api/me',
            headers: {
                'Authorization' : 'Bearer ' + access_token
            }
        }).then( (response) =>{
            cy.log(JSON.stringify(response))
            user_id = response.body.id
            cy.log("User ID is " + user_id)
        })
    })

    it("Feed Your Chickens test" , ()=>{
        cy.request({
            method: 'POST',
            url:'/api/' + user_id + '/chickens-feed',
            headers: {
                'Authorization' : 'Bearer ' + access_token
            }
        }).then( (response) =>{
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(200)
        })
    })

    it("Unlock the Barn	test" , ()=>{
        cy.request({
            method: 'POST',
            url:'/api/' + user_id + '/barn-unlock',
            headers: {
                'Authorization' : 'Bearer ' + access_token
            }
        }).then( (response) =>{
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(200)
        })
    })


    it("Put the Toilet Seat Down test" , ()=>{
        cy.request({
            method: 'POST',
            url:'/api/' + user_id + '/toiletseat-down',
            headers: {
                'Authorization' : 'Bearer ' + access_token
            }
        }).then( (response) =>{
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(200)
        })
    })

    
    it("Collect Eggs from Your Chickens	count test" , ()=>{
        cy.request({
            method: 'POST',
            url:'/api/' + user_id + '/eggs-collect',
            headers: {
                'Authorization' : 'Bearer ' + access_token
            }
        }).then( (response) =>{
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(200)
        })
    })

    
    it("Get the Number of Eggs Collected Today count test" , ()=>{
        cy.request({
            method: 'POST',
            url:'/api/' + user_id + '/eggs-count',
            headers: {
                'Authorization' : 'Bearer ' + access_token
            }
        }).then( (response) =>{
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(200)
        })
    })

})

