import { expect, test as base } from '@playwright/test';
import { PokeAPI } from '../../src/apis/PokeAPI';
import { RestfulBooker } from '../../src/apis/RestfulBooker'
import { DummyJSON } from '../../src/apis/DummyJSON';
import { pokeBaseUrl } from '../../config/config';
import { bookerBaseUrl } from '../../config/config';
import { dummyJsonUrl } from '../../config/config';

export { expect };

export const test = base.extend<{
    pokeApi: PokeAPI;
    restfulBooker: RestfulBooker;
    dummyJson: DummyJSON
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
    dummyJson: async({}, use)=>{
        const dummyJson = new DummyJSON(dummyJsonUrl);
        await dummyJson.startSession();
        await use(dummyJson);
        await dummyJson.disposeSession();
    }
});