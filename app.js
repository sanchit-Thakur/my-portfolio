/**
 * ==========================================================================
 * SANCHIT THAKUR PORTFOLIO ENGINE (app.js)
 * Clean, lightweight vanilla script for reveals, navigation, email copying,
 * interactive 2D physics floating skill balls, and Three.js 3D character avatar.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveals();
  initActiveNavObserver();
  initMobileMenu();
  initCopyEmail();
  initBackToTop();
  updateCurrentYear();
  initSkillsCanvas();
  initHandsomeCoderAvatar();
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
    { name: "C", category: "languages", color: "#db5a3d", categoryName: "Language" },
    { name: "Java", category: "languages", color: "#db5a3d", categoryName: "Language" },
    { name: "HTML / CSS", category: "languages", color: "#db5a3d", categoryName: "Language" },

    // Data Science (Olive #8e9b84)
    { name: "NumPy & Pandas", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Scikit-learn", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Matplotlib", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Data Cleaning", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "EDA", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },
    { name: "Statistical Analysis", category: "datascience", color: "#8e9b84", categoryName: "Data Science" },

    // Frameworks (Gold #d9aa6c)
    { name: "React.js", category: "frameworks", color: "#d9aa6c", categoryName: "Framework" },
    { name: "Next.js", category: "frameworks", color: "#d9aa6c", categoryName: "Framework" },
    { name: "Node.js", category: "frameworks", color: "#d9aa6c", categoryName: "Framework" },

    // Databases & Tools (Bone Cream #ece8df)
    { name: "MySQL", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
    { name: "Vector Embeddings", category: "tools", color: "#ece8df", categoryName: "Database & Tool" },
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

  // Click Interaction (Wink & Smile)
  characterCard.addEventListener("click", () => {
    if (mouth) mouth.setAttribute("d", "M -14 24 Q 0 38 14 24");
    if (eyelidLeft) eyelidLeft.style.opacity = "1"; // Wink
    if (statusTag) statusTag.innerText = "// status: wink_&_smile! 😉";

    setTimeout(() => {
      if (mouth) mouth.setAttribute("d", "M -14 26 Q 0 34 14 24");
      if (eyelidLeft) eyelidLeft.style.opacity = "0";
      if (statusTag) statusTag.innerText = "// status: handsome_coder_online";
    }, 2000);
  });
}
