import { test, expect, request as playwrightRequest } from '@playwright/test';
import bookingData from '../../test-data/bookingData.json' assert { type: 'json' };
import { BookingClient } from '../../apiClients/bookingClient.js';

test.describe.serial('CRUD Booking API Tests', () => {
    let token;
    let bookingId;
    let bookingClient;
    let requestContext;

    test.beforeAll(async () => {
        try {

            requestContext = await playwrightRequest.newContext();
            bookingClient = new BookingClient(requestContext);

            const authResponse = await bookingClient.authenticate(
                bookingData.authenticateCredentials.username,
                bookingData.authenticateCredentials.password
            );
            expect(authResponse.ok()).toBeTruthy();

            const authBody = await authResponse.json();
            token = authBody.token;
            console.log("The authentication token in :", token)

        } catch (err) {
            console.error('Error in beforeAll:', err);
            throw err;
        }
    });


    test.afterAll(async () => {
        if (requestContext) {
            await requestContext.dispose();
        }
    });

    test('Create a new booking (POST) Request', async () => {

        const response = await bookingClient.createBooking(bookingData.validBooking);
        expect(response.ok()).toBeTruthy();

        const respBody = await response.json();
        console.log("Create a new booking (POST) Response ", respBody);
        expect(respBody).toHaveProperty('bookingid');
        expect(respBody.booking.firstname).toBe(bookingData.validBooking.firstname);
        expect(respBody.booking.lastname).toBe(bookingData.validBooking.lastname);

        bookingId = respBody.bookingid;
        console.log('The booking id created:', bookingId);
    });


    test('Reading a created booking (GET) request', async () => {

        const response = await bookingClient.getBookingById(bookingId);
        expect(response.ok()).toBeTruthy();

        const respBody = await response.json();
        console.log("Reading a created booking (GET) request", respBody);
        expect(respBody.firstname).toBe(bookingData.validBooking.firstname)
        expect(respBody.lastname).toBe(bookingData.validBooking.lastname)


    });

    test('Upate an existing booking (PUT) request', async () => {

        const reponse = await bookingClient.updateBooking(bookingId, token, bookingData.updateBooking);
        expect(reponse.ok()).toBeTruthy();

        const updateBody = await reponse.json();
        console.log("Upate an existing booking (PUT) response", updateBody);
        expect(updateBody.firstname).toBe(bookingData.updateBooking.firstname);
        expect(updateBody.lastname).toBe(bookingData.updateBooking.lastname);
        expect(updateBody.totalprice).toBe(bookingData.updateBooking.totalprice);
        expect(updateBody.depositpaid).toBe(bookingData.updateBooking.depositpaid);
        expect(updateBody.additionalneeds).toBe(bookingData.updateBooking.additionalneeds);


    });

    test('Delete the booking (DELETE) request', async () => {

        const response = await bookingClient.deletBooking(bookingId, token)
        expect(response.ok()).toBeTruthy();

        const confirmDeletedBooking = await bookingClient.getBookingById(bookingId);
        expect(confirmDeletedBooking.status()).toBe(404)

    });





});
