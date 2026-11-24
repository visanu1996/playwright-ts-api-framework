import { bookerSchema } from '../config/config';
import { readYaml } from '../src/utils/readData'
import { test, expect } from './fixtures/api.fixture'


interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
        checkin: string;
        checkout: string;
    };
    additionalneeds: string;
}

interface BookingData {
    createBookings: Booking[]
}

test.describe('Restful Booker Driven Testing', () => {
    const { createBookings } = readYaml<BookingData>('restful-booker.yaml')
    
    for (const [index, data] of createBookings.entries()) {
        test(`Create booking ${index + 1}`, async ({restfulBooker}) => {
            const response = await restfulBooker.createBooking(data)
            expect(response.status()).toBe(200)
            await restfulBooker.verifySchema(response,bookerSchema)
            await restfulBooker.verifySchema(response,{booking:data,bookingid:expect.any(Number)})
        })
    }
})