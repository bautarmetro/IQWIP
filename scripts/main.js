/**
 * Category icon loader with multi-step fallback chain
 * Ensures SVG icons render properly across diverse deployment and asset folder structures.
 * 
 * @param {HTMLImageElement} img - The target image element encountering an error
 * @param {string} catKey - The category identifier key (e.g., 'rice', 'corn-meal')
 */
function handleCategoryIconError(img, catKey) {
  if (!img) return;

  const step = parseInt(img.dataset.step || '0', 10);
  img.dataset.step = step + 1;

  const altPaths = {
    'rice': [
      'images/category-icons/island-queen-rice-icon.svg',
      'category-icons/island-queen-rice-icon.svg',
      'island-queen-rice-icon.svg',
      'VISUAL ASSETS/Assets/category-icons/rice.svg'
    ],
    'brown-sugar': [
      'images/category-icons/brown-sugar-category-title.svg',
      'category-icons/brown-sugar-category-title.svg',
      'brown-sugar-category-title.svg',
      'VISUAL ASSETS/Assets/category-icons/brown-sugar.svg'
    ],
    'corn-meal': [
      'images/category-icons/island-queen-corn-icon.svg',
      'category-icons/island-queen-corn-icon.svg',
      'island-queen-corn-icon.svg',
      'VISUAL ASSETS/Assets/category-icons/corn-meal.svg'
    ],
    'grains': [
      'images/category-icons/island-queen-grains-icon.svg',
      'category-icons/island-queen-grains-icon.svg',
      'island-queen-grains-icon.svg',
      'VISUAL ASSETS/Assets/category-icons/grains.svg'
    ]
  };

  const candidates = altPaths[catKey] || [];
  if (step < candidates.length) {
    img.src = candidates[step];
  }
}

/**
 * Contact form submission handler
 * Displays a friendly success alert banner and resets the form inputs.
 * 
 * @param {Event} e - Form submission event
 */
function handleContactSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('contact-success');
  if (success) {
    success.classList.remove('hidden');
  }
  if (e.target && typeof e.target.reset === 'function') {
    e.target.reset();
  }
}

// Mobile Menu DOM elements and state management
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');

/**
 * Closes the mobile navigation dropdown menu
 */
function closeMobileMenu() {
  if (!mobileMenu || !mobileMenuToggle || !mobileMenuIcon) return;
  mobileMenu.classList.add('hidden');
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
  mobileMenuIcon.classList.remove('fa-xmark');
  mobileMenuIcon.classList.add('fa-bars');
}

/**
 * Opens the mobile navigation dropdown menu
 */
function openMobileMenu() {
  if (!mobileMenu || !mobileMenuToggle || !mobileMenuIcon) return;
  mobileMenu.classList.remove('hidden');
  mobileMenuToggle.setAttribute('aria-expanded', 'true');
  mobileMenuIcon.classList.remove('fa-bars');
  mobileMenuIcon.classList.add('fa-xmark');
}

// Attach event listeners for mobile menu button, clicks outside, and mobile links
if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close the mobile menu when clicking anywhere outside of the navbar
  document.addEventListener('click', (e) => {
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Auto-dismiss the menu when tapping any mobile navigation link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

/**
 * Smooth scroll handler ensuring flush alignment with the dynamic sticky navbar
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;

    if (targetId === '#hero') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    // Navbar height compensation: 61px mobile (<640px), 65px tablet (<1024px), 73px desktop (>=1024px)
    const navHeight = window.innerWidth >= 1024 ? 73 : (window.innerWidth >= 640 ? 65 : 61);
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

    window.scrollTo({
      top: Math.max(0, Math.round(targetTop)),
      behavior: 'smooth'
    });
  });
});

/**
 * Window scroll listener for dynamic navbar state transition
 * Switches between transparent floating header and frosted cream sticky header.
 */
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLogo = document.getElementById('nav-logo');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navbar || !navLogo) return;

  if (window.scrollY > 40) {
    // Scrolled state: frosted cream backdrop, subtle border, compact padding & logo
    navbar.classList.add('bg-[#FAF7F2]/90', 'backdrop-blur-md', 'border-[#E2D9CC]/60', 'shadow-sm', 'py-2');
    navbar.classList.remove('bg-transparent', 'border-transparent', 'py-3', 'sm:py-4');

    navLogo.classList.add('h-11', 'sm:h-12', 'lg:h-14');
    navLogo.classList.remove('h-16', 'sm:h-20', 'lg:h-24');

    // Scrolled link colors: transition to dark neutral text
    navLinks.forEach(link => {
      link.classList.add('text-neutral-900');
      link.classList.remove('text-white', 'drop-shadow-sm');
    });
  } else {
    // Top resting state: transparent overlay floating above hero banner
    navbar.classList.add('bg-transparent', 'border-transparent', 'py-3', 'sm:py-4');
    navbar.classList.remove('bg-[#FAF7F2]/90', 'backdrop-blur-md', 'border-[#E2D9CC]/60', 'shadow-sm', 'py-2');

    navLogo.classList.add('h-16', 'sm:h-20', 'lg:h-24');
    navLogo.classList.remove('h-11', 'sm:h-12', 'lg:h-14');

    // Resting link colors: transition back to white text
    navLinks.forEach(link => {
      link.classList.add('text-white', 'drop-shadow-sm');
      link.classList.remove('text-neutral-900');
    });
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// Initial check on page load in case page is refreshed while scrolled
document.addEventListener('DOMContentLoaded', () => {
  handleNavbarScroll();
});