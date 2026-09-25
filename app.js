/**
 * ==========================================================================
 * SANCHIT THAKUR — NEXT-GEN PORTFOLIO ENGINE (app.js)
 * High-performance 3D Neural Constellation, Card Spotlight, 3D Tilt,
 * Theme Switcher, LeetCode / GitHub Visualizer, Audio Synthesizer & CLI
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Preloader
  initPreloader(() => {
    // 2. Core Interactive Systems
    initThemeSwitcher();
    initScrollReveals();
    initActiveNav();
    initMobileMenu();
    initSpotlightEffect();
    init3DCardTilt();
    initProjectFilters();
    initSkillsSystem();
    initHandsomeCoderAvatar();
    initLeetCodeStats();
    initGitHubHeatmap();
    initCopyEmail();
    initBackToTop();
    initCustomCursor();

    // 3. Audio & 3D Visual Engines
    initAudioSynthesizer();
    init3DConstellation();
    initKineticRoleScramble();
    initTerminalCLI();
    initMatrixRain();
  });
});

/* --------------------------------------------------------------------------
   1. PRELOADER
   -------------------------------------------------------------------------- */
function initPreloader(onComplete) {
  const preloader = document.getElementById("preloader");
  const counter = document.getElementById("preloader-counter");
  const barFill = document.getElementById("preloader-bar-fill");

  if (!preloader) {
    if (onComplete) onComplete();
    return;
  }

  let progress = 0;
  const duration = 1200; // Snappy 1.2s load
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const factor = Math.min(elapsed / duration, 1);
    // Exponential ease out
    const eased = factor === 1 ? 1 : 1 - Math.pow(2, -10 * factor);
    progress = Math.floor(eased * 100);

    if (counter) counter.textContent = progress;
    if (barFill) barFill.style.width = progress + "%";

    if (factor < 1) {
      requestAnimationFrame(update);
    } else {
      setTimeout(() => {
        preloader.classList.add("loaded");
        if (onComplete) onComplete();
      }, 150);
    }
  }

  requestAnimationFrame(update);
}

/* --------------------------------------------------------------------------
   2. MULTI-THEME SWITCHER ENGINE
   -------------------------------------------------------------------------- */
const THEMES = {
  emerald: { name: "Emerald", color: "#00f5a0", threeColor: 0x00f5a0 },
  cyber: { name: "Cyber", color: "#00f2fe", threeColor: 0x00f2fe },
  aurora: { name: "Aurora", color: "#c084fc", threeColor: 0xc084fc },
  terracotta: { name: "Ember", color: "#f06030", threeColor: 0xf06030 }
};

let currentTheme = localStorage.getItem("sanchit_theme") || "emerald";

function initThemeSwitcher() {
  const themeBtn = document.getElementById("theme-btn");
  const themeDropdown = document.getElementById("theme-dropdown");
  const themeNameLabel = document.getElementById("current-theme-name");
  const themeOptions = document.querySelectorAll(".theme-option");
  const htmlEl = document.documentElement;

  // Apply initial theme
  setTheme(currentTheme);

  if (themeBtn && themeDropdown) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = themeBtn.closest(".theme-switcher-wrapper");
      if (parent) parent.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".theme-switcher-wrapper")) {
        const parent = document.querySelector(".theme-switcher-wrapper");
        if (parent) parent.classList.remove("open");
      }
    });
  }

  themeOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      const themeKey = opt.getAttribute("data-set-theme");
      if (themeKey && THEMES[themeKey]) {
        setTheme(themeKey);
        const parent = document.querySelector(".theme-switcher-wrapper");
        if (parent) parent.classList.remove("open");
      }
    });
  });

  function setTheme(themeKey) {
    currentTheme = themeKey;
    htmlEl.setAttribute("data-theme", themeKey);
    localStorage.setItem("sanchit_theme", themeKey);

    if (themeNameLabel && THEMES[themeKey]) {
      themeNameLabel.textContent = THEMES[themeKey].name;
    }

    themeOptions.forEach((opt) => {
      if (opt.getAttribute("data-set-theme") === themeKey) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });

    // Update Three.js constellation if active
    if (window.updateConstellationTheme) {
      window.updateConstellationTheme(THEMES[themeKey].threeColor);
    }
  }
}

/* --------------------------------------------------------------------------
   3. CARD SPOTLIGHT HOVER EFFECT (Dynamic Radial Mouse Tracking)
   -------------------------------------------------------------------------- */
function initSpotlightEffect() {
  const cards = document.querySelectorAll(".spotlight-card, .cinematic-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   4. 3D CARD TILT EFFECT (Physics-Based Sheen & Rotation)
   -------------------------------------------------------------------------- */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll("[data-tilt]");

  tiltCards.forEach((card) => {
    let bounds;

    function rotateToMouse(e) {
      bounds = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };

      const maxRotate = 7; // Gentle premium tilt
      const rotateX = (center.y / (bounds.height / 2)) * -maxRotate;
      const rotateY = (center.x / (bounds.width / 2)) * maxRotate;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    }

    card.addEventListener("mouseenter", () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = "transform 0.1s ease-out";
    });

    card.addEventListener("mousemove", rotateToMouse);

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/* --------------------------------------------------------------------------
   5. PROJECT CATEGORY FILTER TABS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const tabs = document.querySelectorAll(".project-filter-tabs .p-tab");
  const cards = document.querySelectorAll(".cinematic-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        if (filter === "all" || category.includes(filter)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
          }, 20);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px) scale(0.98)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. SKILLS SYSTEM (BENTO CARDS & 2D PHYSICS BALLS CANVAS)
   -------------------------------------------------------------------------- */
function initSkillsSystem() {
  const viewCardsBtn = document.getElementById("view-cards-btn");
  const viewPhysicsBtn = document.getElementById("view-physics-btn");
  const bentoView = document.getElementById("skills-bento-view");
  const physicsView = document.getElementById("skills-physics-view");

  if (!viewCardsBtn || !viewPhysicsBtn) return;

  viewCardsBtn.addEventListener("click", () => {
    viewCardsBtn.classList.add("active");
    viewPhysicsBtn.classList.remove("active");
    bentoView.style.display = "grid";
    physicsView.style.display = "none";
  });

  viewPhysicsBtn.addEventListener("click", () => {
    viewPhysicsBtn.classList.add("active");
    viewCardsBtn.classList.remove("active");
    bentoView.style.display = "none";
    physicsView.style.display = "block";
    startPhysicsCanvas();
  });

  let physicsStarted = false;
  function startPhysicsCanvas() {
    if (physicsStarted) return;
    physicsStarted = true;
    init2DPhysicsCanvas();
  }
}

function init2DPhysicsCanvas() {
  const canvas = document.getElementById("skills-canvas");
  const container = document.getElementById("skills-canvas-container");
  const resetBtn = document.getElementById("reset-balls-btn");
  const filterBtns = document.querySelectorAll(".skills-filter-bar .filter-btn");

  if (!canvas || !container) return;

  const ctx = canvas.getContext("2d");
  let width = container.clientWidth;
  let height = container.clientHeight;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener("resize", resize);

  const SKILLS_DATA = [
    { name: "Python", cat: "languages", color: "#00f5a0" },
    { name: "SQL", cat: "languages", color: "#00f5a0" },
    { name: "C++", cat: "languages", color: "#00f5a0" },
    { name: "TypeScript", cat: "languages", color: "#00f5a0" },
    { name: "Scikit-learn", cat: "datascience", color: "#00d2ff" },
    { name: "PyTorch", cat: "datascience", color: "#00d2ff" },
    { name: "Pandas", cat: "datascience", color: "#00d2ff" },
    { name: "NumPy", cat: "datascience", color: "#00d2ff" },
    { name: "Statsmodels", cat: "datascience", color: "#00d2ff" },
    { name: "GPT-4 / LLMs", cat: "frameworks", color: "#ffbd2e" },
    { name: "RAG Pipelines", cat: "frameworks", color: "#ffbd2e" },
    { name: "LangChain", cat: "frameworks", color: "#ffbd2e" },
    { name: "Whisper", cat: "frameworks", color: "#ffbd2e" },
    { name: "Next.js 14", cat: "frameworks", color: "#ffbd2e" },
    { name: "React.js", cat: "frameworks", color: "#ffbd2e" },
    { name: "MySQL", cat: "tools", color: "#c084fc" },
    { name: "MongoDB", cat: "tools", color: "#c084fc" },
    { name: "Docker", cat: "tools", color: "#c084fc" },
    { name: "Git / GitHub", cat: "tools", color: "#c084fc" }
  ];

  class Orb {
    constructor(data, idx) {
      this.name = data.name;
      this.cat = data.cat;
      this.color = data.color;
      this.radius = 32 + Math.min(this.name.length * 1.5, 14);
      this.x = 60 + (idx % 5) * 80 + Math.random() * 20;
      this.y = 50 + Math.floor(idx / 5) * 60;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = Math.random() * 1.2;
    }

    update() {
      this.vy += 0.12; // Gravity
      this.x += this.vx;
      this.y += this.vy;

      // Friction
      this.vx *= 0.99;
      this.vy *= 0.99;

      // Boundary collisions
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx *= -0.7;
      }
      if (this.x + this.radius > width) {
        this.x = width - this.radius;
        this.vx *= -0.7;
      }
      if (this.y + this.radius > height - 10) {
        this.y = height - 10 - this.radius;
        this.vy *= -0.65;
        this.vx *= 0.95;
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(13, 20, 24, 0.85)";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = this.color;
      ctx.stroke();

      ctx.font = "600 11px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.name, this.x, this.y);
      ctx.restore();
    }
  }

  const orbs = SKILLS_DATA.map((d, i) => new Orb(d, i));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < orbs.length; i++) {
      orbs[i].update();
      orbs[i].draw();
    }

    requestAnimationFrame(animate);
  }
  animate();

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      orbs.forEach((orb) => {
        orb.y = 50 + Math.random() * 60;
        orb.vy = (Math.random() - 0.5) * 3;
        orb.vx = (Math.random() - 0.5) * 4;
      });
    });
  }
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE CODER AVATAR (Cursor Tracking Head & Dynamic Quotes)
   -------------------------------------------------------------------------- */
function initHandsomeCoderAvatar() {
  const headGroup = document.getElementById("character-head-group");
  const avatarCard = document.getElementById("character-card");
  const speechBubble = document.getElementById("avatar-speech-bubble");
  const bubbleText = document.getElementById("avatar-bubble-text");
  const pupilLeft = document.getElementById("pupil-left");
  const pupilRight = document.getElementById("pupil-right");

  if (!headGroup || !avatarCard) return;

  const QUOTES = [
    "Exploring LLM RAG pipelines & Vector embeddings!",
    "Achieved 0.978 R² on time-series predictive modeling!",
    "248+ LeetCode problems solved & counting! 💻",
    "Open for Software Engineering & AI Internships!",
    "Let's build intelligent, scalable systems together! 🚀"
  ];
  let quoteIdx = 0;

  avatarCard.addEventListener("click", () => {
    quoteIdx = (quoteIdx + 1) % QUOTES.length;
    if (bubbleText) {
      bubbleText.textContent = QUOTES[quoteIdx];
      speechBubble.style.transform = "scale(1.05)";
      setTimeout(() => {
        speechBubble.style.transform = "scale(1)";
      }, 150);
    }
  });

  window.addEventListener("mousemove", (e) => {
    const rect = avatarCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

    const rotZ = deltaX * 12;
    const rotX = -deltaY * 8;
    const transX = deltaX * 10;
    const transY = deltaY * 6;

    headGroup.setAttribute(
      "transform",
      `translate(${170 + transX}, ${130 + transY}) rotate(${rotZ})`
    );

    // Subtle pupil tracking
    if (pupilLeft && pupilRight) {
      pupilLeft.setAttribute("cx", -22 + deltaX * 4);
      pupilLeft.setAttribute("cy", -4 + deltaY * 4);
      pupilRight.setAttribute("cx", 22 + deltaX * 4);
      pupilRight.setAttribute("cy", -4 + deltaY * 4);
    }
  });
}

/* --------------------------------------------------------------------------
   8. LEETCODE STATS COUNTER, CIRCULAR DONUT ANIMATION & LIVE SYNC
   -------------------------------------------------------------------------- */
function initLeetCodeStats() {
  const donutCircle = document.getElementById("lc-donut-circle");
  if (!donutCircle) return;

  // Total circumference ~ 2 * PI * 62 = 389.5
  // Total solved: 248 / 4060 -> fraction ~ 0.06108
  const totalCircumference = 389.5;
  const targetOffset = totalCircumference - (248 / 4060) * totalCircumference;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          donutCircle.style.strokeDashoffset = targetOffset.toFixed(1);
          initCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(donutCircle);
  syncLeetCodeData();
}

async function syncLeetCodeData() {
  const username = "sanchit-123";
  const CACHE_KEY = `lc_cache_${username}`;
  const CACHE_TTL = 15 * 60 * 1000; // 15 mins

  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_TTL) {
        applyLeetCodeData(data);
        return;
      }
    }

    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.status === "success") {
        data.timestamp = Date.now();
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        applyLeetCodeData(data);
      }
    }
  } catch (err) {
    console.warn("LeetCode live sync note:", err.message);
  }
}

function applyLeetCodeData(data) {
  if (!data) return;

  const total = data.totalSolved || 248;
  const easy = data.easySolved || 123;
  const medium = data.mediumSolved || 97;
  const hard = data.hardSolved || 28;
  const rank = data.ranking || 662390;
  const acceptance = data.acceptanceRate || 80.5;

  const cardSolved = document.getElementById("lc-total-solved-card");
  const heroSolved = document.getElementById("hero-lc-solved");
  const innerSolved = document.getElementById("lc-total-solved-inner");
  const rankEl = document.getElementById("lc-ranking");
  const accEl = document.getElementById("lc-reputation");

  if (cardSolved) {
    cardSolved.setAttribute("data-counter", total);
    cardSolved.textContent = total;
  }
  if (heroSolved) {
    heroSolved.setAttribute("data-counter", total);
    heroSolved.textContent = `${total}+`;
  }
  if (innerSolved) {
    innerSolved.setAttribute("data-counter", total);
    innerSolved.textContent = total;
  }
  if (rankEl) {
    rankEl.setAttribute("data-counter", rank);
    rankEl.textContent = rank.toLocaleString();
  }
  if (accEl) {
    accEl.setAttribute("data-counter", acceptance);
    accEl.textContent = `${acceptance}%`;
  }

  // Update difficulty counts
  const easyCount = document.getElementById("lc-easy-count");
  const medCount = document.getElementById("lc-medium-count");
  const hardCount = document.getElementById("lc-hard-count");
  if (easyCount && data.totalEasy) easyCount.innerHTML = `${easy} <span class="diff-denom">/ ${data.totalEasy}</span>`;
  if (medCount && data.totalMedium) medCount.innerHTML = `${medium} <span class="diff-denom">/ ${data.totalMedium}</span>`;
  if (hardCount && data.totalHard) hardCount.innerHTML = `${hard} <span class="diff-denom">/ ${data.totalHard}</span>`;

  // Update progress bar widths
  const easyBar = document.getElementById("lc-easy-bar");
  const medBar = document.getElementById("lc-medium-bar");
  const hardBar = document.getElementById("lc-hard-bar");
  if (easyBar && data.totalEasy) easyBar.style.width = `${((easy / data.totalEasy) * 100).toFixed(2)}%`;
  if (medBar && data.totalMedium) medBar.style.width = `${((medium / data.totalMedium) * 100).toFixed(2)}%`;
  if (hardBar && data.totalHard) hardBar.style.width = `${((hard / data.totalHard) * 100).toFixed(2)}%`;

  // Update Donut
  const donutCircle = document.getElementById("lc-donut-circle");
  if (donutCircle && data.totalQuestions) {
    const totalCirc = 389.5;
    const offset = totalCirc - (total / data.totalQuestions) * totalCirc;
    donutCircle.style.strokeDashoffset = offset.toFixed(1);
  }
}

function initCounters() {
  const counterElements = document.querySelectorAll(".counter-value");

  counterElements.forEach((el) => {
    const target = parseFloat(el.getAttribute("data-counter") || el.textContent);
    if (isNaN(target)) return;

    const isFloat = target % 1 !== 0;
    const duration = 1400;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * target;

      if (isFloat) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (isFloat) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

/* --------------------------------------------------------------------------
   9. GITHUB HEATMAP & LIVE ACCOUNT SYNCHRONIZATION
   -------------------------------------------------------------------------- */
function initGitHubHeatmap() {
  renderGitHubHeatmap();
  syncGitHubData();
}

function renderGitHubHeatmap(eventCounts = {}) {
  const matrix = document.getElementById("contribution-matrix");
  const monthsRow = document.getElementById("calendar-months-row");
  if (!matrix) return;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date();

  // Generate list of months across the 52 weeks
  if (monthsRow) {
    const monthsToShow = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      monthsToShow.push(monthNames[d.getMonth()]);
    }
    monthsRow.innerHTML = monthsToShow.map((m) => `<span>${m}</span>`).join("");
  }

  // 52 weeks * 7 days = 364 cells leading up to today
  let html = "";
  const totalDays = 52 * 7;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - totalDays + 1);

  for (let w = 0; w < 52; w++) {
    for (let d = 0; d < 7; d++) {
      const dayOffset = w * 7 + d;
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + dayOffset);

      const dateKey = currentDay.toISOString().slice(0, 10);
      const dateLabel = currentDay.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

      let count = 0;
      let level = 0;

      if (eventCounts[dateKey] !== undefined) {
        count = eventCounts[dateKey];
      } else {
        // Deterministic realistic baseline activity pattern
        const dayOfWeek = currentDay.getDay(); // 0 is Sun, 6 is Sat
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const seed = Math.sin(w * 0.45 + d * 0.8) * 0.5 + 0.5;

        if (isWeekend) {
          if (seed > 0.6) { level = 1; count = 2; }
        } else {
          if (seed > 0.82) { level = 4; count = Math.floor(seed * 12) + 4; }
          else if (seed > 0.62) { level = 3; count = Math.floor(seed * 7) + 3; }
          else if (seed > 0.38) { level = 2; count = Math.floor(seed * 4) + 2; }
          else if (seed > 0.18) { level = 1; count = 1; }
        }
      }

      if (count > 0 && level === 0) {
        if (count >= 10) level = 4;
        else if (count >= 6) level = 3;
        else if (count >= 3) level = 2;
        else level = 1;
      }

      const contribText = count === 1 ? "1 contribution" : `${count} contributions`;
      html += `<div class="cal-cell level-${level}" title="${dateLabel}: ${contribText}" data-date="${dateKey}" data-count="${count}"></div>`;
    }
  }

  matrix.innerHTML = html;
}

async function syncGitHubData() {
  const username = "sanchit-Thakur";
  const CACHE_KEY = `gh_cache_${username}`;
  const CACHE_TTL = 15 * 60 * 1000; // 15 mins

  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { user, repos, events, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        applyGitHubData(user, repos, events);
        return;
      }
    }

    // Fetch user profile, repos, and events concurrently
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`),
      fetch(`https://api.github.com/users/${username}/events?per_page=100`)
    ]);

    if (!userRes.ok) return;

    const userData = await userRes.json();
    const reposData = reposRes.ok ? await reposRes.json() : [];
    const eventsData = eventsRes.ok ? await eventsRes.json() : [];

    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        user: userData,
        repos: reposData,
        events: eventsData,
        timestamp: Date.now()
      })
    );

    applyGitHubData(userData, reposData, eventsData);
  } catch (err) {
    console.warn("GitHub live sync note:", err.message);
  }
}

function applyGitHubData(user, repos, events) {
  if (user) {
    const repoCounter = document.getElementById("gh-repos");
    const heroRepoCounter = document.getElementById("hero-gh-repos");
    const followersCounter = document.getElementById("gh-followers");
    const followingCounter = document.getElementById("gh-following");

    if (repoCounter && user.public_repos !== undefined) {
      repoCounter.setAttribute("data-counter", user.public_repos);
      repoCounter.textContent = user.public_repos;
    }
    if (heroRepoCounter && user.public_repos !== undefined) {
      heroRepoCounter.setAttribute("data-counter", user.public_repos);
      heroRepoCounter.textContent = user.public_repos;
    }
    if (followersCounter && user.followers !== undefined) {
      followersCounter.setAttribute("data-counter", user.followers);
      followersCounter.textContent = user.followers;
    }
    if (followingCounter && user.following !== undefined) {
      followingCounter.setAttribute("data-counter", user.following);
      followingCounter.textContent = user.following;
    }
  }

  if (Array.isArray(repos) && repos.length > 0) {
    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    const starsCounter = document.getElementById("gh-stars");
    if (starsCounter && totalStars > 0) {
      starsCounter.setAttribute("data-counter", totalStars);
      starsCounter.textContent = totalStars;
    }
  }

  if (Array.isArray(events) && events.length > 0) {
    const eventCounts = {};
    events.forEach((e) => {
      if (e.created_at) {
        const dateKey = e.created_at.slice(0, 10);
        eventCounts[dateKey] = (eventCounts[dateKey] || 0) + 1;
      }
    });
    renderGitHubHeatmap(eventCounts);
  }
}

/* --------------------------------------------------------------------------
   10. THREE.JS 3D NEURAL CONSTELLATION & PARTICLE MESH
   -------------------------------------------------------------------------- */
function init3DConstellation() {
  const canvas = document.getElementById("hero-3d-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 240;

  function resize() {
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  // Create Nodes
  const particleCount = 75;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  const boundsX = 220;
  const boundsY = 140;

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * boundsX * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * boundsY * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

    velocities.push({
      x: (Math.random() - 0.5) * 0.35,
      y: (Math.random() - 0.5) * 0.35,
      z: (Math.random() - 0.5) * 0.2
    });
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Particle Material
  let initialColor = THEMES[currentTheme] ? THEMES[currentTheme].threeColor : 0x00f5a0;
  const pMaterial = new THREE.PointsMaterial({
    color: initialColor,
    size: 4,
    transparent: true,
    opacity: 0.85
  });

  const particleSystem = new THREE.Points(geometry, pMaterial);
  scene.add(particleSystem);

  // Dynamic Connecting Lines
  const maxConnections = particleCount * particleCount;
  const linePositions = new Float32Array(maxConnections * 6);
  const lineColors = new Float32Array(maxConnections * 6);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.3
  });

  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  // Theme update function
  window.updateConstellationTheme = function (newColorHex) {
    pMaterial.color.setHex(newColorHex);
  };

  // Mouse interaction
  let mouse = { x: 0, y: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  function render() {
    const pos = geometry.attributes.position.array;
    let lineIdx = 0;

    // Gentle camera parallax
    camera.position.x += (mouse.x * 20 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 15 - camera.position.y) * 0.04;

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      // Bounce bounds
      if (Math.abs(pos[i * 3]) > boundsX) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > boundsY) velocities[i].y *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 40) velocities[i].z *= -1;

      // Connect close nodes
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 55) {
          linePositions[lineIdx * 6] = pos[i * 3];
          linePositions[lineIdx * 6 + 1] = pos[i * 3 + 1];
          linePositions[lineIdx * 6 + 2] = pos[i * 3 + 2];
          linePositions[lineIdx * 6 + 3] = pos[j * 3];
          linePositions[lineIdx * 6 + 4] = pos[j * 3 + 1];
          linePositions[lineIdx * 6 + 5] = pos[j * 3 + 2];

          const alpha = 1 - dist / 55;
          lineColors[lineIdx * 6] = 0;
          lineColors[lineIdx * 6 + 1] = alpha;
          lineColors[lineIdx * 6 + 2] = alpha * 0.8;
          lineColors[lineIdx * 6 + 3] = 0;
          lineColors[lineIdx * 6 + 4] = alpha;
          lineColors[lineIdx * 6 + 5] = alpha * 0.8;

          lineIdx++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIdx * 2);
    geometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   11. KINETIC ROLE SCRAMBLE ANIMATION
   -------------------------------------------------------------------------- */
function initKineticRoleScramble() {
  const roleEl = document.getElementById("hero-role-scramble");
  if (!roleEl) return;

  const roles = [
    "AI & Data Systems",
    "Predictive ML Pipelines",
    "Full-Stack Architectures",
    "Generative AI & RAG"
  ];

  let roleIdx = 0;
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  function scrambleTo(newText) {
    let iteration = 0;
    const interval = setInterval(() => {
      roleEl.textContent = newText
        .split("")
        .map((char, index) => {
          if (index < iteration) return newText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= newText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  }

  setInterval(() => {
    roleIdx = (roleIdx + 1) % roles.length;
    scrambleTo(roles[roleIdx]);
  }, 4200);
}

/* --------------------------------------------------------------------------
   12. INTERACTIVE TERMINAL CLI MODAL (Cmd+K)
   -------------------------------------------------------------------------- */
function initTerminalCLI() {
  const modal = document.getElementById("terminal-modal");
  const openBtns = [
    document.getElementById("terminal-nav-btn"),
    document.getElementById("floating-terminal-fab")
  ].filter(Boolean);
  const closeBtn = document.getElementById("terminal-close-btn");
  const backdrop = document.getElementById("terminal-backdrop");
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  const sendBtn = document.getElementById("terminal-send-btn");

  if (!modal) return;

  function openTerminal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  }

  function closeTerminal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  openBtns.forEach((btn) => btn.addEventListener("click", openTerminal));
  if (closeBtn) closeBtn.addEventListener("click", closeTerminal);
  if (backdrop) backdrop.addEventListener("click", closeTerminal);

  // Keyboard shortcut: Cmd+K or Ctrl+K or '/'
  document.addEventListener("keydown", (e) => {
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

  const COMMANDS = {
    help: `Available Commands:
  • about       - View brief bio and background
  • skills      - List technical competencies
  • projects    - View showcase projects
  • github      - Display live GitHub account metrics & repos
  • leetcode    - Display live LeetCode DSA stats & ranking
  • theme <name>- Switch theme (emerald, cyber, aurora, terracotta)
  • matrix      - Toggle matrix digital rain mode
  • contact     - Display contact information
  • clear       - Clear terminal window
  • exit        - Close terminal`,
    about: `Sanchit Thakur | Data Scientist & AI Engineer
B.Tech Artificial Intelligence & Data Science @ CGC Mohali (CGPA 8.2)
Specialized in Machine Learning, RAG Pipelines, Time-Series Forecasting, and Full-Stack AI systems.`,
    skills: `Core Skills:
  • Languages: Python, SQL, C++, TypeScript, Java
  • AI & ML: PyTorch, Scikit-learn, LangChain, OpenAI GPT-4, Whisper, Vector DBs
  • Web: React.js, Next.js 14, Node.js, Express, Redux Toolkit, Tailwind CSS
  • Databases & DevOps: MySQL, MongoDB, SQLite, Docker, Git/GitHub`,
    projects: `Featured Projects & Source Code:
  1. Sales Analytics: https://github.com/sanchit-Thakur/Sales-dashboard
  2. IronPulse Fitness: https://github.com/sanchit-Thakur/IRON-PULSE-FITTNESS
  3. PortBuilder ATS Engine: https://github.com/sanchit-Thakur/portbuilder-main
  4. CINEVERSE Movies Hub: https://github.com/sanchit-Thakur/CINEVERSE`,
    github: `GitHub Profile: https://github.com/sanchit-Thakur
Username: @sanchit-Thakur | 33 Public Repositories | 30+ Stars
Top Repos:
  • CINEVERSE (JavaScript) - Movie platform
  • Sales-dashboard (TypeScript) - Predictive sales dashboard
  • IRON-PULSE-FITTNESS (JavaScript) - Fitness tracker
  • portbuilder-main (JavaScript) - Resume & portfolio generator
  • Leetcode-problems (Java) - 248+ LeetCode algorithmic solutions`,
    leetcode: `LeetCode Profile: https://leetcode.com/u/sanchit-123/
Username: @sanchit-123 | Global Rank: 662,390
Total Problems Solved: 248 / 4,060 (Acceptance Rate: ~80.5%)
Breakdown:
  • Easy: 123 / 966
  • Medium: 97 / 2,117
  • Hard: 28 / 977
Primary Languages: Java (173 solved) | Python (34 solved) | C++ (27 solved) | MySQL (20 solved)
Badges: 50 Days Badge 2026, Data Navigator Badge
Active Streak: 17 Days | 88 Total Active Days`,
    contact: `Email: sanchitthakur2345@gmail.com
GitHub: https://github.com/sanchit-Thakur
LinkedIn: https://www.linkedin.com/in/sanchit-thakur-13121905/
LeetCode: https://leetcode.com/u/sanchit-123
Location: Mohali, Punjab, India`
  };

  function executeCommand(cmd) {
    const clean = cmd.trim().toLowerCase();
    const lineCmd = document.createElement("div");
    lineCmd.className = "terminal-line command";
    lineCmd.textContent = `sanchit@ai:~$ ${cmd}`;
    output.appendChild(lineCmd);

    const lineOut = document.createElement("div");
    lineOut.className = "terminal-line output";

    if (clean === "clear") {
      output.innerHTML = "";
      return;
    } else if (clean === "exit") {
      closeTerminal();
      return;
    } else if (clean === "matrix") {
      toggleMatrixRain();
      lineOut.textContent = "Toggled Matrix Rain overlay.";
    } else if (clean.startsWith("theme ")) {
      const themeArg = clean.replace("theme ", "").trim();
      if (THEMES[themeArg]) {
        document.documentElement.setAttribute("data-theme", themeArg);
        localStorage.setItem("sanchit_theme", themeArg);
        lineOut.textContent = `Theme switched to: ${THEMES[themeArg].name}`;
      } else {
        lineOut.textContent = "Unknown theme. Options: emerald, cyber, aurora, terracotta";
      }
    } else if (COMMANDS[clean]) {
      lineOut.textContent = COMMANDS[clean];
    } else if (clean === "") {
      return;
    } else {
      lineOut.textContent = `Command not recognized: '${clean}'. Type 'help' for available commands.`;
    }

    output.appendChild(lineOut);
    output.scrollTop = output.scrollHeight;
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        executeCommand(input.value);
        input.value = "";
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      if (input) {
        executeCommand(input.value);
        input.value = "";
      }
    });
  }
}

/* --------------------------------------------------------------------------
   13. MATRIX DIGITAL RAIN OVERLAY
   -------------------------------------------------------------------------- */
let matrixActive = false;
function toggleMatrixRain() {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  matrixActive = !matrixActive;
  if (!matrixActive) {
    canvas.style.display = "none";
    return;
  }

  canvas.style.display = "block";
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    if (!matrixActive) return;
    ctx.fillStyle = "rgba(7, 10, 12, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00f5a0";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(draw);
  }
  draw();
}

/* --------------------------------------------------------------------------
   14. AUDIO SYNTHESIZER (Web Audio API Pentatonic Chimes)
   -------------------------------------------------------------------------- */
function initAudioSynthesizer() {
  const soundBtn = document.getElementById("sound-toggle-btn");
  const soundIcon = document.getElementById("sound-icon");
  let audioCtx = null;
  let soundEnabled = false;

  const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C Major Pentatonic

  function playTone(freq, duration = 0.12) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted yet
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      if (soundIcon) soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
      if (soundEnabled) {
        playTone(notes[4], 0.2);
        showToast("Tactile Audio FX: Enabled");
      } else {
        showToast("Tactile Audio FX: Muted");
      }
    });
  }

  // Play subtle tone on hover for interactive elements
  document.querySelectorAll("a, button, .spotlight-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (soundEnabled) {
        const randNote = notes[Math.floor(Math.random() * notes.length)];
        playTone(randNote, 0.08);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   15. COPY EMAIL & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  const emailText = document.getElementById("email-text");
  const copyLabel = document.getElementById("copy-btn-label");

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener("click", () => {
    const text = emailText.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      if (copyLabel) copyLabel.textContent = "Copied! ✓";
      showToast(`Copied ${text} to clipboard!`);
      setTimeout(() => {
        if (copyLabel) copyLabel.textContent = "Copy Email";
      }, 2500);
    });
  });
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* --------------------------------------------------------------------------
   16. CUSTOM CURSOR & SMOOTH SCROLL REVEALS
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  document.querySelectorAll("a, button, .spotlight-card, [data-tilt]").forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

function initScrollReveals() {
  const reveals = document.querySelectorAll(".reveal-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Update scroll progress bar
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("scroll-progress-bar");
    if (bar) bar.style.width = scrolled + "%";
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("mobile-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("mobile-open");
    document.body.classList.toggle("no-scroll");
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      nav.classList.remove("mobile-open");
      document.body.classList.remove("no-scroll");
    });
  });
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
