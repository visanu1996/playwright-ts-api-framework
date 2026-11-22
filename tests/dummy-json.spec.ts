import { dummySchema } from '../config/config'
import { test, expect } from './fixtures/api.fixture'

test.describe('DummyJSON Testing', () => {
    test('TC001 - Logs in and retrieves the current user', async ({ dummyJson }) => {
        let loginResponse = await dummyJson.loginAndGetToken();
        await dummyJson.verifySchema(loginResponse, dummySchema.user);

        let loginUser = await loginResponse.json();
        let userResponse = await dummyJson.getCurrentAuthenticateUser();
        await dummyJson.verifySchema(userResponse, { username: loginUser.username });
    });

    test('TC002 - Logs in with invalid credentials', async ({ dummyJson }) => {
        let loginResponse = await dummyJson.loginAndGetToken('hello', 'world');
        expect(loginResponse.status()).toBe(400);
        await dummyJson.verifySchema(loginResponse, { message: 'Invalid credentials' });
    });

    test('TC003 - Returns no results for an unknown user', async ({ dummyJson }) => {
        let response = await dummyJson.searchUsers('no-such-user-987654');
        expect(response.status()).toBe(200);
        await dummyJson.verifySchema(response, { users: [], total: 0 });
    });

    test('TC004 - Finds the configured user by username', async ({ dummyJson }) => {
        const username = process.env.DUMMY_USER;
        if (!username) throw new Error('DUMMY_USER must be configured');

        let response = await dummyJson.searchUsers(username);
        expect(response.status()).toBe(200);
        
        const { users, total } = await response.json();
        expect(total).toBeGreaterThan(0);
        expect(users).toEqual(expect.arrayContaining([
            expect.objectContaining({username: username.toLowerCase()})
        ]))
    });
    
});