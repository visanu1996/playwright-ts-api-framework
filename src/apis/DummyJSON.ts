import { BaseAPIs } from "../core/BaseAPIs";
import 'dotenv/config'

export class DummyJSON extends BaseAPIs {
    private token = ''

    // ---------------- Users
    async loginAndGetToken(username:string = process.env.DUMMY_USER, password:string = process.env.DUMMY_PASSWORD, expiresInMins?:number){        
        let response = await this.context.post('/user/login',{data:{username: username, password: password, expiresInMins:expiresInMins}})
        this.token = (await response.json()).accessToken
        return response
    }

    async getCurrentAuthenticateUser(){
        return await this.context.get('/user/me',{headers:{...this.headers,'Authorization':`Bearer ${this.token}`}})
    }

    async searchUsers(username: string){
        return await this.context.get(`/users/search?q=${username}`)
    }
    // async getUserCartsByUserId(userId: number){
    //     return await this.context.get(`/user/${userId}/carts`)
    // }

    // async addNewUser(){
    // Adding a new user will not add it into the server.
    // It will simulate a POST request and will return the new created user with a new id
    // }

    // async updateUser(){
    // Updating a user will not update it into the server.
    // It will simulate a PUT/PATCH request and will return updated user with modified data
    // }

    // async deleteUser(){
    // Deleting a user will not delete it into the server.
    // It will simulate a DELETE request and will return deleted user with isDeleted & deletedOn keys
    // }

    // ---------------- Products
    async getAllProducts(){
        return await this.context.get('/products?limit=0')
    }

    async getProductById(productId:number){
        return await this.context.get(`/products/${productId}`)
    }

    async searchProduct(productName:string){
        return await this.context.get(`/products/search?limit=0&q=${productName}`)
    }

    // ---------------- Carts

    async getAllCart(){
        return await this.context.get('/carts')
    }

    async getCartById(cartId : number){
        return await this.context.get(`/carts/${cartId}`)
    }

    async getCartByUser(userId : number){
        return await this.context.get(`/carts/user/${userId}`)
    }
}