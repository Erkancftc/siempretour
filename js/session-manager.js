document.addEventListener('DOMContentLoaded', () => {
    const user = authService.getCurrentUser();

    if (user) {
        updateNavbarForLoggedInUser(user);
    }
});

function updateNavbarForLoggedInUser(user) {
    const displayName = user.firstName || user.email;

    // Desktop: Transform the existing button into a dropdown
    const desktopLi = document.querySelector('li.trip-button');
    if (desktopLi) {
        // Add dropdown classes if not present (although we replace innerHTML, the LI container needs classes for positioning if specific CSS requires it)
        // Bootstrap 5 dropdowns usually need the container to be .dropdown
        desktopLi.classList.add('dropdown');

        desktopLi.innerHTML = `
            <a href="#" class="trip-button dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-user me-1"></i> ${displayName}
            </a>
            <ul class="dropdown-menu" aria-labelledby="userDropdown" style="min-width: 150px;">
                <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="fa fa-sign-out-alt me-2"></i> Çıkış Yap</a></li>
            </ul>
        `;

        // Attach event listener to the new Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                authService.logout(); // No confirmation needed for a direct menu action, or keep it if preferred.
                // Keeping confirmation is safer but "Logout" button implies intent. 
                // Let's remove confirm for a smoother flow as per "proper button" request, 
                // or we can keep it. The user said "proper button... consistent". 
                // Standard behavior often clears session immediately. 
            });
        }
    }

    // Mobile: Update the existing button to show name, and maybe add a logout link nearby or just keep the click-to-logout for now but cleaner
    // Since mobile menus are often tricky with dropdowns inside existing structures, let's keep it simple or try to append a logout link.
    const mobileBtnContainer = document.querySelector('.log-reg-button-mobile');
    const mobileBtn = mobileBtnContainer ? mobileBtnContainer.querySelector('a') : null;

    if (mobileBtn) {
        // Update the main button to just show profile or stay as home
        // Better: Change the button to "Logout" or specific user action
        // For consistency, let's make the mobile button show "Logout (Name)"

        mobileBtn.innerHTML = `<i class="fa fa-user me-1"></i> ${displayName}`;
        mobileBtn.href = '#';

        // Remove previous listeners if any (hard to do without reference, but we are overwriting innerHTML/element behavior usually)
        // Since we are running this on load, it's fresh.

        // We can create a separate Logout button for mobile next to it
        // Or make this button toggle logout.
        // Let's stick to the previous click-to-logout for mobile but without confirm if that's preferred, 
        // OR better: Append a small logout icon/button next to it.

        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Çıkış yapılsın mı?')) {
                authService.logout();
            }
        });
    }
}
