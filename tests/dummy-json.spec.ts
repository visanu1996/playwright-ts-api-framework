import { dummySchema } from '../config/config'
import { test, expect } from './fixtures/api.fixture'

test.describe('DummyJSON Testing', ()=>{
    test('TC001 - Logs in and retrieves the current user', async({dummyJson})=>{
        let loginResponse = await dummyJson.loginAndGetToken()
        await dummyJson.verifySchema(loginResponse,dummySchema.user)
        
        let userResponse = await dummyJson.getCurrentAuthenticateUser()
        await dummyJson.verifySchema(userResponse,{username: (await loginResponse.json()).username})

    })

    test('TC002 - Logs in with invalid credential', async({dummyJson})=>{
        let loginResponse = await dummyJson.loginAndGetToken('hello','world')
        await dummyJson.verifySchema(loginResponse,{message:'Invalid credentials'})
    })
})


// A focused scope matching your README would be:

// Products: test search and pagination; assert status, response shape, and a known matching product.
// Authentication: log in with a fixed demo account, assert that a token is returned, then use it to retrieve the authenticated user.
// Negative case: try invalid credentials and assert the expected failure.