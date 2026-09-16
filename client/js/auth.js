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
    if (errorBox) {
      errorBox.style.display = 'none';
      errorBox.innerHTML = '';
    }

    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ Signing in...';
    }

    const apiUrl = (window.OPTIMAL_CONFIG && typeof window.OPTIMAL_CONFIG.getApiUrl === 'function')
      ? window.OPTIMAL_CONFIG.getApiUrl('/api/auth/login')
      : 'https://optimal-fkiy.onrender.com/api/auth/login';

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('optimal_token', data.token);
        localStorage.setItem('optimal_admin', JSON.stringify(data.admin));
        window.location.href = 'admin.html';
      } else {
        if (errorBox) {
          errorBox.style.display = 'block';
          errorBox.textContent = data.message || 'Invalid email or password.';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '🔐 Sign In to Dashboard';
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      const targetBase = (window.OPTIMAL_CONFIG && window.OPTIMAL_CONFIG.API_URL) || 'https://optimal-fkiy.onrender.com';
      if (errorBox) {
        errorBox.style.display = 'block';
        errorBox.innerHTML = `
          <strong>Connection error:</strong> Unable to reach backend at <code>${targetBase}</code>.<br/>
          Please check your network connection or verify that the server is online.
        `;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '🔐 Sign In to Dashboard';
      }
    }
  });
}

async function handleLogout() {
  const apiUrl = (window.OPTIMAL_CONFIG && typeof window.OPTIMAL_CONFIG.getApiUrl === 'function')
    ? window.OPTIMAL_CONFIG.getApiUrl('/api/auth/logout')
    : 'https://optimal-fkiy.onrender.com/api/auth/logout';

  try {
    await fetch(apiUrl, { method: 'POST', credentials: 'include' });
  } catch (e) {
    // Ignore network error on logout
  }

  localStorage.removeItem('optimal_token');
  localStorage.removeItem('optimal_admin');
  window.location.href = 'login.html';
}
