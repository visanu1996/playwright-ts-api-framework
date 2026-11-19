import { expect, test as base } from '@playwright/test';
import { PokeAPI } from '../../src/apis/PokeAPI';
import { pokeBaseUrl } from '../../config/config';
import { RestfulBooker } from '../../src/apis/RestfulBooker'
import { bookerBaseUrl } from '../../config/config';

export { expect };

export const test = base.extend<{
    pokeApi: PokeAPI;
    restfulBooker: RestfulBooker;
}>({
    pokeApi: async ({}, use) => {
        const pokeApi = new PokeAPI(pokeBaseUrl);
        await pokeApi.startSession();
        await use(pokeApi);
        await pokeApi.disposeSession();
    },
    restfulBooker: async ({}, use) => {
        const restfulBooker = new RestfulBooker(bookerBaseUrl);
        await restfulBooker.startSession();
        await use(restfulBooker);
        await restfulBooker.disposeSession();
    },
});