/**
 * Optimal Management Consultancy - Lead & Consultation Form Handler
 * Robust client-side validation, service pre-selection, and graceful fallbacks
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function initLeadForm(formId, successId, errorId) {
  const form = document.getElementById(formId);
  const successContainer = document.getElementById(successId);
  const errorContainer = document.getElementById(errorId);
  if (!form) return;

  // Pre-fill service from URL parameter (e.g., contact.html?service=ISO%209001 or ?inquiry=Internal%20Audit)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service') || urlParams.get('inquiry') || urlParams.get('program');
    if (serviceParam) {
      const select = form.querySelector('select[name="inquiryType"]');
      if (select) {
        const matchingOption = Array.from(select.options).find(opt =>
          opt.value.toLowerCase().includes(serviceParam.toLowerCase()) ||
          opt.text.toLowerCase().includes(serviceParam.toLowerCase())
        );
        if (matchingOption) {
          select.value = matchingOption.value;
        }
      }
    }
  } catch (e) {
    console.debug('URL parameter parsing skipped:', e);
  }

  // Ensure success container has a "Submit Another Inquiry" reset button
  if (successContainer && !successContainer.querySelector('.btn-reset-form')) {
    const resetWrap = document.createElement('div');
    resetWrap.style.marginTop = '1.5rem';
    resetWrap.innerHTML = `
      <button type="button" class="btn-reset-form btn-outline-gold" style="padding: 0.6rem 1.4rem; font-size: 0.85rem; border-radius: 9999px; cursor: pointer;">
        ↻ Submit Another Request
      </button>
    `;
    successContainer.appendChild(resetWrap);

    const resetBtn = resetWrap.querySelector('.btn-reset-form');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'flex';
        successContainer.style.display = 'none';
        if (errorContainer) errorContainer.style.display = 'none';
      });
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (errorContainer) {
      errorContainer.style.display = 'none';
      errorContainer.innerHTML = '';
    }

    // Collect data
    const formData = new FormData(form);
    const name = (formData.get('name') || '').trim();
    const email = (formData.get('email') || '').trim();
    const phone = (formData.get('phone') || '').trim();
    const company = (formData.get('company') || '').trim();
    const industry = (formData.get('industry') || '').trim();
    const inquiryType = (formData.get('inquiryType') || '').trim();
    const message = (formData.get('message') || '').trim();

    // Client-side validations
    if (!name) {
      showError('Please enter your full name.');
      return;
    }
    if (!phone || phone.length < 7) {
      showError('Please enter a valid phone number (e.g. +234 800 000 0000).');
      return;
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    function showError(msg) {
      if (errorContainer) {
        errorContainer.style.display = 'block';
        errorContainer.style.background = 'rgba(255, 107, 107, 0.12)';
        errorContainer.style.border = '1px solid rgba(255, 107, 107, 0.35)';
        errorContainer.style.borderRadius = '8px';
        errorContainer.style.padding = '0.85rem 1rem';
        errorContainer.style.color = '#ff6b6b';
        errorContainer.innerHTML = `
          <div style="font-weight: 600; margin-bottom: 0.35rem;">⚠️ ${msg}</div>
          <div style="font-size: 0.8rem; color: rgba(255,255,255,0.75);">
            Need immediate help? Reach us on
            <a href="https://wa.me/2348037316413" target="_blank" style="color: var(--gold-light); font-weight: 700; text-decoration: underline;">WhatsApp</a>
            or call <a href="tel:+2348037316413" style="color: var(--gold-light); font-weight: 700; text-decoration: underline;">+234 803 731 6413</a>.
          </div>
        `;
      }
    }

    const payload = {
      name,
      email,
      phone,
      company,
      industry,
      inquiryType: inquiryType || 'General Consultation',
      message
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Submitting Your Request...';
    }

    const apiUrl = (window.OPTIMAL_CONFIG && typeof window.OPTIMAL_CONFIG.getApiUrl === 'function')
      ? window.OPTIMAL_CONFIG.getApiUrl('/api/leads')
      : 'https://optimal-fkiy.onrender.com/api/leads';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        form.reset();
        form.style.display = 'none';
        if (successContainer) {
          successContainer.style.display = 'block';
          successContainer.classList.add('animate-fadeUp');
        }
      } else {
        throw new Error(data.message || 'Failed to submit form. Please check details and retry.');
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      showError(err.message || 'Could not connect to server. Please check your internet or reach us via WhatsApp.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLeadForm('home-lead-form', 'home-form-success', 'home-form-error');
  initLeadForm('contact-page-form', 'contact-form-success', 'contact-form-error');
});
