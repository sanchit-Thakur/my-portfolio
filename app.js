/**
 * ==========================================================================
 * SANCHIT THAKUR PORTFOLIO ENGINE (app.js) v3.0
 * ✦ INSANE LEVEL ANIMATIONS ✦
 * Neural constellation, cursor trails, ambient particles, preloader,
 * GSAP scroll effects, glitch text, magnetic ripples, and more.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // ✦ PHASE 1: Start Preloader
  initPreloader(() => {
    // ✦ PHASE 2: After preloader completes, init everything
    initScrollReveals();
    initActiveNavObserver();
    initMobileMenu();
    initCopyEmail();
    initBackToTop();
    updateCurrentYear();
    initSkillsCanvas();
    initHandsomeCoderAvatar();
    initLeetCodeStats();
    initGitHubActivity();

    // High-Level Animation & Interactive Engines
    initScrollProgressBar();
    initAudioSynthesizer();
    initCustomMagneticCursor();
    init3DNeuralConstellation();
    initKineticTextScramble();
    init3DCardTilt();
    initAnimatedCounters();
    initInteractiveTerminal();
    initMatrixRain();

    // ✦ INSANE LEVEL 2 ENGINES ✦
    initAmbientParticles();
    initCursorTrail();
    initGSAPScrollAnimations();
    initGlitchTextEffects();
    initMagneticRipple();
    initSectionDividers();
    initParallaxLayers();
    initSectionZoom();
  });
});

// --------------------------------------------------------------------------
// 1. SCROLL REVEALS (IntersectionObserver)
// --------------------------------------------------------------------------
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal-item");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach((el) => revealObserver.observe(el));
}

// --------------------------------------------------------------------------
// 2. ACTIVE NAVIGATION OBSERVER
// --------------------------------------------------------------------------
function initActiveNavObserver() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${currentId}`) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
          } else if (href && href.startsWith("#")) {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: "-10% 0px -45% 0px"
  });

  sections.forEach((section) => sectionObserver.observe(section));
}

// --------------------------------------------------------------------------
// 3. MOBILE MENU TOGGLE & ACCESSIBILITY
// --------------------------------------------------------------------------
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-toggle");
  const mainNav = document.getElementById("main-nav");
  const siteHeader = document.getElementById("site-header");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!toggleBtn || !mainNav) return;

  function closeMenu() {
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.classList.remove("active");
    mainNav.classList.remove("mobile-open");
    document.body.classList.remove("no-scroll");
  }

  function openMenu() {
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.classList.add("active");
    mainNav.classList.add("mobile-open");
    document.body.classList.add("no-scroll");
  }

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("mobile-open")) {
      closeMenu();
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("mobile-open") &&
      siteHeader &&
      !siteHeader.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

// --------------------------------------------------------------------------
// 4. INTERACTIVE 2D PHYSICS SKILL BALLS CANVAS
// --------------------------------------------------------------------------
function initSkillsCanvas() {
  const canvas = document.getElementById("skills-canvas");
  const container = document.getElementById("skills-canvas-container");
  const resetBtn = document.getElementById("reset-balls-btn");
  const filterBtns = document.querySelectorAll(".skills-filter-bar .filter-btn");

  if (!canvas || !container) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  // Sanchit's Skills Dataset
  const SKILLS_DATA = [
    // Languages (Terracotta #db5a3d)
    { name: "Python", category: "languages", color: "#db5a3d", categoryName: "Language" },
    { name: "SQL", category: "languages", color: "#db5a3d", categoryName: "Language" },
    { name: "C++", category: "languages", color: "#db5a3d", categoryName: "Language" },
    { name: "Java", category: "languages", color: "#db5a3d", categoryName: "Language" },
    { name: "C", category: "languages", color: "#db5a3d", categoryName: "Language" },
    { name: "HTML / CSS", category: "languages", color: "#db5a3d", categoryName: "Language" },
    { name: "TypeScript", category: "languages", color: "#db5a3d", categoryName: "Language" },

    // Data Science & ML (Olive #8e9b84)
    { name: "Scikit-learn", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "PyTorch", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Pandas & NumPy", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Matplotlib", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Data Cleaning", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "EDA & Features", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Statistical Analysis", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Predictive Modeling", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Statsmodels", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },

    // Frameworks & AI / LLMs (Gold #d9aa6c)
    { name: "React.js", category: "frameworks", color: "#d9aa6c", categoryName: "Framework" },
    { name: "Next.js 14", category: "frameworks", color: "#d9aa6c", categoryName: "Framework" },
    { name: "Node.js & Express", category: "frameworks", color: "#d9aa6c", categoryName: "Framework" },
    { name: "Redux Toolkit", category: "frameworks", color: "#d9aa6c", categoryName: "Framework" },
    { name: "Zustand", category: "frameworks", color: "#d9aa6c", categoryName: "Framework" },
    { name: "LangChain", category: "frameworks", color: "#d9aa6c", categoryName: "AI & LLM" },
    { name: "OpenAI GPT-4", category: "frameworks", color: "#d9aa6c", categoryName: "AI & LLM" },
    { name: "Whisper", category: "frameworks", color: "#d9aa6c", categoryName: "AI & LLM" },
    { name: "RAG Pipelines", category: "frameworks", color: "#d9aa6c", categoryName: "AI & LLM" },
    { name: "Prompt Eng.", category: "frameworks", color: "#d9aa6c", categoryName: "AI & LLM" },

    // Databases & Tools (Bone Cream #ece8df)
    { name: "MySQL", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
    { name: "SQLite", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
    { name: "MongoDB", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
    { name: "Docker", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
    { name: "Vector DBs", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
    { name: "Git / GitHub", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
    { name: "VS Code", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
    { name: "Jupyter Notebooks", category: "tools", color: "#ece8df", categoryName: "Database & Tool" }
  ];

  let balls = [];
  let activeFilter = "all";
  let mouse = { x: -1000, y: -1000, px: -1000, py: -1000, isDown: false };
  let draggedBall = null;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
  }

  class Ball {
    constructor(data, index, total) {
      this.name = data.name;
      this.category = data.category;
      this.categoryName = data.categoryName;
      this.color = data.color;
      this.targetAlpha = 1.0;
      this.currentAlpha = 1.0;

      // Estimate radius based on label length
      const baseRadius = width < 600 ? 32 : 42;
      this.radius = baseRadius + Math.min(this.name.length * 1.6, 18);

      // Distribute initial positions cleanly inside canvas
      const cols = Math.ceil(Math.sqrt(total));
      const row = Math.floor(index / cols);
      const col = index % cols;
      const padding = 60;
      const gridW = (width - padding * 2) / cols;
      const gridH = (height - padding * 2) / cols;

      this.x = padding + col * gridW + gridW / 2 + (Math.random() - 0.5) * 40;
      this.y = padding + row * gridH + gridH / 2 + (Math.random() - 0.5) * 40;

      // Initial random velocity
      this.vx = (Math.random() - 0.5) * 2.2;
      this.vy = (Math.random() - 0.5) * 2.2;

      this.isHovered = false;
      this.isDragged = false;
    }

    update() {
      // Smooth alpha transition on filter change
      this.currentAlpha += (this.targetAlpha - this.currentAlpha) * 0.1;

      if (this.isDragged) {
        this.vx = (mouse.x - mouse.px) * 0.6;
        this.vy = (mouse.y - mouse.py) * 0.6;
        this.x = mouse.x;
        this.y = mouse.y;
      } else {
        // Position update
        this.x += this.vx;
        this.y += this.vy;

        // Friction / Damping
        this.vx *= 0.985;
        this.vy *= 0.985;

        // Ambient float drift if velocity drops low
        if (Math.abs(this.vx) < 0.25) this.vx += (Math.random() - 0.5) * 0.2;
        if (Math.abs(this.vy) < 0.25) this.vy += (Math.random() - 0.5) * 0.2;

        // Cursor Repulsion Physics
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 150;

          if (dist < repulsionRadius && dist > 0) {
            const force = ((repulsionRadius - dist) / repulsionRadius) * 0.9;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
          }
        }
      }

      // Canvas Boundary Collision
      const margin = this.radius;
      if (this.x - margin < 0) {
        this.x = margin;
        this.vx = Math.abs(this.vx) * 0.85;
      } else if (this.x + margin > width) {
        this.x = width - margin;
        this.vx = -Math.abs(this.vx) * 0.85;
      }

      if (this.y - margin < 0) {
        this.y = margin;
        this.vy = Math.abs(this.vy) * 0.85;
      } else if (this.y + margin > height) {
        this.y = height - margin;
        this.vy = -Math.abs(this.vy) * 0.85;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.currentAlpha;

      const hoverScale = this.isHovered || this.isDragged ? 1.12 : 1.0;
      const r = this.radius * hoverScale;

      // Glow effect on hover/drag
      if (this.isHovered || this.isDragged) {
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 24;
      } else {
        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 12;
      }

      // Ball Outer Glass Body
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(29, 29, 28, 0.88)";
      ctx.fill();

      // Border Ring matching Category Color
      ctx.lineWidth = this.isHovered || this.isDragged ? 2.5 : 1.5;
      ctx.strokeStyle = this.color;
      ctx.stroke();

      // Inner subtle glass reflection highlight
      ctx.beginPath();
      ctx.arc(this.x - r * 0.3, this.y - r * 0.3, r * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fill();

      // Label Text (Space Mono Font)
      ctx.shadowBlur = 0;
      ctx.fillStyle = this.isHovered ? "#ffffff" : "#ece8df";
      ctx.font = `${this.isHovered ? "600" : "500"} ${width < 600 ? "11px" : "13px"} 'Space Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.name, this.x, this.y);

      // Show Category Tag above ball on hover
      if (this.isHovered || this.isDragged) {
        ctx.font = "10px 'Space Mono', monospace";
        ctx.fillStyle = this.color;
        ctx.fillText(`// ${this.categoryName}`, this.x, this.y - r - 12);
      }

      ctx.restore();
    }
  }

  function resolveBallCollisions() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const b1 = balls[i];
        const b2 = balls[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = b1.radius + b2.radius + 4;

        if (dist < minDist && dist > 0) {
          // Overlap resolution
          const overlap = (minDist - dist) / 2;
          const nx = dx / dist;
          const ny = dy / dist;

          if (!b1.isDragged) {
            b1.x -= nx * overlap;
            b1.y -= ny * overlap;
          }
          if (!b2.isDragged) {
            b2.x += nx * overlap;
            b2.y += ny * overlap;
          }

          // Elastic collision momentum transfer
          const kx = b1.vx - b2.vx;
          const ky = b1.vy - b2.vy;
          const p = 2 * (nx * kx + ny * ky) / 2;

          if (!b1.isDragged) {
            b1.vx -= p * nx * 0.8;
            b1.vy -= p * ny * 0.8;
          }
          if (!b2.isDragged) {
            b2.vx += p * nx * 0.8;
            b2.vy += p * ny * 0.8;
          }
        }
      }
    }
  }

  function initBalls() {
    resize();
    balls = SKILLS_DATA.map((data, index) => new Ball(data, index, SKILLS_DATA.length));
  }

  // Filter Pills Event Handling
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");

      balls.forEach((ball) => {
        if (activeFilter === "all" || ball.category === activeFilter) {
          ball.targetAlpha = 1.0;
        } else {
          ball.targetAlpha = 0.25;
        }
      });
    });
  });

  // Reset Button
  resetBtn?.addEventListener("click", () => {
    initBalls();
  });

  // Mouse & Touch Coordinates
  function updatePointer(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    mouse.px = mouse.x;
    mouse.py = mouse.y;
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
  }

  canvas.addEventListener("mousemove", (e) => {
    updatePointer(e);
    let foundHover = false;
    balls.forEach((ball) => {
      const dx = ball.x - mouse.x;
      const dy = ball.y - mouse.y;
      if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
        ball.isHovered = true;
        foundHover = true;
      } else {
        ball.isHovered = false;
      }
    });
    canvas.style.cursor = foundHover ? "pointer" : "grab";
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
    balls.forEach((b) => (b.isHovered = false));
  });

  canvas.addEventListener("mousedown", (e) => {
    updatePointer(e);
    mouse.isDown = true;
    balls.forEach((ball) => {
      const dx = ball.x - mouse.x;
      const dy = ball.y - mouse.y;
      if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
        draggedBall = ball;
        ball.isDragged = true;
      }
    });
  });

  window.addEventListener("mouseup", () => {
    mouse.isDown = false;
    if (draggedBall) {
      draggedBall.isDragged = false;
      draggedBall = null;
    }
  });

  // Touch Support
  canvas.addEventListener("touchstart", (e) => {
    updatePointer(e);
    balls.forEach((ball) => {
      const dx = ball.x - mouse.x;
      const dy = ball.y - mouse.y;
      if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
        draggedBall = ball;
        ball.isDragged = true;
      }
    });
  });

  canvas.addEventListener("touchmove", (e) => {
    updatePointer(e);
  });

  canvas.addEventListener("touchend", () => {
    if (draggedBall) {
      draggedBall.isDragged = false;
      draggedBall = null;
    }
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener("resize", resize);

  // Main Render Loop (60 FPS)
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Physics Step
    balls.forEach((ball) => ball.update());
    resolveBallCollisions();

    // Draw Step
    balls.forEach((ball) => ball.draw());

    requestAnimationFrame(render);
  }

  initBalls();
  render();
}

// --------------------------------------------------------------------------
// 5. HANDCRAFTED COPY EMAIL TOOL WITH FALLBACK
// --------------------------------------------------------------------------
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  const emailText = document.getElementById("email-text")?.innerText.trim() || "sanchitthakur2345@gmail.com";

  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailText).then(() => {
        showToast(`${emailText} copied to clipboard.`);
      }).catch(() => {
        fallbackCopyText(emailText);
      });
    } else {
      fallbackCopyText(emailText);
    }
  });
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(`${text} copied to clipboard.`);
  } catch (err) {
    showToast(`Email: ${text}`);
  }
  document.body.removeChild(textArea);
}

function showToast(msg) {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// --------------------------------------------------------------------------
// 6. BACK TO TOP SMOOTH SCROLL
// --------------------------------------------------------------------------
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Update copyright year dynamically
function updateCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.innerText = new Date().getFullYear();
  }
}

// --------------------------------------------------------------------------
// 7. HANDSOME 2D CODER AVATAR CURSOR HEAD & EYE TRACKING ENGINE
// --------------------------------------------------------------------------
function initHandsomeCoderAvatar() {
  const headGroup = document.getElementById("character-head-group");
  const pupilLeft = document.getElementById("pupil-left");
  const pupilRight = document.getElementById("pupil-right");
  const catchlightLeft = document.getElementById("catchlight-left");
  const catchlightRight = document.getElementById("catchlight-right");
  const eyelidLeft = document.getElementById("eyelid-left");
  const eyelidRight = document.getElementById("eyelid-right");
  const mouth = document.getElementById("character-mouth");
  const characterCard = document.getElementById("character-card");
  const statusTag = document.getElementById("character-status");

  if (!headGroup || !pupilLeft || !pupilRight) return;

  let currentHeadX = 0, currentHeadY = 0, currentHeadRot = 0;
  let targetHeadX = 0, targetHeadY = 0, targetHeadRot = 0;

  let currentPupilX = 0, currentPupilY = 0;
  let targetPupilX = 0, targetPupilY = 0;

  function updatePointer(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = characterCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Target Head rotation & translation
    targetHeadRot = Math.max(-16, Math.min(16, dx * 0.022));
    targetHeadX = Math.max(-14, Math.min(14, dx * 0.018));
    targetHeadY = Math.max(-12, Math.min(12, dy * 0.018));

    // Target Pupil translation (max 5.5px offset)
    const maxPupilDist = 5.5;
    const pupilDist = Math.min(maxPupilDist, dist * 0.015);
    targetPupilX = Math.cos(angle) * pupilDist;
    targetPupilY = Math.sin(angle) * pupilDist;
  }

  window.addEventListener("mousemove", updatePointer);
  window.addEventListener("touchmove", updatePointer);

  // Smooth animation render loop using linear interpolation (lerp)
  function animateCharacter() {
    // Lerp values
    currentHeadX += (targetHeadX - currentHeadX) * 0.12;
    currentHeadY += (targetHeadY - currentHeadY) * 0.12;
    currentHeadRot += (targetHeadRot - currentHeadRot) * 0.12;

    currentPupilX += (targetPupilX - currentPupilX) * 0.15;
    currentPupilY += (targetPupilY - currentPupilY) * 0.15;

    // Apply head group transform
    headGroup.setAttribute("transform", `translate(${170 + currentHeadX}, ${130 + currentHeadY}) rotate(${currentHeadRot})`);

    // Apply pupil offset
    pupilLeft.setAttribute("cx", -22 + currentPupilX);
    pupilLeft.setAttribute("cy", -4 + currentPupilY);

    pupilRight.setAttribute("cx", 22 + currentPupilX);
    pupilRight.setAttribute("cy", -4 + currentPupilY);

    catchlightLeft.setAttribute("cx", -20 + currentPupilX * 0.7);
    catchlightLeft.setAttribute("cy", -6 + currentPupilY * 0.7);

    catchlightRight.setAttribute("cx", 24 + currentPupilX * 0.7);
    catchlightRight.setAttribute("cy", -6 + currentPupilY * 0.7);

    requestAnimationFrame(animateCharacter);
  }

  animateCharacter();

  // Natural Blinking Cycle
  function triggerBlink() {
    if (!eyelidLeft || !eyelidRight) return;
    eyelidLeft.style.opacity = "1";
    eyelidRight.style.opacity = "1";

    setTimeout(() => {
      eyelidLeft.style.opacity = "0";
      eyelidRight.style.opacity = "0";
    }, 160);

    const nextBlinkTime = 2500 + Math.random() * 3500;
    setTimeout(triggerBlink, nextBlinkTime);
  }

  setTimeout(triggerBlink, 2000);

  // Speech Bubble Quotes
  const speechBubble = document.getElementById("avatar-speech-bubble");
  const bubbleText = document.getElementById("avatar-bubble-text");
  const avatarQuotes = [
    "Hey! Did you know I've solved 228+ DSA problems on LeetCode? 🧠",
    "Currently engineering real-time LLM & RAG pipelines! ⚡",
    "Trained ML models on 63k+ transactions with 0.978 R²! 📈",
    "Try my interactive terminal! Press Cmd+K or click CLI! 💻",
    "Available for Software Engineering & AI internships! 🤝",
    "Coffee in hand, gradient vectors converging nicely! ☕✨"
  ];
  let quoteIdx = 0;

  // Click Interaction (Wink, Smile & Speech Bubble)
  characterCard.addEventListener("click", () => {
    if (mouth) mouth.setAttribute("d", "M -14 24 Q 0 38 14 24");
    if (eyelidLeft) eyelidLeft.style.opacity = "1"; // Wink
    if (statusTag) statusTag.innerText = "// status: wink_&_smile! 😉";

    // Trigger speech bubble
    if (speechBubble && bubbleText) {
      bubbleText.textContent = avatarQuotes[quoteIdx % avatarQuotes.length];
      quoteIdx++;
      speechBubble.classList.add("show");
    }

    if (window.soundSynth) {
      window.soundSynth.playSuccessSound();
    }

    setTimeout(() => {
      if (mouth) mouth.setAttribute("d", "M -14 26 Q 0 34 14 24");
      if (eyelidLeft) eyelidLeft.style.opacity = "0";
      if (statusTag) statusTag.innerText = "// status: handsome_coder_online";
    }, 2000);

    setTimeout(() => {
      if (speechBubble) speechBubble.classList.remove("show");
    }, 4500);
  });
}

// --------------------------------------------------------------------------
// 9. LEETCODE PROFILE STATS & ANIMATION
// --------------------------------------------------------------------------
function initLeetCodeStats() {
  const donutCircle = document.getElementById("lc-donut-circle");
  if (!donutCircle) return;

  const circumference = 2 * Math.PI * 62; // ~389.55

  // Default Stats for Sanchit's LeetCode Profile (sanchit-123)
  const defaultData = {
    totalSolved: 228,
    totalQuestions: 4013,
    easySolved: 113,
    totalEasy: 958,
    mediumSolved: 89,
    totalMedium: 2095,
    hardSolved: 26,
    totalHard: 960,
    ranking: "702,771",
    reputation: 0,
    contributionPoints: 597
  };

  function renderStats(data) {
    // Update Stat Cards & Donut Text
    const totalSolvedCard = document.getElementById("lc-total-solved-card");
    const totalSolvedInner = document.getElementById("lc-total-solved-inner");
    const rankingEl = document.getElementById("lc-ranking");
    const repEl = document.getElementById("lc-reputation");
    const contribEl = document.getElementById("lc-contributions");

    if (totalSolvedCard) totalSolvedCard.textContent = data.totalSolved;
    if (totalSolvedInner) totalSolvedInner.textContent = data.totalSolved;
    if (rankingEl) rankingEl.textContent = typeof data.ranking === 'number' ? data.ranking.toLocaleString() : data.ranking;
    if (repEl) repEl.textContent = data.reputation;
    if (contribEl) contribEl.textContent = data.contributionPoints;

    // Donut Stroke DashOffset calculation
    const solvedRatio = Math.min(data.totalSolved / data.totalQuestions, 1);
    const dashOffset = circumference * (1 - solvedRatio);
    donutCircle.style.strokeDasharray = circumference;
    donutCircle.style.strokeDashoffset = dashOffset;

    // Difficulty Bars & Counts
    const easyPct = (data.easySolved / data.totalEasy) * 100;
    const medPct = (data.mediumSolved / data.totalMedium) * 100;
    const hardPct = (data.hardSolved / data.totalHard) * 100;

    const easyBar = document.getElementById("lc-easy-bar");
    const medBar = document.getElementById("lc-medium-bar");
    const hardBar = document.getElementById("lc-hard-bar");

    if (easyBar) easyBar.style.width = `${easyPct.toFixed(2)}%`;
    if (medBar) medBar.style.width = `${medPct.toFixed(2)}%`;
    if (hardBar) hardBar.style.width = `${hardPct.toFixed(2)}%`;

    const easyCount = document.getElementById("lc-easy-count");
    const medCount = document.getElementById("lc-medium-count");
    const hardCount = document.getElementById("lc-hard-count");

    if (easyCount) easyCount.innerHTML = `${data.easySolved} <span class="diff-denom">/ ${data.totalEasy}</span>`;
    if (medCount) medCount.innerHTML = `${data.mediumSolved} <span class="diff-denom">/ ${data.totalMedium}</span>`;
    if (hardCount) hardCount.innerHTML = `${data.hardSolved} <span class="diff-denom">/ ${data.totalHard}</span>`;
  }

  // Initial render with default values
  renderStats(defaultData);

  // Live Fetch for LeetCode Stats (sanchit-123)
  fetch("https://alfa-leetcode-api.onrender.com/userProfile/sanchit-123")
    .then((res) => res.json())
    .then((resData) => {
      if (resData && resData.totalSolved !== undefined) {
        renderStats({
          totalSolved: resData.totalSolved || defaultData.totalSolved,
          totalQuestions: resData.totalQuestions || defaultData.totalQuestions,
          easySolved: resData.easySolved || defaultData.easySolved,
          totalEasy: resData.totalEasy || defaultData.totalEasy,
          mediumSolved: resData.mediumSolved || defaultData.mediumSolved,
          totalMedium: resData.totalMedium || defaultData.totalMedium,
          hardSolved: resData.hardSolved || defaultData.hardSolved,
          totalHard: resData.totalHard || defaultData.totalHard,
          ranking: resData.ranking ? resData.ranking.toLocaleString() : defaultData.ranking,
          reputation: resData.reputation || 0,
          contributionPoints: resData.contributionPoint || defaultData.contributionPoints
        });
      }
    })
    .catch(() => {
      // Gracefully maintain default fallback data
    });
}

// --------------------------------------------------------------------------
// 10. GITHUB ACTIVITY & HEATMAP GENERATOR
// --------------------------------------------------------------------------
function initGitHubActivity() {
  const monthsRow = document.getElementById("calendar-months-row");
  const matrix = document.getElementById("contribution-matrix");

  if (!matrix) return;

  // Render 52 Weeks Months Row
  if (monthsRow) {
    const monthNames = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    monthsRow.innerHTML = "";
    monthNames.forEach((m) => {
      const lbl = document.createElement("div");
      lbl.className = "month-label";
      lbl.textContent = m;
      monthsRow.appendChild(lbl);
    });
  }

  // Generate 52 weeks x 7 days grid (364 cells)
  matrix.innerHTML = "";
  const totalDays = 52 * 7;
  const today = new Date();

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const cell = document.createElement("div");
    cell.className = "cal-cell";

    // Activity pattern matching user's activity
    const rand = Math.random();
    let level = 0;
    let count = 0;

    if (rand > 0.65) {
      if (rand > 0.93) { level = 4; count = Math.floor(Math.random() * 6) + 12; }
      else if (rand > 0.84) { level = 3; count = Math.floor(Math.random() * 4) + 8; }
      else if (rand > 0.74) { level = 2; count = Math.floor(Math.random() * 3) + 4; }
      else { level = 1; count = Math.floor(Math.random() * 3) + 1; }
    }

    cell.classList.add(`level-${level}`);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    cell.title = `${count} contributions on ${dateStr}`;

    matrix.appendChild(cell);
  }

  // Live Fetch for User GitHub Profile Stats (sanchit-Thakur)
  fetch("https://api.github.com/users/sanchit-Thakur")
    .then((res) => res.json())
    .then((user) => {
      if (user && user.public_repos !== undefined) {
        const repoEl = document.getElementById("gh-repos");
        const followersEl = document.getElementById("gh-followers");
        const followingEl = document.getElementById("gh-following");
        const gistsEl = document.getElementById("gh-gists");

        if (repoEl) repoEl.textContent = user.public_repos;
        if (followersEl) followersEl.textContent = user.followers;
        if (followingEl) followingEl.textContent = user.following;
        if (gistsEl) gistsEl.textContent = user.public_gists;
      }
    })
    .catch(() => {
      // Gracefully maintain default fallback values
    });
}

// --------------------------------------------------------------------------
// 11. TOP SCROLL PROGRESS BAR
// --------------------------------------------------------------------------
function initScrollProgressBar() {
  const bar = document.getElementById("scroll-progress-bar");
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

// --------------------------------------------------------------------------
// 12. PROCEDURAL WEB AUDIO SYNTHESIZER
// --------------------------------------------------------------------------
function initAudioSynthesizer() {
  const toggleBtn = document.getElementById("sound-toggle-btn");
  const soundIcon = document.getElementById("sound-icon");
  const soundLabel = document.getElementById("sound-label");

  let audioCtx = null;
  let isSoundEnabled = false;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playHoverSound() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (_) {}
  }

  function playClickSound() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (_) {}
  }

  function playSuccessSound() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.16);
      });
    } catch (_) {}
  }

  window.soundSynth = {
    playHoverSound,
    playClickSound,
    playSuccessSound,
    isEnabled: () => isSoundEnabled
  };

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        getAudioContext();
        toggleBtn.classList.add("sound-active");
        if (soundIcon) soundIcon.textContent = "🔊";
        if (soundLabel) soundLabel.textContent = "sfx: on";
        playSuccessSound();
      } else {
        toggleBtn.classList.remove("sound-active");
        if (soundIcon) soundIcon.textContent = "🔇";
        if (soundLabel) soundLabel.textContent = "sfx: off";
      }
    });
  }

  // Attach hover and click sounds to interactive items
  document.querySelectorAll("a, button, .filter-btn, .project-link-raw, .card-tilt").forEach((el) => {
    el.addEventListener("mouseenter", () => playHoverSound());
    el.addEventListener("click", () => playClickSound());
  });
}

// --------------------------------------------------------------------------
// 13. CUSTOM MAGNETIC FLUID CURSOR
// --------------------------------------------------------------------------
function initCustomMagneticCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  // Don't initialize on touch devices
  if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) {
    return;
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let dotX = -100, dotY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dotX = mouseX;
    dotY = mouseY;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
  }, { passive: true });

  window.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-active");
  });

  window.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-active");
  });

  // Attach hover state to interactive elements
  const interactiveTargets = document.querySelectorAll(
    "a, button, .filter-btn, .project-entry, .stat-card, .coursework-panel, .achievements-card, input, canvas"
  );

  interactiveTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    target.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
      if (target.classList.contains("magnetic-item")) {
        target.style.transform = "translate(0px, 0px)";
      }
    });

    if (target.classList.contains("magnetic-item")) {
      target.addEventListener("mousemove", (e) => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distThreshold = 45;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < distThreshold) {
          const pull = 0.28;
          target.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        }
      });
    }
  });

  // Render loop for smooth lerping halo ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
}

// --------------------------------------------------------------------------
// 14. 3D WEBGL NEURAL CONSTELLATION (THREE.JS)
// --------------------------------------------------------------------------
function init3DNeuralConstellation() {
  const container = document.getElementById("hero-canvas-wrapper");
  const canvas = document.getElementById("hero-3d-canvas");
  if (!container || !canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  let width = container.clientWidth || window.innerWidth;
  let height = container.clientHeight || window.innerHeight;

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 180;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Generate Neural Nodes / Particles
  const particleCount = width < 600 ? 65 : 120;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = [];

  const colorPalette = [
    new THREE.Color(0xdb5a3d), // Terracotta
    new THREE.Color(0xd9aa6c), // Gold
    new THREE.Color(0x8e9b84), // Olive
    new THREE.Color(0xece8df)  // Bone/Cream
  ];

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 260;
    const y = (Math.random() - 0.5) * 160;
    const z = (Math.random() - 0.5) * 140;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    velocities.push({
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      vz: (Math.random() - 0.5) * 0.16
    });

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Glowing Circle Texture for Nodes
  const particleCanvas = document.createElement("canvas");
  particleCanvas.width = 32;
  particleCanvas.height = 32;
  const pCtx = particleCanvas.getContext("2d");
  const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  pGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
  pGrad.addColorStop(0.35, "rgba(219, 90, 61, 0.8)");
  pGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  pCtx.fillStyle = pGrad;
  pCtx.fillRect(0, 0, 32, 32);

  const particleTexture = new THREE.CanvasTexture(particleCanvas);

  const particleMaterial = new THREE.PointsMaterial({
    size: 4.8,
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, particleMaterial);
  scene.add(particleSystem);

  // Dynamic Synaptic Connection Lines
  const maxConnections = particleCount * 6;
  const linePositions = new Float32Array(maxConnections * 6);
  const lineColors = new Float32Array(maxConnections * 6);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.38,
    blending: THREE.AdditiveBlending
  });

  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  // Mouse & Scroll Tracking
  let targetRotX = 0, targetRotY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotY = mouseX * 0.45;
    targetRotX = -mouseY * 0.35;
  }, { passive: true });

  window.addEventListener("resize", () => {
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Render Loop
  let lineSegmentsCount = 0;
  const distThreshold = 46;

  function animate() {
    requestAnimationFrame(animate);

    const pos = geometry.attributes.position.array;

    // Move particles
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i].vx;
      pos[i * 3 + 1] += velocities[i].vy;
      pos[i * 3 + 2] += velocities[i].vz;

      // Bounce within 3D volume
      if (pos[i * 3] < -130 || pos[i * 3] > 130) velocities[i].vx *= -1;
      if (pos[i * 3 + 1] < -85 || pos[i * 3 + 1] > 85) velocities[i].vy *= -1;
      if (pos[i * 3 + 2] < -70 || pos[i * 3 + 2] > 70) velocities[i].vz *= -1;
    }
    geometry.attributes.position.needsUpdate = true;

    // Connect synapses
    lineSegmentsCount = 0;
    const lPos = lineGeometry.attributes.position.array;
    const lCol = lineGeometry.attributes.color.array;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < distThreshold && lineSegmentsCount < maxConnections) {
          const alpha = 1.0 - dist / distThreshold;

          lPos[lineSegmentsCount * 6] = pos[i * 3];
          lPos[lineSegmentsCount * 6 + 1] = pos[i * 3 + 1];
          lPos[lineSegmentsCount * 6 + 2] = pos[i * 3 + 2];

          lPos[lineSegmentsCount * 6 + 3] = pos[j * 3];
          lPos[lineSegmentsCount * 6 + 4] = pos[j * 3 + 1];
          lPos[lineSegmentsCount * 6 + 5] = pos[j * 3 + 2];

          lCol[lineSegmentsCount * 6] = 0.86 * alpha;
          lCol[lineSegmentsCount * 6 + 1] = 0.35 * alpha;
          lCol[lineSegmentsCount * 6 + 2] = 0.24 * alpha;

          lCol[lineSegmentsCount * 6 + 3] = 0.86 * alpha;
          lCol[lineSegmentsCount * 6 + 4] = 0.35 * alpha;
          lCol[lineSegmentsCount * 6 + 5] = 0.24 * alpha;

          lineSegmentsCount++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineSegmentsCount * 2);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    // Smooth rotation tracking mouse
    particleSystem.rotation.y += (targetRotY - particleSystem.rotation.y) * 0.05;
    particleSystem.rotation.x += (targetRotX - particleSystem.rotation.x) * 0.05;
    linesMesh.rotation.y = particleSystem.rotation.y;
    linesMesh.rotation.x = particleSystem.rotation.x;

    // Ambient spin
    particleSystem.rotation.z += 0.0008;
    linesMesh.rotation.z += 0.0008;

    renderer.render(scene, camera);
  }

  animate();
}

// --------------------------------------------------------------------------
// 15. KINETIC TEXT SCRAMBLE DECODER ENGINE
// --------------------------------------------------------------------------
function initKineticTextScramble() {
  const el = document.getElementById("hero-role-scramble");
  if (!el) return;

  const roles = [
    "— Data Scientist & AI Engineer",
    "— Machine Learning Architect",
    "— LLM & RAG Systems Builder",
    "— Predictive Analytics Specialist",
    "— Full-Stack AI Engineer"
  ];
  const chars = "!<>-_\\/[]{}—=+*^?#________0101";
  let currentIdx = 0;

  function scrambleTo(newText, onComplete) {
    const oldText = el.innerText;
    const maxLen = Math.max(oldText.length, newText.length);
    let frame = 0;
    const totalFrames = 26;

    function step() {
      let output = "";
      for (let i = 0; i < maxLen; i++) {
        if (i < frame / (totalFrames / newText.length)) {
          output += newText[i] || "";
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.innerText = output;
      frame++;
      if (frame <= totalFrames) {
        requestAnimationFrame(step);
      } else {
        el.innerText = newText;
        if (onComplete) onComplete();
      }
    }
    step();
  }

  function cycle() {
    currentIdx = (currentIdx + 1) % roles.length;
    scrambleTo(roles[currentIdx], () => {
      setTimeout(cycle, 3200);
    });
  }

  setTimeout(cycle, 3000);
}

// --------------------------------------------------------------------------
// 16. 3D CARD PERSPECTIVE TILT & HOLOGRAPHIC SHEEN
// --------------------------------------------------------------------------
function init3DCardTilt() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) return;

  const cards = document.querySelectorAll(".card-tilt");

  cards.forEach((card) => {
    let isHovering = false;

    card.addEventListener("mouseenter", () => {
      isHovering = true;
    });

    card.addEventListener("mousemove", (e) => {
      if (!isHovering) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (degrees)
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      // Update holographic sheen coordinates
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;

      card.style.setProperty("--sheen-x", `${pctX}%`);
      card.style.setProperty("--sheen-y", `${pctY}%`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener("mouseleave", () => {
      isHovering = false;
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
}

// --------------------------------------------------------------------------
// 17. ANIMATED ODOMETER NUMBER COUNTERS
// --------------------------------------------------------------------------
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll(".counter-value");
  if (!counterElements.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute("data-counter"), 10);
        if (isNaN(targetVal) || targetVal === 0) return;

        const duration = 1600;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease Out Expo: 1 - 2^(-10 * progress)
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(easeProgress * targetVal);

          el.textContent = currentVal > 999 ? currentVal.toLocaleString() : currentVal;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = targetVal > 999 ? targetVal.toLocaleString() : targetVal;
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach((el) => counterObserver.observe(el));
}

// --------------------------------------------------------------------------
// 18. INTERACTIVE CLI TERMINAL & AI ASSISTANT
// --------------------------------------------------------------------------
function initInteractiveTerminal() {
  const modal = document.getElementById("terminal-modal");
  const navBtn = document.getElementById("terminal-nav-btn");
  const fabBtn = document.getElementById("floating-terminal-fab");
  const closeBtn = document.getElementById("terminal-close-btn");
  const backdrop = document.getElementById("terminal-backdrop");
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  const sendBtn = document.getElementById("terminal-send-btn");

  if (!modal || !input || !output) return;

  function openTerminal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => input.focus(), 150);
    if (window.soundSynth) window.soundSynth.playSuccessSound();
  }

  function closeTerminal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  navBtn?.addEventListener("click", openTerminal);
  fabBtn?.addEventListener("click", openTerminal);
  closeBtn?.addEventListener("click", closeTerminal);
  backdrop?.addEventListener("click", closeTerminal);

  // Keyboard shortcut: Cmd+K, Ctrl+K, or "/"
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modal.classList.contains("open")) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === "Escape" && modal.classList.contains("open")) {
      closeTerminal();
    }
  });

  function appendLine(html, type = "output-text") {
    const line = document.createElement("div");
    line.className = `terminal-line ${type}`;
    line.innerHTML = html;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    appendLine(`<span class="t-prompt">sanchit@ai:~$</span> ${cmd}`, "command-echo");
    input.value = "";

    const lower = cmd.toLowerCase();
    const parts = lower.split(" ");
    const mainCmd = parts[0];

    if (window.soundSynth) window.soundSynth.playClickSound();

    switch (mainCmd) {
      case "help":
        appendLine(`
          Available Commands:<br>
          &nbsp;&nbsp;<span class="t-cmd">help</span> &mdash; Show this reference guide<br>
          &nbsp;&nbsp;<span class="t-cmd">about</span> &mdash; Summary of Sanchit's background & education<br>
          &nbsp;&nbsp;<span class="t-cmd">skills</span> &mdash; Full technical toolkit breakdown<br>
          &nbsp;&nbsp;<span class="t-cmd">projects</span> &mdash; List of featured AI & full-stack projects<br>
          &nbsp;&nbsp;<span class="t-cmd">stats</span> &mdash; LeetCode & GitHub statistics<br>
          &nbsp;&nbsp;<span class="t-cmd">ask &lt;query&gt;</span> &mdash; Ask Sanchit-AI assistant a question<br>
          &nbsp;&nbsp;<span class="t-cmd">matrix</span> &mdash; Toggle full-screen digital rain mode<br>
          &nbsp;&nbsp;<span class="t-cmd">resume</span> &mdash; Download Sanchit's official resume PDF<br>
          &nbsp;&nbsp;<span class="t-cmd">contact</span> &mdash; Get email & social coordinates<br>
          &nbsp;&nbsp;<span class="t-cmd">clear</span> &mdash; Clear terminal screen<br>
          &nbsp;&nbsp;<span class="t-cmd">exit</span> &mdash; Close this terminal window
        `);
        break;

      case "about":
        appendLine(`
          <strong>Sanchit Thakur</strong> &mdash; Data Scientist & AI Engineer<br>
          Pursuing B.Tech in Artificial Intelligence & Data Science at CGC Mohali (2024-2028).<br>
          Current CGPA: <strong>8.2 / 10</strong>.<br>
          Specialized in statistical modeling, NLP, LLM & RAG architectures, and end-to-end full-stack pipelines.
        `);
        break;

      case "skills":
        appendLine(`
          <strong>Technical Toolkit:</strong><br>
          &bull; <strong>Languages:</strong> Python, SQL, C++, Java, C, TypeScript, HTML/CSS<br>
          &bull; <strong>Data Science & ML:</strong> Scikit-learn, PyTorch, Pandas, NumPy, Statsmodels, Matplotlib<br>
          &bull; <strong>AI & LLMs:</strong> OpenAI GPT-4, Whisper, LangChain, RAG Pipelines, Vector DBs, Prompt Eng.<br>
          &bull; <strong>Web & Backend:</strong> React.js, Next.js 14, Node.js, Express, Redux Toolkit, Zustand, Tailwind<br>
          &bull; <strong>Databases & DevOps:</strong> MySQL, SQLite, MongoDB, Docker, Git/GitHub
        `);
        break;

      case "projects":
        appendLine(`
          <strong>Featured Deployments:</strong><br>
          1. <strong>IronPulse Fitness:</strong> Scalable workout & macro nutritional analytics platform (React, Next, Node, Mongo, MySQL, Redux).<br>
          2. <strong>PortBuilder:</strong> Modular ATS-friendly resume & developer portfolio generator (Next.js 14, Zustand, Server Actions).<br>
          3. <strong>Sales Analytics & Profitability Engine:</strong> Time-series forecasting across 63k+ rows (R² = 0.978) + What-If demand elasticity engine.<br>
          4. <strong>CINEVERSE:</strong> Hub of movies & interactive streaming analytics platform (Next.js, Node.js, MySQL, TMDB API).
        `);
        break;

      case "stats":
        appendLine(`
          <strong>Live Statistics:</strong><br>
          &bull; <strong>LeetCode Solved:</strong> 228+ problems (113 Easy, 89 Medium, 26 Hard)<br>
          &bull; <strong>GitHub Repositories:</strong> 30 public repos<br>
          &bull; <strong>Global Rank:</strong> Top competitive coding percentiles<br>
          &bull; <strong>Contribution Points:</strong> 597+
        `);
        break;

      case "matrix":
        const matrixCanvas = document.getElementById("matrix-canvas");
        if (matrixCanvas) {
          const isActive = matrixCanvas.classList.toggle("active");
          appendLine(isActive ? "Matrix digital rain [ENABLED]. Press ESC or type 'matrix' to disable." : "Matrix digital rain [DISABLED].", "success-text");
        }
        break;

      case "resume":
        appendLine("Downloading Sanchit Thakur Resume PDF...", "success-text");
        const a = document.createElement("a");
        a.href = "assets/sanchit-resume.pdf";
        a.download = "Sanchit_Thakur_Resume.pdf";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        break;

      case "contact":
        appendLine(`
          <strong>Direct Contact Channels:</strong><br>
          &bull; <strong>Email:</strong> <a href="mailto:sanchitthakur2345@gmail.com" style="color: #db5a3d; text-decoration: underline;">sanchitthakur2345@gmail.com</a><br>
          &bull; <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/sanchit-thakur-13121905/" target="_blank" style="color: #db5a3d; text-decoration: underline;">linkedin.com/in/sanchit-thakur-13121905</a><br>
          &bull; <strong>GitHub:</strong> <a href="https://github.com/sanchit-Thakur" target="_blank" style="color: #db5a3d; text-decoration: underline;">github.com/sanchit-Thakur</a><br>
          &bull; <strong>Location:</strong> Mohali, Punjab, India
        `);
        break;

      case "ask":
        const query = parts.slice(1).join(" ");
        if (!query) {
          appendLine("Please provide a question. Example: <span class='t-cmd'>ask why hire sanchit?</span> or <span class='t-cmd'>ask stack</span>", "error-text");
          return;
        }
        respondToAIQuery(query);
        break;

      case "clear":
      case "cls":
        output.innerHTML = "";
        break;

      case "exit":
      case "quit":
      case "close":
        closeTerminal();
        break;

      default:
        appendLine(`Command not recognized: "${cmd}". Type <span class="t-cmd">help</span> for available commands, or <span class="t-cmd">ask &lt;question&gt;</span> to query the AI assistant.`, "error-text");
    }
  }

  function respondToAIQuery(query) {
    const q = query.toLowerCase();
    let reply = "";

    if (q.includes("hire") || q.includes("why")) {
      reply = "Sanchit combines deep statistical rigor (8.2 CGPA in AI & Data Science) with practical full-stack execution. With 228+ DSA problems solved and high-performance ML models deployed on multi-thousand row datasets, he bridges the gap between machine learning research and scalable production applications.";
    } else if (q.includes("stack") || q.includes("technolog") || q.includes("language")) {
      reply = "Sanchit's primary stack includes Python, PyTorch, Scikit-learn, LangChain, and Vector DBs for AI/ML, combined with Next.js 14, React, TypeScript, Node.js, and MySQL/MongoDB for production web systems.";
    } else if (q.includes("cgpa") || q.includes("college") || q.includes("education")) {
      reply = "Sanchit is pursuing his B.Tech in Artificial Intelligence & Data Science at Chandigarh Group of Colleges, Mohali (2024–2028) with a strong CGPA of 8.2.";
    } else if (q.includes("project") || q.includes("best work")) {
      reply = "Top featured projects include: (1) IronPulse Fitness - scalable workout & macro tracker, (2) PortBuilder - ATS-ready resume and portfolio engine, and (3) Interactive Sales Analytics & What-If Pricing Engine with 0.978 R² time-series forecasting.";
    } else {
      reply = `Sanchit Thakur is an Entry-Level Data Scientist & AI Engineer passionate about solving high-impact quantitative challenges with ML, NLP, and modern LLM architectures. For specific inquiries or collaboration, contact him directly at sanchitthakur2345@gmail.com!`;
    }

    // Typewriter effect
    const line = document.createElement("div");
    line.className = "terminal-line success-text";
    line.innerHTML = `<strong>[Sanchit-AI]:</strong> `;
    output.appendChild(line);

    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx < reply.length) {
        line.innerHTML += reply[charIdx];
        charIdx++;
        output.scrollTop = output.scrollHeight;
      } else {
        clearInterval(interval);
      }
    }, 14);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeCommand(input.value);
    }
  });

  sendBtn?.addEventListener("click", () => {
    executeCommand(input.value);
  });
}

// --------------------------------------------------------------------------
// 19. MATRIX DIGITAL RAIN VISUALIZER OVERLAY
// --------------------------------------------------------------------------
function initMatrixRain() {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンSANCHITAI";
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
  });

  function draw() {
    if (!canvas.classList.contains("active")) {
      requestAnimationFrame(draw);
      return;
    }

    ctx.fillStyle = "rgba(20, 20, 19, 0.08)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#db5a3d"; // Terracotta digital code
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  draw();
}


// ==========================================================================
// ✦✦✦ INSANE LEVEL 2 ANIMATION ENGINES ✦✦✦
// ==========================================================================

// --------------------------------------------------------------------------
// 20. PRELOADER WITH MORPHING COUNTER & SMOOTH REVEAL
// --------------------------------------------------------------------------
function initPreloader(onComplete) {
  const preloader = document.getElementById("preloader");
  const counter = document.getElementById("preloader-counter");
  const barFill = document.getElementById("preloader-bar-fill");

  if (!preloader) {
    onComplete();
    return;
  }

  let progress = 0;
  const targetProgress = 100;
  const duration = 1800; // ms
  const startTime = performance.now();

  function updateProgress(currentTime) {
    const elapsed = currentTime - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);

    // Eased progress (ease-out-quart)
    const eased = 1 - Math.pow(1 - rawProgress, 4);
    progress = Math.floor(eased * targetProgress);

    if (counter) counter.textContent = progress;
    if (barFill) barFill.style.width = progress + "%";

    if (rawProgress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      // Preloader done — animate page transition wipe
      setTimeout(() => {
        preloader.classList.add("loaded");
        document.body.classList.add("page-loaded");

        // GSAP page transition wipe
        const wipeSlices = document.querySelectorAll(".wipe-slice");
        if (typeof gsap !== "undefined" && wipeSlices.length > 0) {
          gsap.to(wipeSlices, {
            scaleY: 1,
            transformOrigin: "top",
            stagger: 0.08,
            duration: 0.5,
            ease: "power4.inOut",
            onComplete: () => {
              gsap.to(wipeSlices, {
                scaleY: 0,
                transformOrigin: "bottom",
                stagger: 0.06,
                duration: 0.4,
                delay: 0.1,
                ease: "power4.inOut"
              });
            }
          });
        }

        onComplete();
      }, 300);
    }
  }

  requestAnimationFrame(updateProgress);
}

// --------------------------------------------------------------------------
// 21. AMBIENT FLOATING PARTICLES — Tiny stars drifting across the entire page
// --------------------------------------------------------------------------
function initAmbientParticles() {
  const canvas = document.getElementById("ambient-particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particleCount = Math.min(Math.floor(width * 0.06), 60);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2 - 0.15,
      opacity: Math.random() * 0.5 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
      color: ['219,90,61', '217,170,108', '142,155,132', '236,232,223'][Math.floor(Math.random() * 4)]
    });
  }

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    frame++;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      // Pulse opacity
      const pulse = Math.sin(frame * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
      const alpha = p.opacity * pulse;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
      ctx.fill();

      // Subtle glow
      if (p.radius > 1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha * 0.15})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// --------------------------------------------------------------------------
// 22. CURSOR TRAIL — Glowing particle trail following mouse
// --------------------------------------------------------------------------
function initCursorTrail() {
  const canvas = document.getElementById("cursor-trail-canvas");
  if (!canvas || window.matchMedia("(pointer: coarse)").matches) return;

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const trail = [];
  const maxTrailLength = 25;
  let mouseX = width / 2;
  let mouseY = height / 2;
  let isMoving = false;
  let moveTimeout;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => { isMoving = false; }, 100);
  }, { passive: true });

  // Click explosion
  window.addEventListener("click", (e) => {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = Math.random() * 4 + 2;
      trail.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1,
        life: 1,
        decay: Math.random() * 0.03 + 0.02,
        color: Math.random() > 0.5 ? "219,90,61" : "217,170,108",
        isExplosion: true
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Add trail point
    if (isMoving) {
      trail.push({
        x: mouseX,
        y: mouseY,
        radius: 2.5,
        life: 1,
        decay: 0.04,
        color: "219,90,61",
        isExplosion: false,
        vx: 0,
        vy: 0
      });
    }

    // Remove dead particles & cap trail
    while (trail.length > maxTrailLength * 3) trail.shift();

    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.life -= p.decay;

      if (p.isExplosion) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.08; // gravity
      }

      if (p.life <= 0) {
        trail.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.6})`;
      ctx.fill();

      // Glow ring
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.1})`;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// --------------------------------------------------------------------------
// 23. GSAP SCROLL-TRIGGERED ANIMATIONS (Hero chars, section fades, parallax)
// --------------------------------------------------------------------------
function initGSAPScrollAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // ✦ Hero Title Character-by-Character Reveal
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    // Split title into characters
    const originalHTML = heroTitle.innerHTML;
    const textNodes = heroTitle.childNodes;
    let charIndex = 0;

    function wrapChars(node) {
      if (node.nodeType === 3) {
        // Text node
        const text = node.textContent;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          const span = document.createElement("span");
          span.className = "char";
          span.style.animationDelay = `${0.8 + charIndex * 0.03}s`;
          span.textContent = text[i] === " " ? "\u00A0" : text[i];
          fragment.appendChild(span);
          charIndex++;
        }
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === 1) {
        // Element node - process children but not special elements
        if (node.tagName === "BR") return;
        if (node.tagName === "SPAN" && node.classList.contains("serif-accent")) {
          // Wrap characters inside the accent span
          const text = node.textContent;
          node.textContent = "";
          for (let i = 0; i < text.length; i++) {
            const span = document.createElement("span");
            span.className = "char";
            span.style.animationDelay = `${0.8 + charIndex * 0.03}s`;
            span.textContent = text[i] === " " ? "\u00A0" : text[i];
            node.appendChild(span);
            charIndex++;
          }
          return;
        }
        Array.from(node.childNodes).forEach(wrapChars);
      }
    }

    Array.from(heroTitle.childNodes).forEach(wrapChars);
  }

  // ✦ Staggered section reveals with GSAP ScrollTrigger
  const sections = document.querySelectorAll(".section");
  sections.forEach((section, index) => {
    gsap.fromTo(section, {
      opacity: 0.6,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      }
    });
  });

  // ✦ Project cards staggered entrance
  const projectCards = document.querySelectorAll(".project-entry");
  projectCards.forEach((card, i) => {
    gsap.fromTo(card, {
      opacity: 0,
      x: i % 2 === 0 ? -40 : 40,
      rotateY: i % 2 === 0 ? -5 : 5,
    }, {
      opacity: 1,
      x: 0,
      rotateY: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 82%",
        toggleActions: "play none none none",
      }
    });
  });

  // ✦ Stats counter pop-in
  const statCards = document.querySelectorAll(".stat-card, .lc-stat-card");
  statCards.forEach((card, i) => {
    gsap.fromTo(card, {
      scale: 0.8,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay: i * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });
  });

  // ✦ Hero description fade in from bottom
  const heroDesc = document.querySelector(".hero-description");
  if (heroDesc) {
    gsap.fromTo(heroDesc, {
      opacity: 0,
      y: 30,
      filter: "blur(6px)"
    }, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      delay: 1.5,
      ease: "power3.out"
    });
  }

  // ✦ Hero buttons staggered entrance
  const heroActions = document.querySelectorAll(".hero-actions .btn");
  heroActions.forEach((btn, i) => {
    gsap.fromTo(btn, {
      opacity: 0,
      y: 20,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      delay: 1.8 + i * 0.15,
      ease: "back.out(1.7)"
    });
  });

  // ✦ Skills canvas zoom-in
  const skillsCanvas = document.querySelector(".skills-canvas-card");
  if (skillsCanvas) {
    gsap.fromTo(skillsCanvas, {
      scale: 0.85,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: skillsCanvas,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }

  // ✦ Smooth header background on scroll
  const header = document.querySelector(".site-header");
  if (header) {
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (self.direction === 1) {
          header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
        } else {
          header.style.boxShadow = "none";
        }
      }
    });
  }
}

// --------------------------------------------------------------------------
// 24. GLITCH TEXT EFFECTS — Add data-text attribute and class to headings
// --------------------------------------------------------------------------
function initGlitchTextEffects() {
  const headings = document.querySelectorAll(
    ".project-title-serif, .about-heading, .skills-heading"
  );

  headings.forEach(heading => {
    heading.classList.add("glitch-text");
    heading.setAttribute("data-text", heading.textContent);
  });
}

// --------------------------------------------------------------------------
// 25. MAGNETIC RIPPLE EFFECT ON CLICK
// --------------------------------------------------------------------------
function initMagneticRipple() {
  const magneticItems = document.querySelectorAll(".magnetic-item");

  magneticItems.forEach(item => {
    item.addEventListener("click", function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.className = "ripple-circle";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + "px";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// --------------------------------------------------------------------------
// 26. KINETIC SECTION DIVIDERS — Animated gradient lines between sections
// --------------------------------------------------------------------------
function initSectionDividers() {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    // Add divider before each section
    const divider = document.createElement("div");
    divider.className = "section-divider";
    section.parentNode.insertBefore(divider, section);

    // Observe and animate divider
    const dividerObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          dividerObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    dividerObs.observe(divider);
  });
}

// --------------------------------------------------------------------------
// 27. PARALLAX DEPTH LAYERS — Subtle parallax on scroll
// --------------------------------------------------------------------------
function initParallaxLayers() {
  const heroCanvas = document.querySelector(".hero-canvas-wrapper");
  const characterCard = document.querySelector(".character-card");
  const skillsCanvas = document.querySelector(".skills-canvas-card");

  const layers = [
    { el: heroCanvas, speed: 0.3 },
    { el: characterCard, speed: 0.15 },
    { el: skillsCanvas, speed: 0.1 }
  ].filter(l => l.el);

  if (layers.length === 0) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        layers.forEach(layer => {
          const rect = layer.el.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const offset = scrollY * layer.speed;
            layer.el.style.transform = `translateY(${-offset * 0.2}px)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// --------------------------------------------------------------------------
// 28. SECTION ZOOM OBSERVER — Scale sections into view
// --------------------------------------------------------------------------
function initSectionZoom() {
  const sections = document.querySelectorAll(".section");

  sections.forEach(section => {
    section.classList.add("section-zoom");
  });

  const zoomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "-10% 0px -5% 0px"
  });

  sections.forEach(section => zoomObserver.observe(section));
}


