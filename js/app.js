/**
 * PLANTFORM TECH - PORTFOLIO INTERACTION ENGINE
 * Glassmorphic UI, Canvas Shimmer, Command Palette, Live Customizer & Sound
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sound Synthesis Engine (Web Audio API) ---
  const SoundEngine = {
    ctx: null,
    enabled: true,

    init() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        this.enabled = false;
      }
    },

    playClick() {
      if (!this.enabled || !this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    },

    playChime() {
      if (!this.enabled || !this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
      } catch (e) {}
    },

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }
  };

  // --- 2. Toast Notification System ---
  const Toast = {
    container: document.getElementById('toast-container'),

    show(message, icon = 'check') {
      if (!this.container) return;
      SoundEngine.playChime();

      const toast = document.createElement('div');
      toast.className = 'toast';
      
      const iconSvg = icon === 'check' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

      toast.innerHTML = `${iconSvg} <span>${message}</span>`;
      this.container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px) scale(0.95)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 260);
      }, 3200);
    }
  };

  // --- 3. Ambient Particle Background Canvas ---
  const CanvasBackground = {
    canvas: document.getElementById('particle-canvas'),
    ctx: null,
    particles: [],
    numParticles: 42,
    mouse: { x: null, y: null, radius: 120 },
    animationId: null,

    init() {
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();

      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });
      window.addEventListener('mouseout', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      this.createParticles();
      this.animate();
    },

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    createParticles() {
      this.particles = [];
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 22 : this.numParticles;

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.45,
          speedY: (Math.random() - 0.5) * 0.45,
          alpha: Math.random() * 0.4 + 0.2
        });
      }
    },

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const baseColor = isLight ? '0, 0, 0' : '255, 255, 255';

      // Connect near particles with delicate lines
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.12;
            this.ctx.strokeStyle = `rgba(${baseColor}, ${lineAlpha})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }

      // Draw & update nodes
      for (let p of this.particles) {
        // Mouse avoidance/repulsion
        if (this.mouse.x !== null) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.mouse.radius) {
            const force = (1 - dist / this.mouse.radius) * 1.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screen
        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;

        this.ctx.fillStyle = `rgba(${baseColor}, ${p.alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.animationId = requestAnimationFrame(() => this.animate());
    }
  };

  // --- 4. Interactive Mouse-Follow Card Sheen ---
  function initCardSheen() {
    const cards = document.querySelectorAll('.glass-card, .glass-panel');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // --- 5. Theme Switcher (Dark Obsidian / Pure White Crystalline Glass) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('plantform_theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('plantform_theme', theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to White Glass Theme' : 'Switch to Dark Obsidian Theme');
      const iconWrap = themeToggleBtn.querySelector('.theme-icon-slot');
      if (iconWrap) {
        iconWrap.innerHTML = theme === 'dark'
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
    }
  }

  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      SoundEngine.playClick();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      Toast.show(next === 'light' ? 'Pure White Glass theme active' : 'Dark Obsidian Glass theme active');
    });
  }

  // --- 6. Sound Toggle Control ---
  const soundToggleBtns = document.querySelectorAll('.sound-toggle-trigger');
  soundToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isEnabled = SoundEngine.toggle();
      soundToggleBtns.forEach(b => {
        b.innerHTML = isEnabled 
          ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> <span>Sound ON</span>`
          : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> <span>Sound OFF</span>`;
      });
      Toast.show(isEnabled ? 'Audio feedback enabled' : 'Audio feedback muted');
      if (isEnabled) SoundEngine.playClick();
    });
  });

  // --- 7. Sticky Header & Active Section Spy ---
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      SoundEngine.playClick();
      document.body.classList.toggle('mobile-nav-active');
    });
  }

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      SoundEngine.playClick();
      document.body.classList.remove('mobile-nav-active');
    });
  });

  // --- 8. Stats Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const suffix = stat.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            current = ease * target;

            stat.textContent = isDecimal 
              ? current.toFixed(1) + suffix
              : Math.floor(current) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              stat.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsContainer = document.querySelector('.stats-container');
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }

  // --- 9. Skills Progress Fill Animation ---
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-progress-fill');
        fills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-level') + '%';
          fill.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category-card').forEach(card => {
    skillObserver.observe(card);
  });

  // --- 10. Project SVG Artwork Generator ---
  function getProjectSvg(theme) {
    switch (theme) {
      case 'geometric-cube':
        return `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-thumbnail-svg">
          <rect width="400" height="240" fill="currentColor" fill-opacity="0.03"/>
          <g transform="translate(200, 120)">
            <!-- Isometric Cube Glass Refraction -->
            <polygon points="0,-60 60,-25 0,10 -60,-25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="4 2"/>
            <polygon points="-60,-25 0,10 0,75 -60,40" fill="none" stroke="currentColor" stroke-width="2"/>
            <polygon points="0,10 60,-25 60,40 0,75" fill="none" stroke="currentColor" stroke-width="2"/>
            <!-- Inner Glass Core -->
            <polygon points="0,-30 30,-12 0,5 -30,-12" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1"/>
            <line x1="0" y1="5" x2="0" y2="40" stroke="currentColor" stroke-width="1"/>
            <!-- Coordinate Nodes -->
            <circle cx="0" cy="-60" r="4" fill="currentColor"/>
            <circle cx="60" cy="-25" r="4" fill="currentColor"/>
            <circle cx="-60" cy="-25" r="4" fill="currentColor"/>
            <circle cx="0" cy="75" r="4" fill="currentColor"/>
          </g>
        </svg>`;
      case 'data-waves':
        return `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-thumbnail-svg">
          <rect width="400" height="240" fill="currentColor" fill-opacity="0.03"/>
          <path d="M40 160 Q 120 70, 200 130 T 360 90" stroke="currentColor" stroke-width="2.5" fill="none"/>
          <path d="M40 180 Q 120 90, 200 150 T 360 110" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.5" stroke-dasharray="5 4" fill="none"/>
          <path d="M40 200 Q 120 110, 200 170 T 360 130" stroke="currentColor" stroke-width="1" stroke-opacity="0.25" fill="none"/>
          <circle cx="200" cy="130" r="5" fill="currentColor"/>
          <circle cx="360" cy="90" r="4" fill="currentColor"/>
          <circle cx="120" cy="100" r="3" fill="currentColor"/>
        </svg>`;
      case 'abstract-grid':
        return `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-thumbnail-svg">
          <rect width="400" height="240" fill="currentColor" fill-opacity="0.03"/>
          <g opacity="0.6">
            <line x1="80" y1="40" x2="320" y2="40" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>
            <line x1="80" y1="90" x2="320" y2="90" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>
            <line x1="80" y1="140" x2="320" y2="140" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>
            <line x1="80" y1="190" x2="320" y2="190" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>
            <line x1="120" y1="20" x2="120" y2="210" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>
            <line x1="200" y1="20" x2="200" y2="210" stroke="currentColor" stroke-width="1.5"/>
            <line x1="280" y1="20" x2="280" y2="210" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>
          </g>
          <rect x="160" y="80" width="80" height="80" rx="8" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="2"/>
          <circle cx="200" cy="120" r="14" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>`;
      case 'crypto-vault':
        return `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-thumbnail-svg">
          <rect width="400" height="240" fill="currentColor" fill-opacity="0.03"/>
          <circle cx="200" cy="120" r="64" stroke="currentColor" stroke-width="2" stroke-dasharray="8 4"/>
          <circle cx="200" cy="120" r="46" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="200" cy="120" r="28" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.8"/>
          <line x1="170" y1="120" x2="230" y2="120" stroke="currentColor" stroke-width="2"/>
          <line x1="200" y1="90" x2="200" y2="150" stroke="currentColor" stroke-width="2"/>
        </svg>`;
      case 'infinite-canvas':
        return `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-thumbnail-svg">
          <rect width="400" height="240" fill="currentColor" fill-opacity="0.03"/>
          <rect x="100" y="60" width="90" height="50" rx="6" stroke="currentColor" stroke-width="1.8" fill="none"/>
          <rect x="220" y="120" width="90" height="50" rx="6" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.1"/>
          <path d="M190 85 C 210 85, 200 145, 220 145" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
          <circle cx="190" cy="85" r="3" fill="currentColor"/>
          <circle cx="220" cy="145" r="3" fill="currentColor"/>
        </svg>`;
      default:
        return `<svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-thumbnail-svg">
          <rect width="400" height="240" fill="currentColor" fill-opacity="0.03"/>
          <path d="M200 50 L270 85 V155 L200 190 L130 155 V85 Z" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="200" cy="120" r="24" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2"/>
        </svg>`;
    }
  }

  // --- 11. Render Projects & Filter Logic ---
  const projectsGrid = document.getElementById('projects-grid');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectSearchInput = document.getElementById('project-search-input');
  let currentFilter = 'all';
  let searchQuery = '';

  function renderProjects() {
    if (!projectsGrid) return;

    const filtered = portfolioData.projects.filter(project => {
      const matchesFilter = currentFilter === 'all' || project.category === currentFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        project.title.toLowerCase().includes(q) ||
        project.shortDesc.toLowerCase().includes(q) ||
        project.tags.some(t => t.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <div class="empty-state glass-card">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 8px;">No projects found</p>
          <p style="font-size: 0.875rem; color: var(--text-muted);">Try adjusting your search query or switching categories.</p>
        </div>
      `;
      return;
    }

    projectsGrid.innerHTML = filtered.map(p => `
      <article class="glass-card project-card" data-project-id="${p.id}">
        <div class="project-thumbnail">
          ${getProjectSvg(p.imageTheme)}
          ${p.featured ? `<span class="project-featured-badge">Featured</span>` : ''}
          <span class="project-year-badge">${p.year}</span>
        </div>
        <div class="project-content">
          <div class="project-cat-title">${p.categoryLabel}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.shortDesc}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-card-footer">
            <span class="view-details-link">
              Explore Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </div>
        </div>
      </article>
    `).join('');

    initCardSheen();

    // Attach click listeners to cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        openProjectModal(id);
      });
    });
  }

  // Filter tabs click
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      SoundEngine.playClick();
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-category');
      renderProjects();
    });
  });

  // Search input change
  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProjects();
    });
  }

  // --- 12. Project Detail Modal Lightbox ---
  const projectModal = document.getElementById('project-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  function openProjectModal(projectId) {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if (!project || !projectModal || !projectModalBody) return;

    SoundEngine.playClick();

    projectModalBody.innerHTML = `
      <div class="modal-project-header">
        <div class="modal-project-cat">${project.categoryLabel} • ${project.year}</div>
        <h2 class="modal-project-title">${project.title}</h2>
        <div class="modal-project-tags">
          ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-project-hero-art">
        ${getProjectSvg(project.imageTheme)}
      </div>

      <div class="modal-metrics-callout">
        <strong>⚡ Performance Metrics:</strong> ${project.metrics}
      </div>

      <div class="modal-project-body">
        <h4 class="modal-section-title">Architectural Overview</h4>
        <p>${project.fullDesc}</p>

        <h4 class="modal-section-title">Key Innovations & Engineering Highlights</h4>
        <div class="modal-highlights-list">
          ${project.highlights.map(h => `
            <div class="modal-highlight-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${h}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-actions">
        <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Launch Live App
        </a>
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-glass">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View Source Code
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // --- 13. Command Palette / Spotlight Navigator (Cmd+K) ---
  const cmdModal = document.getElementById('cmd-modal');
  const cmdInput = document.getElementById('cmd-search-input');
  const cmdResults = document.getElementById('cmd-results');
  const cmdClose = document.getElementById('cmd-close');
  const searchTriggerBtns = document.querySelectorAll('.search-trigger-btn');

  const commandItems = [
    { title: "Explore Projects", cat: "Navigation", target: "#projects", icon: "folder" },
    { title: "View Technical Skills", cat: "Navigation", target: "#skills", icon: "cpu" },
    { title: "Career Timeline & Journey", cat: "Navigation", target: "#experience", icon: "clock" },
    { title: "Client Recommendations", cat: "Navigation", target: "#testimonials", icon: "message" },
    { title: "Get In Touch / Contact", cat: "Navigation", target: "#contact", icon: "mail" },
    { title: "Copy Direct Email Address", cat: "Action", action: "copy-email", icon: "copy" },
    { title: "Toggle Theme (Dark / Light)", cat: "Action", action: "toggle-theme", icon: "sun" },
    { title: "Toggle UI Sound Chimes", cat: "Action", action: "toggle-sound", icon: "volume" },
    { title: "Customize Profile Live", cat: "Tool", action: "open-customizer", icon: "edit" }
  ];

  function openCmdModal() {
    if (!cmdModal) return;
    SoundEngine.playClick();
    cmdModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
    }
    renderCmdResults('');
  }

  function closeCmdModal() {
    if (!cmdModal) return;
    cmdModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderCmdResults(query) {
    if (!cmdResults) return;
    const q = query.toLowerCase().trim();
    const filtered = commandItems.filter(item => 
      !q || item.title.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      cmdResults.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">No commands found</div>`;
      return;
    }

    cmdResults.innerHTML = filtered.map((item, idx) => `
      <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
        <div class="cmd-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <span>${item.title}</span>
        </div>
        <span class="cmd-item-cat">${item.cat}</span>
      </div>
    `).join('');

    cmdResults.querySelectorAll('.cmd-item').forEach((elem, index) => {
      elem.addEventListener('click', () => {
        executeCommand(filtered[index]);
      });
    });
  }

  function executeCommand(item) {
    closeCmdModal();
    if (item.target) {
      const el = document.querySelector(item.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.action === 'copy-email') {
      navigator.clipboard.writeText(portfolioData.profile.email);
      Toast.show(`Email copied: ${portfolioData.profile.email}`);
    } else if (item.action === 'toggle-theme') {
      if (themeToggleBtn) themeToggleBtn.click();
    } else if (item.action === 'toggle-sound') {
      if (soundToggleBtns[0]) soundToggleBtns[0].click();
    } else if (item.action === 'open-customizer') {
      openCustomizerModal();
    }
  }

  searchTriggerBtns.forEach(btn => btn.addEventListener('click', openCmdModal));
  if (cmdClose) cmdClose.addEventListener('click', closeCmdModal);
  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmdModal();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => renderCmdResults(e.target.value));
  }

  // Keyboard shortcut Ctrl/Cmd + K & Escape
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains('active')) {
        closeCmdModal();
      } else {
        openCmdModal();
      }
    }
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCmdModal();
      closeCustomizerModal();
    }
  });

  // --- 14. Testimonial Carousel ---
  const testimonialCards = document.querySelectorAll('.testimonial-slide');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;

  function showSlide(index) {
    if (testimonialCards.length === 0) return;
    testimonialCards.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    carouselDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  carouselDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      SoundEngine.playClick();
      showSlide(i);
    });
  });

  // Auto rotate testimonials gently every 7 seconds
  setInterval(() => {
    if (testimonialCards.length > 0) {
      const next = (currentSlide + 1) % testimonialCards.length;
      showSlide(next);
    }
  }, 7500);

  // --- 15. Contact Form Submission & Direct Clipboard Copy ---
  const contactForm = document.getElementById('contact-form');
  const copyEmailTriggers = document.querySelectorAll('.copy-email-btn');
  const copyPhoneTriggers = document.querySelectorAll('.copy-phone-btn');
  const budgetChips = document.querySelectorAll('.budget-chip');
  let selectedBudget = '$10k - $25k';

  budgetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      SoundEngine.playClick();
      budgetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedBudget = chip.textContent.trim();
    });
  });

  copyEmailTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(portfolioData.profile.email);
      Toast.show(`Copied to clipboard: ${portfolioData.profile.email}`);
    });
  });

  copyPhoneTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(portfolioData.profile.phone);
      Toast.show(`Copied phone: ${portfolioData.profile.phone}`);
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      SoundEngine.playClick();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        <span>Transmitting...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        Toast.show("Message received! Alex will reply within 24 hours.");
      }, 1200);
    });
  }

  // --- 16. Live Profile Customizer Drawer & Persistence ---
  const customizerModal = document.getElementById('customizer-modal');
  const customizerClose = document.getElementById('customizer-close');
  const customizerTrigger = document.getElementById('customizer-trigger');
  const customizerForm = document.getElementById('customizer-form');
  const customizerResetBtn = document.getElementById('customizer-reset-btn');

  function openCustomizerModal() {
    if (!customizerModal) return;
    SoundEngine.playClick();
    loadCustomizerFormValues();
    customizerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCustomizerModal() {
    if (!customizerModal) return;
    customizerModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (customizerTrigger) customizerTrigger.addEventListener('click', openCustomizerModal);
  if (customizerClose) customizerClose.addEventListener('click', closeCustomizerModal);
  if (customizerModal) {
    customizerModal.addEventListener('click', (e) => {
      if (e.target === customizerModal) closeCustomizerModal();
    });
  }

  function loadCustomizerFormValues() {
    const saved = JSON.parse(localStorage.getItem('plantform_custom_profile') || '{}');
    const p = { ...portfolioData.profile, ...saved };

    const nameInp = document.getElementById('cust-name');
    const brandInp = document.getElementById('cust-brand');
    const titleInp = document.getElementById('cust-title');
    const emailInp = document.getElementById('cust-email');
    const bioInp = document.getElementById('cust-bio');

    if (nameInp) nameInp.value = p.name;
    if (brandInp) brandInp.value = p.brandName;
    if (titleInp) titleInp.value = p.title;
    if (emailInp) emailInp.value = p.email;
    if (bioInp) bioInp.value = p.bio;
  }

  function applyProfileToDOM(profile) {
    document.querySelectorAll('.profile-name-slot').forEach(el => el.textContent = profile.name);
    document.querySelectorAll('.brand-name-slot').forEach(el => el.textContent = profile.brandName);
    document.querySelectorAll('.profile-title-slot').forEach(el => el.textContent = profile.title);
    document.querySelectorAll('.profile-email-slot').forEach(el => el.textContent = profile.email);
    document.querySelectorAll('.profile-bio-slot').forEach(el => el.textContent = profile.bio);
    document.querySelectorAll('.profile-initials-slot').forEach(el => {
      const parts = profile.name.split(' ');
      el.textContent = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
    });
  }

  // Load custom profile on startup
  const savedProfile = JSON.parse(localStorage.getItem('plantform_custom_profile') || '{}');
  if (Object.keys(savedProfile).length > 0) {
    Object.assign(portfolioData.profile, savedProfile);
  }
  applyProfileToDOM(portfolioData.profile);

  if (customizerForm) {
    customizerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      SoundEngine.playClick();

      const newProfile = {
        name: document.getElementById('cust-name').value.trim() || portfolioData.profile.name,
        brandName: document.getElementById('cust-brand').value.trim() || portfolioData.profile.brandName,
        title: document.getElementById('cust-title').value.trim() || portfolioData.profile.title,
        email: document.getElementById('cust-email').value.trim() || portfolioData.profile.email,
        bio: document.getElementById('cust-bio').value.trim() || portfolioData.profile.bio
      };

      Object.assign(portfolioData.profile, newProfile);
      localStorage.setItem('plantform_custom_profile', JSON.stringify(newProfile));
      applyProfileToDOM(portfolioData.profile);

      closeCustomizerModal();
      Toast.show("Portfolio profile updated successfully!");
    });
  }

  if (customizerResetBtn) {
    customizerResetBtn.addEventListener('click', () => {
      SoundEngine.playClick();
      localStorage.removeItem('plantform_custom_profile');
      window.location.reload();
    });
  }

  // --- Initial Runs ---
  SoundEngine.init();
  CanvasBackground.init();
  renderProjects();
  initCardSheen();
  showSlide(0);

  // Initialize CSS keyframes for spin
  const styleEl = document.createElement('style');
  styleEl.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  document.head.appendChild(styleEl);
});
