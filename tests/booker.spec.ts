import { bookerBaseUrl, bookerPayload, bookerSchema } from "../config/config";
import { RestfulBooker } from "../src/apis/RestfulBooker";
import { validateBookingResponse } from "./schemas/restfulBooker.schema";
import { expect, test } from '@playwright/test'

test.describe('RestfulBooker Testing', ()=>{
    let rb: RestfulBooker

    test.beforeEach(async()=>{
        rb = new RestfulBooker(bookerBaseUrl)
        await rb.startSession()
    })
    test.afterEach(async()=>{
        await rb.disposeSession()
    })

    test('TC001 - Get all bookings', async()=>{
        let response = await rb.getBookings()
        expect(response.status()).toEqual(200)
    })

    test('TC002 - Get booking by ID', async()=>{
        let bookingid = (await (await rb.createBooking(bookerPayload)).json()).bookingid
        let response = await rb.getBookingById(bookingid)
        await rb.verifySchema(response, bookerPayload)
    })

    test('TC003 - Create booking', async()=>{
        let response = await rb.createBooking(bookerPayload)
        await rb.verifySchema(response, bookerSchema)

    })

    test('TC004 - Update booking', async()=>{
        let data = {...bookerPayload, firstname: 'Berk', lastname: 'Rising'}
        let bookingid = (await (await rb.createBooking(bookerPayload)).json()).bookingid
        let response = await rb.updateBooking(bookingid,data)
        await rb.verifySchema(response, data)
    })

    test('TC005 - Partial update booking', async()=>{
        let bookingid = (await (await rb.createBooking(bookerPayload)).json()).bookingid
        let response = await rb.updatePartial(bookingid,{additionalneeds:'WiFi'})
        await rb.verifySchema(response, {additionalneeds:'WiFi'})
    })

    test('TC006 - Delete booking', async()=>{
        let bookingid = (await (await rb.createBooking(bookerPayload)).json()).bookingid
        let response = await rb.deleteBooking(bookingid)
        expect(await response.text()).toEqual('Created')
    })

    test('TC007 - Validate JSON response', async()=>{
        let response = await rb.createBooking(bookerPayload)
        expect(validateBookingResponse(await response.json()),JSON.stringify(validateBookingResponse.errors, null, 2)).toBe(true)
    })

})