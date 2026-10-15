/**
 * Divakar TMD Portfolio — Shared Script
 * Vanilla JS interactions
 */

// Unlock CSS :active pseudo-class on iOS Safari
document.addEventListener('touchstart', () => {}, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. HERO LOTTIE ANIMATION SEQUENCE (index.html)
  // =========================================================================
  const heroLottie1 = document.getElementById('hero-lottie-1');
  const heroLottie2 = document.getElementById('hero-lottie-2');

  if (heroLottie1 && heroLottie2) {
    heroLottie1.addEventListener('complete', () => {
      heroLottie1.style.display = 'none';
      heroLottie2.style.display = 'block';
      heroLottie2.play();
    });
  }

  // =========================================================================
  // 2. COPY EMAIL INTERACTION (Get in Touch Section)
  // =========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    let copyTimeout;
    copyEmailBtn.addEventListener('click', () => {
      const email = 'divakarthangaraj@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const textSpan = document.getElementById('copy-email-text');
        const iconUse = document.querySelector('#copy-email-icon use');

        if (textSpan && iconUse) {
          // Switch to copied state and hold inverted appearance
          textSpan.textContent = 'Copied!';
          iconUse.setAttribute('href', '#icon-cus003');
          copyEmailBtn.classList.add('btn--copied');

          // Clear any pending revert timer
          clearTimeout(copyTimeout);

          // Revert after 2 seconds
          copyTimeout = setTimeout(() => {
            textSpan.textContent = 'Copy Email';
            iconUse.setAttribute('href', '#icon-cus002');
            copyEmailBtn.classList.remove('btn--copied');
          }, 2000);
        }
      });
    });
  }
});
