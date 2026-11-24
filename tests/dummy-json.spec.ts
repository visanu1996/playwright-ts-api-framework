import { dummySchema, productBrand, testID } from '../config/config';
import { expect, test } from './fixtures/api.fixture';

test.describe('DummyJSON User Testing', () => {
    test('TC001 - Logs in and retrieves the current user', async ({ dummyJson }) => {
        const loginResponse = await dummyJson.loginAndGetToken();
        expect(loginResponse.status()).toBe(200);

        await dummyJson.verifySchema(loginResponse, dummySchema.user);

        const userResponse = await dummyJson.getCurrentAuthenticateUser();
        await dummyJson.verifySchema(userResponse, { username: (await loginResponse.json()).username });
    });

    test('TC002 - Rejects invalid login credentials', async ({ dummyJson }) => {
        const response = await dummyJson.loginAndGetToken('hello', 'world');

        expect(response.status()).toBe(400);
        await dummyJson.verifySchema(response, { message: 'Invalid credentials' });
    });

    test('TC003 - Returns no results for an unknown user', async ({ dummyJson }) => {
        const response = await dummyJson.searchUsers('no-such-user-987654');

        expect(response.status()).toBe(200);
        await dummyJson.verifySchema(response, { users: [], total: 0 });
    });

    test('TC004 - Finds the configured user by username', async ({ dummyJson }) => {
        const username = process.env.DUMMY_USER;

        const response = await dummyJson.searchUsers(username);
        expect(response.status()).toBe(200);

        await dummyJson.verifySchema(response, {
            users: expect.arrayContaining([
                expect.objectContaining({ username: username.toLowerCase() }),
            ])
        });
    });
});

test.describe('DummyJSON Product Testing', () => {
    test('TC001 - Gets all products', async ({ dummyJson }) => {
        const response = await dummyJson.getAllProducts();
        expect(response.status()).toBe(200);

        await dummyJson.verifySchema(response, {
            products: expect.arrayContaining([
                expect.objectContaining(dummySchema.product),
            ])
        });

        const { products, total } = await response.json();
        expect(total).toBeGreaterThanOrEqual(products.length);
    });

    test('TC002 - Gets a product by ID', async ({ dummyJson }) => {
        const response = await dummyJson.getProductById(1);

        expect(response.status()).toBe(200);
        await dummyJson.verifySchema(response, dummySchema.product);
    });

    test('TC003 - Returns no results for an unknown product search', async ({ dummyJson }) => {
        const response = await dummyJson.searchProduct('no-such-product-987654');

        expect(response.status()).toBe(200);
        await dummyJson.verifySchema(response, { products: [], total: 0 });
    });

    test('TC004 - Finds products by brand', async ({ dummyJson }) => {
        const response = await dummyJson.searchProduct(productBrand);
        expect(response.status()).toBe(200);

        await dummyJson.verifySchema(response, {
            products: expect.arrayContaining([
                expect.objectContaining({ brand: productBrand }),
            ])
        });
    });

    test('TC005 - Returns not found for an unknown product ID', async ({ dummyJson }) => {
        const response = await dummyJson.getProductById(testID);

        expect(response.status()).toBe(404);
    });
});

test.describe('DummyJSON Cart Testing', () => {
    test('TC001 - Get all carts', async({dummyJson}) => {
        let response = await dummyJson.getAllCart()
        expect(response.status()).toBe(200)
        await dummyJson.verifySchema(response,{carts: expect.arrayContaining([dummySchema.cart])})
    })

    test('TC002 - Get single cart', async({dummyJson}) => {
        let response = await dummyJson.getCartById(1)
        expect(response.status()).toBe(200)
        await dummyJson.verifySchema(response,dummySchema.cart)
    })

    test('TC003 - Get cart by user', async({dummyJson}) => {
        let response = await dummyJson.getCartByUser(10)
        expect(response.status()).toBe(200)
        await dummyJson.verifySchema(response,{carts: expect.arrayContaining([dummySchema.cart])})
    })

    test('TC004 - Get cart by unknown user', async({dummyJson}) => {
        let response = await dummyJson.getCartByUser(testID)
        expect(response.status()).toBe(404)
        await dummyJson.verifySchema(response,{"message": `User with id '${testID}' not found`})    
    })

    test('TC005 - Get single cart by unknown id', async({dummyJson}) => {
        let response = await dummyJson.getCartById(testID)
        expect(response.status()).toBe(404)
        await dummyJson.verifySchema(response,{"message": `Cart with id '${testID}' not found`})       
    })

});