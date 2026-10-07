// Category icon loader with fallback chain
function handleCategoryIconError(img, catKey) {
  const step = parseInt(img.dataset.step || '0', 10);
  img.dataset.step = step + 1;

  const altPaths = {
    'rice': [
      'category-icons/island-queen-rice-icon.svg',
      'island-queen-rice-icon.svg',
      'VISUAL ASSETS/Assets/category-icons/rice.svg'
    ],
    'brown-sugar': [
      'category-icons/brown-sugar-category-title.svg',
      'brown-sugar-category-title.svg',
      'VISUAL ASSETS/Assets/category-icons/brown-sugar.svg'
    ],
    'corn-meal': [
      'category-icons/island-queen-corn-icon.svg',
      'island-queen-corn-icon.svg',
      'VISUAL ASSETS/Assets/category-icons/corn-meal.svg'
    ],
    'grains': [
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

// Contact form submission handler
function handleContactSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('contact-success');
  if (success) {
    success.classList.remove('hidden');
  }
  e.target.reset();
}

// Smooth scroll handler ensuring flush alignment with the navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '#hero') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    // Compact navbar height: 61px mobile, 65px tablet, 73px desktop
    const navHeight = window.innerWidth >= 1024 ? 73 : (window.innerWidth >= 640 ? 65 : 61);
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

    window.scrollTo({
      top: Math.round(targetTop),
      behavior: 'smooth'
    });
  });
});

// Scroll listener for dynamic navbar transition
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const navLogo = document.getElementById('nav-logo');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navbar || !navLogo) return;

  if (window.scrollY > 40) {
    // Scrolled state: frosted cream background, subtle border, compact padding & logo
    navbar.classList.add('bg-[#FAF7F2]/90', 'backdrop-blur-md', 'border-[#E2D9CC]/60', 'shadow-sm', 'py-2');
    navbar.classList.remove('bg-transparent', 'border-transparent', 'py-3', 'sm:py-4');

    navLogo.classList.add('h-11', 'sm:h-12', 'lg:h-14');
    navLogo.classList.remove('h-16', 'sm:h-20', 'lg:h-24');

    // Scrolled link colors: transition to black / dark neutral
    navLinks.forEach(link => {
      link.classList.add('text-neutral-900');
      link.classList.remove('text-white', 'drop-shadow-sm');
    });
  } else {
    // Top resting state: transparent overlay floating on hero photo
    navbar.classList.add('bg-transparent', 'border-transparent', 'py-3', 'sm:py-4');
    navbar.classList.remove('bg-[#FAF7F2]/90', 'backdrop-blur-md', 'border-[#E2D9CC]/60', 'shadow-sm', 'py-2');

    navLogo.classList.add('h-16', 'sm:h-20', 'lg:h-24');
    navLogo.classList.remove('h-11', 'sm:h-12', 'lg:h-14');

    // Resting link colors: transition back to white with subtle shadow
    navLinks.forEach(link => {
      link.classList.add('text-white', 'drop-shadow-sm');
      link.classList.remove('text-neutral-900');
    });
  }
});