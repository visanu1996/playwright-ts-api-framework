import { APIRequestContext, APIResponse, request, expect} from '@playwright/test';

export abstract class BaseAPIs {
    protected context!: APIRequestContext;
    protected readonly baseUrl: string;
    protected headers: Record<string, string>;

    constructor(baseUrl: string, headers: Record<string, string> = {}) {
        this.baseUrl = baseUrl;
        this.headers = {'Content-Type': 'application/json',...headers}
    }

    async startSession(){
        this.context = await request.newContext({baseURL:this.baseUrl, extraHTTPHeaders:this.headers})
    }

    async disposeSession(){
        await this.context?.dispose()
    }

    async verifySchema(response:APIResponse, schema:Record<any,any>){
        expect(await response.json()).toMatchObject(schema)
    }

}