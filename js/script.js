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

  // =========================================================================
  // 3. CAROUSEL TILE NAVIGATION & SNAP SYNC (.carousel-tile)
  // =========================================================================
  const carousels = document.querySelectorAll('.carousel-tile');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-tile__track');
    const prevBtn = carousel.querySelector('.carousel-tile__nav-btn--prev, [data-carousel-prev]');
    const nextBtn = carousel.querySelector('.carousel-tile__nav-btn--next, [data-carousel-next]');

    if (!track) return;

    const getTiles = () => Array.from(track.querySelectorAll('.lab-tile'));
    const getTrackPadLeft = () => parseFloat(window.getComputedStyle(track).paddingLeft) || 0;

    // Sync disabled state of Left / Right buttons at start and end boundaries
    const updateNavState = () => {
      const scrollLeft = Math.round(track.scrollLeft);
      const maxScroll = Math.round(track.scrollWidth - track.clientWidth);
      const isAtStart = scrollLeft <= 2;
      const isAtEnd = maxScroll <= 2 || scrollLeft >= maxScroll - 2;

      if (prevBtn) {
        prevBtn.disabled = isAtStart;
        prevBtn.setAttribute('aria-disabled', String(isAtStart));
      }
      if (nextBtn) {
        nextBtn.disabled = isAtEnd;
        nextBtn.setAttribute('aria-disabled', String(isAtEnd));
      }
    };

    // Snap to previous lab-tile regardless of mixed tile widths
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const tiles = getTiles();
        const padLeft = getTrackPadLeft();
        const currentScroll = track.scrollLeft;
        let targetOffset = 0;

        for (let i = tiles.length - 1; i >= 0; i--) {
          const snapOffset = Math.max(0, tiles[i].offsetLeft - padLeft);
          if (snapOffset < currentScroll - 4) {
            targetOffset = snapOffset;
            break;
          }
        }

        track.scrollTo({
          left: targetOffset,
          behavior: 'smooth',
        });
      });
    }

    // Snap to next lab-tile regardless of mixed tile widths
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const tiles = getTiles();
        const padLeft = getTrackPadLeft();
        const currentScroll = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        let targetOffset = maxScroll;

        for (let i = 0; i < tiles.length; i++) {
          const snapOffset = Math.max(0, tiles[i].offsetLeft - padLeft);
          if (snapOffset > currentScroll + 4) {
            targetOffset = Math.min(snapOffset, maxScroll);
            break;
          }
        }

        track.scrollTo({
          left: targetOffset,
          behavior: 'smooth',
        });
      });
    }

    track.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState, { passive: true });

    // Initial boundary check
    updateNavState();
  });
});
