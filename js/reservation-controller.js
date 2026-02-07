document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservation-form');
    const alertBox = document.getElementById('reservation-alert');

    // 1. URL'den slug'ı al
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (slug) {
        document.getElementById('tour-slug').value = slug;
    } else {
        showAlert('Hata: Tur bilgisi bulunamadı. Lütfen tur sayfasından tekrar deneyin.', 'danger');
        // Disable form maybe?
    }

    // 2. Eğer kullanıcı giriş yapmışsa bilgilerini doldur (Session Manager zaten yüklenmiş olmalı)
    const user = authService.getCurrentUser();
    if (user) {
        if (document.getElementById('user-name')) document.getElementById('user-name').value = user.name || '';
        if (document.getElementById('user-email')) document.getElementById('user-email').value = user.sub || ''; // 'sub' usually holds email in JWT
    } else {
        showAlert('Rezervasyon yapmak için lütfen önce <a href="login.html">giriş yapınız</a>.', 'warning');
    }

    // 3. Form gönderimi
    if (reservationForm) {
        reservationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!authService.isAuthenticated()) {
                window.location.href = 'login.html';
                return;
            }

            const bookingData = {
                tourSlug: document.getElementById('tour-slug').value,
                userName: document.getElementById('user-name').value,
                userPhone: document.getElementById('user-phone').value,
                userEmail: document.getElementById('user-email').value,
                numberOfPeople: parseInt(document.getElementById('num-people').value),
                userMessage: document.getElementById('user-message').value
            };

            try {
                const button = reservationForm.querySelector('button[type="submit"]');
                const originalText = button.innerText;
                button.disabled = true;
                button.innerText = 'İşleniyor...';

                await reservationService.createReservation(bookingData);

                showAlert('Rezervasyon talebiniz başarıyla alındı! Yönlendiriliyorsunuz...', 'success');

                setTimeout(() => {
                    window.location.href = 'index.html'; // veya kullanıcı profili/rezervasyonlarım sayfasına
                }, 2000);

            } catch (error) {
                showAlert('Hata: ' + error.message, 'danger');
                const button = reservationForm.querySelector('button[type="submit"]');
                button.disabled = false;
                button.innerText = 'Rezervasyon Oluştur';
            }
        });
    }

    function showAlert(message, type) {
        alertBox.innerHTML = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.classList.remove('d-none');
    }
});
