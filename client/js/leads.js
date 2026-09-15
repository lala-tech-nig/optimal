/**
 * Optimal Management Consultancy - Lead & Consultation Form Handler
 */
function initLeadForm(formId, successId, errorId) {
  const form = document.getElementById(formId);
  const successContainer = document.getElementById(successId);
  const errorContainer = document.getElementById(errorId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (errorContainer) errorContainer.style.display = 'none';

    // Collect data
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company') || '',
      industry: formData.get('industry') || '',
      inquiryType: formData.get('inquiryType') || '',
      message: formData.get('message') || ''
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Submitting...';
    }

    const apiUrl = (window.OPTIMAL_CONFIG && window.OPTIMAL_CONFIG.API_URL) ? window.OPTIMAL_CONFIG.API_URL : 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        form.reset();
        form.style.display = 'none';
        if (successContainer) {
          successContainer.style.display = 'block';
          successContainer.classList.add('animate-fadeUp');
        }
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (errorContainer) {
        errorContainer.style.display = 'block';
        errorContainer.textContent = err.message || 'Something went wrong. Please check your connection or contact us via WhatsApp.';
      }
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
