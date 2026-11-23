import { bookerPayload, bookerSchema } from "../config/config";
import { validateBookingResponse } from "./schemas/restfulBooker.schema";
import { test, expect } from './fixtures/api.fixture'

test.describe('RestfulBooker Testing', ()=>{

    test('TC001 - Get all bookings', async({restfulBooker})=>{
        const response = await restfulBooker.getBookings()
        expect(response.status()).toEqual(200)
        await restfulBooker.verifySchema(response,
            expect.arrayContaining([
                {bookingid:expect.any(Number)}
            ])
        )
    })

    test('TC002 - Get booking by ID', async({restfulBooker})=>{
        const bookingid = (await (await restfulBooker.createBooking(bookerPayload)).json()).bookingid
        const response = await restfulBooker.getBookingById(bookingid)
        await restfulBooker.verifySchema(response, bookerPayload)
    })

    test('TC003 - Create booking', async({restfulBooker})=>{
        const response = await restfulBooker.createBooking(bookerPayload)
        await restfulBooker.verifySchema(response, bookerSchema)

    })

    test('TC004 - Update booking', async({restfulBooker})=>{
        const data = {...bookerPayload, firstname: 'Berk', lastname: 'Rising'}
        const bookingid = (await (await restfulBooker.createBooking(bookerPayload)).json()).bookingid
        const response = await restfulBooker.updateBooking(bookingid,data)
        await restfulBooker.verifySchema(response, data)
    })

    test('TC005 - Partial update booking', async({restfulBooker})=>{
        const bookingid = (await (await restfulBooker.createBooking(bookerPayload)).json()).bookingid
        const response = await restfulBooker.updatePartial(bookingid,{additionalneeds:'WiFi'})
        await restfulBooker.verifySchema(response, {additionalneeds:'WiFi'})
    })

    test('TC006 - Delete booking', async({restfulBooker})=>{
        const bookingid = (await (await restfulBooker.createBooking(bookerPayload)).json()).bookingid
        const response = await restfulBooker.deleteBooking(bookingid)
        expect(await response.text()).toEqual('Created')
    })

    test('TC007 - Validate JSON response', async({restfulBooker})=>{
        const response = await restfulBooker.createBooking(bookerPayload)
        expect(validateBookingResponse(await response.json()),JSON.stringify(validateBookingResponse.errors, null, 2)).toBe(true)
    })

})