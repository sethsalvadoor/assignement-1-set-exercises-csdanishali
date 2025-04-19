// index.js

// ─── 1) YOUR FULL SAMPLE BANK ────────────────────────────────────────────────
const samples = [
    { title: "Ah‑Ha",              src: "audio/ahha.mp3" },
    { title: "Dan",                src: "audio/dan.mp3" },
    { title: "Back of the net",    src: "audio/back‑of‑the‑net.mp3" },
    { title: "Bang out of order",  src: "audio/bang‑out‑of‑order.mp3" },
    { title: "Jurassic Park",      src: "audio/jurassic‑park.mp3" },
    { title: "Smell my cheese",    src: "audio/smell‑my‑cheese.mp3" },
    { title: "Goal",               src: "audio/goal.mp3" },
    { title: "Kiss my face",       src: "audio/kiss‑my‑face.mp3" },
    { title: "Hello Partridge",    src: "audio/hello‑partridge.mp3" },
    // Extra pages:
    { title: "Booyah!",            src: "audio/booyah.mp3" },
    { title: "Unbelievable!",      src: "audio/unbelievable.mp3" },
    { title: "Get in there!",      src: "audio/get‑in‑there.mp3" },
    { title: "Magic!",             src: "audio/magic.mp3" },
    { title: "What a strike!",     src: "audio/strike.mp3" },
    { title: "Hold the line!",     src: "audio/hold‑the‑line.mp3" }
  ];
  
  // ─── 2) PAGING CONFIG ────────────────────────────────────────────────────────
  const perPage = 9;
  let page = 0;
  
  // ─── 3) DOM ELEMENTS ──────────────────────────────────────────────────────────
  const grid     = document.querySelector(".samples-grid");
  const prevBtn  = document.getElementById("prev-btn");
  const nextBtn  = document.getElementById("next-btn");
  const ttsInput = document.getElementById("tts-input");
  const ttsBtn   = document.getElementById("tts-button");
  
  // ─── 4) RENDER ONE PAGE OF 9 SAMPLES ──────────────────────────────────────────
  function renderSamples() {
    grid.innerHTML = "";                      // clear out old cards
    const start = page * perPage;
    const pageItems = samples.slice(start, start + perPage);
  
    pageItems.forEach((s, i) => {
      // Card wrapper
      const card = document.createElement("div");
      card.className = "sample-card";
  
      // Play button
      const btn = document.createElement("button");
      btn.className = "play-button";
      btn.textContent = "Play";
      btn.dataset.src = s.src;
      card.appendChild(btn);
  
      // Title
      const title = document.createElement("div");
      title.className = "title";
      title.textContent = `${start + i + 1}. ${s.title}`;
      card.appendChild(title);
  
      // Duration placeholder
      const dur = document.createElement("div");
      dur.className = "duration";
      dur.textContent = "…";
      card.appendChild(dur);
  
      // Hidden Audio object to measure & play
      const audio = new Audio(s.src);
      audio.preload = "metadata";
      audio.addEventListener("loadedmetadata", () => {
        dur.textContent = audio.duration.toFixed(2) + "s";
      });
      btn.addEventListener("click", () => audio.play());
  
      grid.appendChild(card);
    });
  
    // Show/hide navigation arrows
    prevBtn.classList.toggle("hidden", page === 0);
    nextBtn.classList.toggle("hidden", (page + 1) * perPage >= samples.length);
  }
  
  // ─── 5) NAVIGATION HANDLERS ──────────────────────────────────────────────────
  prevBtn.addEventListener("click", () => {
    if (page > 0) {
      page--;
      renderSamples();
    }
  });
  nextBtn.addEventListener("click", () => {
    if ((page + 1) * perPage < samples.length) {
      page++;
      renderSamples();
    }
  });
  
  // ─── 6) LOAD & SELECT “ALIEN” VOICE ──────────────────────────────────────────
  let voices = [];
  function loadVoices() {
    voices = speechSynthesis.getVoices();
  }
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
  
  // ─── 7) TEXT‑TO‑SPEECH WITH ALIEN SETTINGS ───────────────────────────────────
  ttsBtn.addEventListener("click", () => {
    const text = ttsInput.value.trim();
    if (!text) return;
  
    const utter = new SpeechSynthesisUtterance(text);
  
    // Pick a non‑standard voice if available (fallback to first)
    const alienCandidates = voices.filter(v =>
      /Google UK English Male|Daniel|Alex|Fred/i.test(v.name)
    );
    utter.voice = alienCandidates[0] || voices[0];
  
    // Warp pitch & rate for that other‑worldly effect
    utter.pitch = 0.4;   // lower = deeper/robotic
    utter.rate  = 1.4;   // >1 faster
  
    speechSynthesis.speak(utter);
  });
  
  // ─── 8) INITIALIZE ONCE THE DOM IS READY ─────────────────────────────────────
  document.addEventListener("DOMContentLoaded", renderSamples);
  