import { BaseAPIs } from '../core/BaseAPIs'

export class PokeAPI extends BaseAPIs {
    async getAllBerries(){
        return await this.context.get('berry')
    }

    async getBerry(idOrName:number | string){
        return await this.context.get(`berry/${idOrName}`)
    }

    async getAllCurrencies(){
        return await this.context.get('currency')
    }

    async getCurrency(idOrName: number | string){
        return await this.context.get(`currency/${idOrName}`)
    }

    async getAllGenerations(){
        return await this.context.get(`generation`)
    }

    async getGeneration(idOrName: number | string){
        return await this.context.get(`generation/${idOrName}`)
    }

    async getAllItems(){
        return await this.context.get('item')
    }

    async getItem(idOrName: number | string){
        return await this.context.get(`item/${idOrName}`)
    }

    async getAllPokemons(){
        return await this.context.get(`pokemon`)
    }

    async getPokemon(idOrName: number | string){
        return await this.context.get(`pokemon/${idOrName}`)
    }
    
}