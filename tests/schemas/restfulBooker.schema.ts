import Ajv, { type JSONSchemaType } from 'ajv'
import { bookerPayload } from '../../config/config'
type CreateBookingResponse = {
    bookingid: number,
    booking: typeof bookerPayload
}

export const bookingResponseSchema: JSONSchemaType<CreateBookingResponse> = {
    type: 'object',
    properties: {
        bookingid: { type: 'integer' },
        booking: {
            type: 'object',
            properties: {
                firstname: { type : 'string' },
                lastname: { type : 'string' },
                totalprice: { type : 'number'},
                depositpaid: { type : 'boolean' },
                bookingdates: {
                    type: 'object',
                    properties: {
                        checkin : { type: 'string' },
                        checkout: { type: 'string' }
                    },
                    required: ['checkin', 'checkout'],
                    additionalProperties: false,
                },
                additionalneeds: { type: 'string'}
            },
            required: [
                'firstname',
                'lastname',
                'totalprice',
                'depositpaid',
                'bookingdates',
                'additionalneeds',
            ],
            additionalProperties: false,
        },
    },
    required: ['bookingid', 'booking'],
    additionalProperties: false,
}

export const validateBookingResponse = new Ajv().compile(bookingResponseSchema);