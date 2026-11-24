import { expect } from "@playwright/test"


// -------------------- Booker
export const bookerBaseUrl = 'https://restful-booker.herokuapp.com/'

export const bookerPayload = {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}

export const bookerSchema = {
    "bookingid": expect.any(Number),
    "booking":{
        "firstname" : expect.any(String),
        "lastname" : expect.any(String),
        "totalprice" : expect.any(Number),
        "depositpaid" : expect.any(Boolean),
        "bookingdates" : {
            "checkin" : expect.any(String),
            "checkout" : expect.any(String)
        },
        "additionalneeds" : expect.any(String)
    }
    
}

// -------------------- PokeAPI
export const pokeBaseUrl = 'https://pokeapi.co/api/v2/'
export const pokeSchema = {
    berries: {
                count: expect.any(Number),
                results: expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        url: expect.any(String),
                    }),
                ]),
            },
    pokemon: {

    }
}
export const pokePayload = {cheri : { id: 1, name: 'cheri' }, bulbasaur: {id: 1, name: 'bulbasaur'}}

// ------------------- DummyJson
export const dummyJsonUrl = 'https://dummyjson.com/'
export const productBrand = 'Essence'
export const testID = 999999999
export const dummySchema = {
    user : {
        "id": expect.any(Number),
        "username": expect.any(String),
        "email": expect.any(String),
        "firstName": expect.any(String),
        "lastName": expect.any(String),
        "gender": expect.any(String),
        "image": expect.any(String),
        "accessToken": expect.any(String),
        "refreshToken": expect.any(String),
        
    },
    product : {
      "id": expect.any(Number),
      "title": expect.any(String),
      "description": expect.any(String),
      "category": expect.any(String),
      "price": expect.any(Number),
      "discountPercentage": expect.any(Number),
      "rating": expect.any(Number),
      "stock": expect.any(Number),
      "tags": expect.any(Array),
      "brand": expect.any(String),
      "sku": expect.any(String),
      "availabilityStatus": expect.any(String),
    },
    cart : {
        id: expect.any(Number),
        products: expect.arrayContaining([
            expect.objectContaining({
                id:expect.any(Number),
                title: expect.any(String),
                price: expect.any(Number),
                quantity: expect.any(Number),
                total: expect.any(Number),
            })
        ]),
        total: expect.any(Number),
        discountedTotal:expect.any(Number),
        userId: expect.any(Number),
        totalProducts: expect.any(Number),
        totalQuantity: expect.any(Number)
    }
}