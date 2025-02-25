function updateNavigation() {
    const nav = document.querySelector('nav');
    const token = localStorage.getItem('token');

    if (token) {
        // Remove login/register links
        document.querySelectorAll('a[href="login.html"], a[href="register.html"]')
            .forEach(link => link.remove());

        // Add logout link
        if (!document.getElementById('logoutLink')) {
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.id = 'logoutLink';
            logoutLink.textContent = 'Logout';
            logoutLink.onclick = () => {
                localStorage.removeItem('token');
                window.location.href = 'login.html'; // Redirect after logout
            };
            nav.appendChild(logoutLink);
        }
    } else {
        // Remove protected links if not logged in
        document.querySelectorAll('a[href="profile.html"], a[href="projects.html"], a[href="donate.html"], a[href="admin.html"]')
            .forEach(link => link.remove());
    }
}

document.addEventListener('DOMContentLoaded', updateNavigation);
