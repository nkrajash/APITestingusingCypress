/// <reference types = "cypress"/>

/* 
https://www.metaweather.com/api/ --> 
MetaWeather provides an API that delivers JSON over HTTPS for access to our data.

Case1 : Pass singe value
1. Call one API(GET) and fetch the JSON value from JSON response
2. Pass the same JSON value to the second request
3. Validate the same

Case2: Pass JSON Array
1. Call one API(GET) and fetch the JSON Array from response
2. Pass the same JSON Array to the second request
3. Start a loop to call the second request one by one for each Array value
4. Validate the same
*/

describe("check weather information ", ()=> {
    it("Get weather information for a city " , ()=>{
        //1st request - Get locations by 'San'
        cy.request({
            method: 'GET',
            url:'https://www.metaweather.com/api/location/search/?query=San',
        }).then((resp) => {
            const city = resp.body[0].title
            return city
        }).then( (city) => {
            // 2nd request - for the first location/city
            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query=' + city
            }).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.body[0]).to.have.property('title',city)
            })
        })
    })

    it("Get weather information for all cities" , ()=>{
        //1st request - Get locations having 'Am'
        cy.request({
            method: 'GET',
            url:'https://www.metaweather.com/api/location/search/?query=Am',
        }).then((resp) => {
            const location = resp.body
            return location
        }).then( (location) => {
            // Start a loop to call the second request one by one for each Array value
            for(let i=0;i<location.length;i++){
                // 2nd request - for each location/city using loop
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query=' + location[i].title
                }).then((resp) => {
                    cy.log(JSON.stringify(resp))
                    expect(resp.status).to.eq(204)
                    expect(resp.body[0]).to.have.property('title',location[i].title)
                })
            }
        })
    })
})