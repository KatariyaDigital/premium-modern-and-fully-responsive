/**
 * KATARIYA DIGITAL — Main JavaScript
 * Handles: navigation, scroll effects, reveal animations, service tabs, portfolio filters, forms, counters
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const serviceTabs = document.querySelectorAll('.services__tab');
  const servicePanels = document.querySelectorAll('.services__panel');
  const portfolioFilters = document.querySelectorAll('.portfolio__filter');
  const projectForm = document.getElementById('projectForm');
  const contactForm = document.getElementById('contactForm');
  const statValues = document.querySelectorAll('[data-count]');
  const yearEl = document.getElementById('year');

  // ==========================================================================
  // Portfolio Data (Sample Projects)
  // ==========================================================================
  const portfolioData = [
    {
      id: 1,
      title: 'TechStart Landing Page',
      category: 'web',
      description: 'High-converting landing page for a SaaS startup with animated interactions and lead capture.',
      tags: ['React', 'Tailwind', 'Framer Motion'],
      icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>'
    },
    {
      id: 2,
      title: 'Creative Portfolio',
      category: 'web',
      description: 'Minimalist portfolio website for a freelance designer with CMS integration.',
      tags: ['Next.js', 'Sanity CMS', 'Vercel'],
      icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M2 9h20M2 15h20"/>'
    },
    {
      id: 3,
      title: 'Sales Dashboard Pro',
      category: 'excel',
      description: 'Automated Excel dashboard with real-time charts, KPI tracking, and regional filters.',
      tags: ['Excel', 'Power Query', 'VBA'],
      icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
    },
    {
      id: 4,
      title: 'Inventory Management System',
      category: 'excel',
      description: 'Multi-warehouse inventory tracker with reorder alerts, valuation, and supplier management.',
      tags: ['Excel', 'Power Pivot', 'DAX'],
      icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
    },
    {
      id: 5,
      title: 'Startup Business Plan',
      category: 'business',
      description: 'Investor-ready business plan with 5-year financial projections and market analysis.',
      tags: ['Strategy', 'Financial Modeling', 'Pitch Deck'],
      icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'
    },
    {
      id: 6,
      title: 'Digital Transformation Roadmap',
      category: 'business',
      description: 'Comprehensive digital transformation strategy for a mid-size manufacturing company.',
      tags: ['Strategy', 'Process Audit', 'Tech Stack'],
      icon: '<path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>'
    },
    {
      id: 7,
      title: 'Brand Identity System',
      category: 'creative',
      description: 'Complete brand identity including logo, color system, typography, and brand guidelines.',
      tags: ['Figma', 'Brand Strategy', 'Guidelines'],
      icon: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>'
    },
    {
      id: 8,
      title: 'Social Media Campaign',
      category: 'creative',
      description: '3-month social media creative package with 50+ posts, stories, and ad creatives.',
      tags: ['Figma', 'After Effects', 'Meta Ads'],
      icon: '<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>'
    },
    {
      id: 9,
      title: 'AI Content Automation',
      category: 'ai',
      description: 'Automated content pipeline using GPT-4 for blog posts, social media, and newsletters.',
      tags: ['OpenAI', 'Make.com', 'Notion'],
      icon: '<path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>'
    },
    {
      id: 10,
      title: 'Business Process Automation',
      category: 'ai',
      description: 'End-to-end automation of lead qualification, proposal generation, and client onboarding.',
      tags: ['n8n', 'Airtable', 'Gmail API'],
      icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>'
    }
  ];

  // ==========================================================================
  // Render Portfolio
  // ==========================================================================
  function renderPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    const filtered = filter === 'all'
      ? portfolioData
      : portfolioData.filter(p => p.category === filter);

    grid.innerHTML = filtered.map((project, index) => `
      <article class="portfolio__item reveal" style="transition-delay: ${index * 50}ms" data-category="${project.category}">
        <div class="portfolio__item-image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            ${project.icon}
          </svg>
        </div>
        <div class="portfolio__item-content">
          <span class="portfolio__item-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
          <h3 class="portfolio__item-title">${project.title}</h3>
          <p class="portfolio__item-desc">${project.description}</p>
          <div class="portfolio__item-tags">
            ${project.tags.map(tag => `<span class="portfolio__tag">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');

    // Re-observe new elements for reveal animation
    initRevealAnimations();
  }

  // ==========================================================================
  // Navigation
  // ==========================================================================
  function initNavigation() {
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      navLinks.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
          navLinks.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          navToggle.focus();
        }
      });
    }

    let lastScroll = 0;
    const scrollThreshold = 50;

    function handleNavScroll() {
      const currentScroll = window.scrollY;

      if (currentScroll > scrollThreshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = nav.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          history.pushState(null, '', targetId);
        }
      });
    });
  }

  // ==========================================================================
  // Reveal Animations (IntersectionObserver)
  // ==========================================================================
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal:not(.is-visible)');

    if (!revealElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Stagger containers
    const staggerContainers = document.querySelectorAll('.stagger:not(.is-visible)');
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { ...observerOptions, rootMargin: '0px 0px -5% 0px' });

    staggerContainers.forEach(el => staggerObserver.observe(el));
  }

  // ==========================================================================
  // Counter Animation
  // ==========================================================================
  function initCounters() {
    if (!statValues.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 2000;
          const startTime = performance.now();

          function animateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            } else {
              el.textContent = target.toLocaleString();
            }
          }

          requestAnimationFrame(animateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => counterObserver.observe(el));
  }

  // ==========================================================================
  // Service Tabs
  // ==========================================================================
  function initServiceTabs() {
    if (!serviceTabs.length || !servicePanels.length) return;

    serviceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.service;

        serviceTabs.forEach(t => {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab);
        });

        servicePanels.forEach(panel => {
          const isTarget = panel.id === `panel-${targetTab}`;
          panel.hidden = !isTarget;
          panel.classList.toggle('is-active', isTarget);
          panel.setAttribute('aria-hidden', !isTarget);
        });
      });

      tab.addEventListener('keydown', (e) => {
        const tabs = Array.from(serviceTabs);
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = currentIndex;

        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          nextIndex = 0;
        } else if (e.key === 'End') {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        e.preventDefault();
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      });
    });
  }

  // ==========================================================================
  // Portfolio Filters
  // ==========================================================================
  function initPortfolioFilters() {
    if (!portfolioFilters.length) return;

    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        const targetFilter = filter.dataset.filter;

        portfolioFilters.forEach(f => {
          f.classList.toggle('is-active', f === filter);
          f.setAttribute('aria-pressed', f === filter);
        });

        renderPortfolio(targetFilter);
      });

      filter.addEventListener('keydown', (e) => {
        const filters = Array.from(portfolioFilters);
        const currentIndex = filters.indexOf(filter);
        let nextIndex = currentIndex;

        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % filters.length;
        } else if (e.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + filters.length) % filters.length;
        } else if (e.key === 'Home') {
          nextIndex = 0;
        } else if (e.key === 'End') {
          nextIndex = filters.length - 1;
        } else {
          return;
        }

        e.preventDefault();
        filters[nextIndex].focus();
        filters[nextIndex].click();
      });
    });
  }

  // ==========================================================================
  // Form Handling
  // ==========================================================================
  function handleFormSubmit(form, submitBtnText = 'Submitting...') {
    return async (e) => {
      e.preventDefault();

      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#c0392b';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) {
        const firstInvalid = form.querySelector('[required]:invalid, [required][value=""]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const successMsg = form.querySelector('[data-craftable-success]');

      if (typeof Craftable !== 'undefined' && Craftable.submit) {
        submitBtn.disabled = true;
        submitBtn.textContent = submitBtnText;

        try {
          await Craftable.submit(form);
          form.reset();
          if (successMsg) successMsg.hidden = false;
          setTimeout(() => { if (successMsg) successMsg.hidden = true; }, 5000);
        } catch (err) {
          console.error('Form submission error:', err);
          alert('Unable to submit. Please try again or contact us directly.');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
        }
      } else {
        form.reset();
        if (successMsg) successMsg.hidden = false;
        setTimeout(() => { if (successMsg) successMsg.hidden = true; }, 5000);
      }
    };
  }

  function initForms() {
    if (projectForm) {
      const submitBtn = projectForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.dataset.originalText = submitBtn.textContent;
      projectForm.addEventListener('submit', handleFormSubmit(projectForm, 'Submitting Project...'));
    }

    if (contactForm) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.dataset.originalText = submitBtn.textContent;
      contactForm.addEventListener('submit', handleFormSubmit(contactForm, 'Sending...'));
    }

    // Clear error styling on input
    document.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  // ==========================================================================
  // Current Year in Footer
  // ==========================================================================
  function initCurrentYear() {
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ==========================================================================
  // Initialize All
  // ==========================================================================
  function init() {
    initNavigation();
    initSmoothScroll();
    initRevealAnimations();
    initCounters();
    initServiceTabs();
    initPortfolioFilters();
    initForms();
    initCurrentYear();
    renderPortfolio('all');

    document.body.classList.add('is-loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
