import { test, expect } from '@playwright/test';
import bookingData from '../../test-data/bookingData.json' assert {type: 'json'};
import { BookingClient } from '../../apiClients/bookingClient.js';



test.describe('CRUD Booking API Tests', () => {
    let token;
    let bookingId;
    test('Create a new booking (POST) Request', async ({ request }) => {
       const  bookingClient = new BookingClient(request);
        const authResponse = await bookingClient.authenticate(
            bookingData.authenticateCredentials.username,
             bookingData.authenticateCredentials.password
            );
        expect(authResponse.ok()).toBeTruthy();
        const authBody = await authResponse.json();
        token = authBody.token;
        const response = await bookingClient.createBooking(bookingData.validBooking);
        expect(response.ok()).toBeTruthy();
        console.log("The token",token);

        const respBody = await response.json();
        console.log("reponse from booking",respBody);
        expect(respBody).toHaveProperty('bookingid');
        expect(respBody.booking.firstname).toBe(bookingData.validBooking.firstname);
        expect(respBody.booking.lastname).toBe(bookingData.validBooking.lastname);

         bookingId = respBody.bookingid;
        console.log("The booking id",bookingId);
    });






















});