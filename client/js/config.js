/**
 * Optimal Management Consultancy - Global Configuration
 * Centralized API endpoint resolution and client settings
 */
(function () {
  'use strict';

  // Primary deployed Render backend URL
  const PRODUCTION_BACKEND_URL = 'https://optimal-fkiy.onrender.com';

  // Check if developer/admin configured an override in localStorage
  const storedApiUrl = (typeof localStorage !== 'undefined')
    ? localStorage.getItem('optimal_api_url')
    : null;

  // Check for HTML meta tag configuration: <meta name="api-base-url" content="https://...">
  let metaApiUrl = null;
  if (typeof document !== 'undefined') {
    const metaTag = document.querySelector('meta[name="api-base-url"]');
    if (metaTag && metaTag.getAttribute('content')) {
      metaApiUrl = metaTag.getAttribute('content').trim();
    }
  }

  // Determine base API URL
  function detectDefaultApiUrl() {
    // If HTML meta tag is explicitly defined
    if (metaApiUrl) {
      return metaApiUrl;
    }

    // Default primary backend URL
    return PRODUCTION_BACKEND_URL;
  }

  const rawUrl = storedApiUrl || detectDefaultApiUrl();
  const cleanUrl = rawUrl.replace(/\/+$/, '');

  window.OPTIMAL_CONFIG = {
    // Current Active Base API URL (guaranteed no trailing slash)
    API_URL: cleanUrl,

    /**
     * Build full URL for an API endpoint
     * @param {string} path - e.g. '/api/leads' or 'api/leads'
     * @returns {string} full URL
     */
    getApiUrl: function (path) {
      if (!path) return this.API_URL;
      const cleanPath = path.startsWith('/') ? path : '/' + path;
      return this.API_URL + cleanPath;
    },

    /**
     * Format media/image URL (resolves relative uploads vs external Cloudinary/CDN URLs)
     * @param {string} url - image URL
     * @returns {string} resolved URL
     */
    formatImageUrl: function (url) {
      if (!url) return 'assets/optimallogotran.png';
      if (/^(https?:|\/\/|data:|blob:|assets\/|\.\.\/assets\/)/i.test(url)) {
        return url;
      }
      // Relative path from server uploads
      const cleanPath = url.startsWith('/') ? url : '/' + url;
      return this.API_URL + cleanPath;
    },

    /**
     * Update the Base API URL (persisted in localStorage)
     * @param {string} newUrl - New base URL or empty string to reset
     */
    setApiUrl: function (newUrl) {
      if (newUrl && typeof newUrl === 'string' && newUrl.trim()) {
        const cleaned = newUrl.trim().replace(/\/+$/, '');
        localStorage.setItem('optimal_api_url', cleaned);
        this.API_URL = cleaned;
      } else {
        localStorage.removeItem('optimal_api_url');
        this.API_URL = PRODUCTION_BACKEND_URL;
      }
      return this.API_URL;
    },

    /**
     * Ping backend to check connectivity
     * @returns {Promise<{connected: boolean, data?: object, error?: string}>}
     */
    checkHealth: async function () {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(this.getApiUrl('/api/health'), {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        return { connected: true, data };
      } catch (err) {
        return { connected: false, error: err.message };
      }
    }
  };
})();
