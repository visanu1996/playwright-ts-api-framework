import { bookerPayload } from '../../config/config'
import 'dotenv/config'
import { BaseAPIs } from '../core/BaseAPIs'

export class RestfulBooker extends BaseAPIs {
    private token = ''

    async getToken(){
        this.token = (
            await (
                await this.context.post('/auth',{data:{username: process.env.BOOKER_USER, password: process.env.BOOKER_PASSWORD}})
            ).json()
        ).token
    }

    async getBookings(){
       return await this.context.get('/booking')
    }

    async getBookingById(id: number){
        return await this.context.get(`/booking/${id}`)
    }

    async createBooking(data: typeof bookerPayload){
        return await this.context.post('/booking',{data:data})
    }

    async updateBooking(id:number, data: typeof bookerPayload){
        return await this.context.put(`/booking/${id}`,{data:data, headers: await this.headersWithToken()})
    }

    async updatePartial(id:number, data: Partial<typeof bookerPayload>){
        return await this.context.patch(`/booking/${id}`,{data:data, headers: await this.headersWithToken()})
    }

    async deleteBooking(id:number){
        return await this.context.delete(`/booking/${id}`,{headers: await this.headersWithToken()})
    }

    private async headersWithToken(){
        if(!this.token) await this.getToken()
        return this.getHeaders({'Cookie':`token=${this.token}`})
    }
}