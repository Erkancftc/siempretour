document.addEventListener('DOMContentLoaded', () => {
    // Login Form Handler
    const loginForm = document.getElementById('contactform3');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit1');
            const originalBtnText = submitBtn.value;
            submitBtn.value = 'Giriş yapılıyor...';
            submitBtn.disabled = true;

            const email = document.getElementById('fullname').value; // In HTML id is fullname but placeholder says email/username
            const password = document.getElementById('password').value;

            try {
                await authService.login({ email, password });
                // Redirect immediately without alert
                window.location.href = 'index.html';
            } catch (error) {
                alert('Giriş başarısız: ' + error.message);
                submitBtn.value = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Register Form Handler
    const registerForm = document.getElementById('contactform2');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit3');
            const originalBtnText = submitBtn.value;
            submitBtn.value = 'Kaydediliyor...';
            submitBtn.disabled = true;

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email1').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const password = document.getElementById('password1').value;
            const confirmPassword = document.getElementById('repassword').value;
            // Also checking if terms are accepted.
            const terms = document.getElementById('exampleCheck');

            if (!terms.checked) {
                alert('Lütfen şartlar ve gizlilik politikasını kabul edin.');
                submitBtn.value = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            if (password !== confirmPassword) {
                alert('Şifreler eşleşmiyor!');
                submitBtn.value = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            // Basic phone length check (backend requires 10-11 digits)
            if (!/^\d{10,11}$/.test(phoneNumber)) {
                alert('Telefon numarası 10 veya 11 haneli olmalıdır.');
                submitBtn.value = originalBtnText;
                submitBtn.disabled = false;
                return;
            }


            const registerData = {
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            };

            try {
                await authService.register(registerData);
                alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
                // Switch to login tab or redirect
                // For now, reload or redirect to login.html to clear form and ensuring fresh state
                window.location.href = 'login.html';
            } catch (error) {
                alert('Kayıt başarısız: ' + error.message);
                submitBtn.value = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
