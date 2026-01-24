import bookingData from '../test-data/bookingData.json' assert { type: 'json' };
export class BookingClient {

    constructor(request) {
        this.request = request;
        this.baseUrl =  bookingData.baseEndpoint.endpoint;
    }

    async authenticate(username, password) {
        return this.request.post(`${this.baseUrl}/auth`, {
            data: { username, password }
        });

    }

    async createBooking(data) {
        return this.request.post(`${this.baseUrl}/booking`, {
            data
        });

    }

    async getBookingById(id) {

        return this.request.get(`${this.baseUrl}/booking/${id}`);

    }

    async updateBooking(id, token, data) {
        return this.request.put(`${this.baseUrl}/booking/${id}`, {
            headers: {
                'Cookie': `token=${token}`
            },
            data
        });

    }

    async deletBooking(id, token) {
        return this.request.delete(`${this.baseUrl}/booking/${id}`, {
            headers: {
                'Cookie': `token=${token}`
            },
        });
    }

}