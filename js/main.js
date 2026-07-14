document.addEventListener('DOMContentLoaded', () => {

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header__nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if open
      hamburger.classList.remove('active');
      nav.classList.remove('active');

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Hero Slideshow
  const slideshowImages = document.querySelectorAll('.hero__bg .slideshow-img');
  if (slideshowImages.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slideshowImages[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slideshowImages.length;
      slideshowImages[currentSlide].classList.add('active');
    }, 3000); // 3 seconds interval
  }

  // Schedule Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Achievements Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('i');
      const isActive = header.classList.contains('active');

      // Close all accordions first (optional, max 1 open at a time)
      /*
      document.querySelectorAll('.accordion-content').forEach(c => {
        c.style.maxHeight = null;
        c.classList.remove('open');
      });
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.querySelector('i').className = 'fa-solid fa-plus';
      });
      */

      if (isActive) {
        header.classList.remove('active');
        content.classList.remove('open');
        content.style.maxHeight = null;
        icon.className = 'fa-solid fa-plus';
      } else {
        header.classList.add('active');
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + "px";
        icon.className = 'fa-solid fa-minus';
      }
    });
  });

  // Initial calculation for initially open accordions
  document.querySelectorAll('.accordion-content.open').forEach(content => {
    content.style.maxHeight = content.scrollHeight + "px";
  });

  // Intersection Observer for scroll animations (fade up)
  const fadeElements = document.querySelectorAll('.about-card, .feature-box, .facility-card, .costs-grid, .accordion-item');
  
  const fadeOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, fadeOptions);

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    fadeObserver.observe(el);
  });

});
