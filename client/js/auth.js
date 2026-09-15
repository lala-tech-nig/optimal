/**
 * Optimal Management Consultancy - Authentication Handler
 */
function checkAuth(redirectIfLoggedIn = false) {
  const token = localStorage.getItem('optimal_token');
  const currentPage = window.location.pathname.split('/').pop();

  if (redirectIfLoggedIn && token) {
    window.location.href = 'admin.html';
    return;
  }

  if (!redirectIfLoggedIn && !token && currentPage === 'admin.html') {
    window.location.href = 'login.html';
    return;
  }
}

function handleLogin() {
  const form = document.getElementById('login-form');
  const errorBox = document.getElementById('login-error');
  const submitBtn = document.getElementById('admin-login-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorBox) errorBox.style.display = 'none';

    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ Signing in...';
    }

    const apiUrl = (window.OPTIMAL_CONFIG && window.OPTIMAL_CONFIG.API_URL) ? window.OPTIMAL_CONFIG.API_URL : 'http://localhost:5000';

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('optimal_token', data.token);
        localStorage.setItem('optimal_admin', JSON.stringify(data.admin));
        window.location.href = 'admin.html';
      } else {
        if (errorBox) {
          errorBox.style.display = 'block';
          errorBox.textContent = data.message || 'Invalid credentials';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '🔐 Sign In to Dashboard';
        }
      }
    } catch (err) {
      if (errorBox) {
        errorBox.style.display = 'block';
        errorBox.textContent = 'Connection error. Please ensure the backend server is running.';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '🔐 Sign In to Dashboard';
      }
    }
  });
}

function handleLogout() {
  localStorage.removeItem('optimal_token');
  localStorage.removeItem('optimal_admin');
  window.location.href = 'login.html';
}
