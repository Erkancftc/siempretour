function generateBookingUrl() {
    const params = new URLSearchParams(window.location.search);
    const tourId = params.get("id");
    const country = params.get("country");

    if (!tourId || !country) return "#";

    return `booking.html?id=${encodeURIComponent(tourId)}&country=${encodeURIComponent(country)}`;
}

document.addEventListener("DOMContentLoaded", function () {

    const bookingBtn = document.getElementById("bookingBtn");
    if (!bookingBtn) return;

    bookingBtn.href = generateBookingUrl();

});
