import { pokeSchema, pokePayload } from '../config/config';
import { expect, test } from './fixtures/api.fixture';

test.describe('PokeAPI - Berries', () => {
    test('lists berries with a valid paginated response', async ({ pokeApi }) => {
        const response = await pokeApi.getAllBerries();
        expect(response.status()).toBe(200);

        await pokeApi.verifySchema(response, pokeSchema.berries);
    });

    test('looks up the same berry by ID and name', async ({ pokeApi }) => {
        const [byId, byName] = await Promise.all([
            pokeApi.getBerry(1),
            pokeApi.getBerry('cheri'),
        ]);

        expect(byId.status()).toBe(200);
        expect(byName.status()).toBe(200);
        await pokeApi.verifySchema(byId, pokePayload.cheri);
        await pokeApi.verifySchema(byName, pokePayload.cheri);
    });

    test('returns not found for an unknown berry name', async ({ pokeApi }) => {
        const response = await pokeApi.getBerry('not-a-real-berry-999999');
        expect(response.status()).toBe(404);
    });
    
});

test.describe('PokeAPI - Pokemon', () => {
    test('looks up Bulbasaur by ID and name', async ({ pokeApi }) => {
        const [byId, byName] = await Promise.all([
            pokeApi.getPokemon(1),
            pokeApi.getPokemon('bulbasaur'),
        ]);

        expect(byId.status()).toBe(200);
        expect(byName.status()).toBe(200);

        await pokeApi.verifySchema(byId, pokePayload.bulbasaur);
        await pokeApi.verifySchema(byName, pokePayload.bulbasaur);
    });
});
