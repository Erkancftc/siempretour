class ReservationService {
    constructor() {
        this.apiBaseUrl = config.API_BASE_URL;
    }

    async createReservation(bookingData) {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Rezervasyon yapmak için lütfen giriş yapınız.');
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Rezervasyon oluşturulamadı.');
            }

            return await response.json();
        } catch (error) {
            console.error('Reservation Error:', error);
            throw error;
        }
    }
}

const reservationService = new ReservationService();
