import { expect } from "@playwright/test"

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