(function () {
  const content = window.VS_CONTENT || { posts: {}, stories: [], facebook: [], instagram: [] };

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.querySelector("#quote-form");
  const status = document.querySelector("#form-status");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      if (!name || !email || !message) {
        status.textContent = "Plotësoni emrin, emailin dhe mesazhin.";
        return;
      }
      const subject = encodeURIComponent("Kërkesë për ofertë — Vanguard Security");
      const body = encodeURIComponent(
        `Emri: ${name}\nEmail: ${email}\nTelefoni: ${data.get("phone") || ""}\nShërbimi: ${data.get("service") || ""}\n\n${message}`
      );
      status.textContent = "Po hapet programi i emailit…";
      window.location.href = `mailto:info@vanguardsecurity-ks.com?subject=${subject}&body=${body}`;
    });
  }

  document.querySelectorAll(".section, .page-hero, .card, .gallery-card, .social-col, .stories-row").forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min(i * 0.03, 0.18) + "s";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: "40px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.95) el.classList.add("in");
    else io.observe(el);
  });

  function ensureShells() {
    if (!document.querySelector("#lightbox")) {
      const box = document.createElement("div");
      box.id = "lightbox";
      box.className = "lightbox";
      box.hidden = true;
      box.innerHTML =
        '<div class="lightbox-panel" role="dialog" aria-modal="true" aria-labelledby="lb-title">' +
        '<button class="lb-close" type="button" aria-label="Mbyll">&times;</button>' +
        '<div class="lb-media">' +
        '<button class="lb-nav prev" type="button" aria-label="Fotoja e mëparshme">&lsaquo;</button>' +
        '<img id="lb-image" alt="" />' +
        '<button class="lb-nav next" type="button" aria-label="Fotoja tjetër">&rsaquo;</button>' +
        '<div class="lb-dots" id="lb-dots"></div>' +
        "</div>" +
        '<div class="lb-side">' +
        '<div class="lb-head"><img src="assets/logo.png" alt="" /><div><strong>Vanguard Security</strong><p class="tiny" id="lb-meta"></p></div></div>' +
        '<h3 id="lb-title"></h3>' +
        '<p id="lb-text"></p>' +
        "</div></div>";
      document.body.appendChild(box);
    }
    if (!document.querySelector("#story-viewer")) {
      const sv = document.createElement("div");
      sv.id = "story-viewer";
      sv.className = "story-viewer";
      sv.hidden = true;
      sv.innerHTML =
        '<div class="story-bars" id="story-bars"></div>' +
        '<button class="lb-close" type="button" aria-label="Mbyll">&times;</button>' +
        '<img id="story-image" alt="" />' +
        '<p class="story-name" id="story-name"></p>';
      document.body.appendChild(sv);
    }
  }
  ensureShells();

  const lightbox = document.querySelector("#lightbox");
  const lbImage = document.querySelector("#lb-image");
  const lbTitle = document.querySelector("#lb-title");
  const lbText = document.querySelector("#lb-text");
  const lbMeta = document.querySelector("#lb-meta");
  const lbDots = document.querySelector("#lb-dots");
  let currentPost = null;
  let slide = 0;

  function renderSlide() {
    if (!currentPost) return;
    const src = currentPost.images[slide];
    lbImage.src = src;
    lbImage.style.opacity = "1";
    lbDots.querySelectorAll("button").forEach((d, i) => d.classList.toggle("on", i === slide));
  }

  function openPost(id) {
    const post = content.posts[id];
    if (!post) return;
    currentPost = post;
    slide = 0;
    lbTitle.textContent = post.title;
    lbText.textContent = post.text;
    lbMeta.textContent = post.meta;
    lbDots.innerHTML = post.images
      .map((_, i) => '<button type="button" data-i="' + i + '" aria-label="Foto ' + (i + 1) + '"></button>')
      .join("");
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    renderSlide();
  }

  function closePost() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    currentPost = null;
  }

  function nextSlide() {
    if (!currentPost) return;
    slide = (slide + 1) % currentPost.images.length;
    renderSlide();
  }
  function prevSlide() {
    if (!currentPost) return;
    slide = (slide - 1 + currentPost.images.length) % currentPost.images.length;
    renderSlide();
  }

  window.VS_UI = { openPost: openPost };

  document.querySelectorAll("[data-post]").forEach((el) => {
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    const go = () => openPost(el.getAttribute("data-post"));
    el.addEventListener("click", go);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  });

  lightbox.querySelector(".lb-close").addEventListener("click", closePost);
  lightbox.querySelector(".lb-nav.next").addEventListener("click", (e) => {
    e.stopPropagation();
    nextSlide();
  });
  lightbox.querySelector(".lb-nav.prev").addEventListener("click", (e) => {
    e.stopPropagation();
    prevSlide();
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closePost();
  });
  lbDots.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    slide = Number(btn.getAttribute("data-i"));
    renderSlide();
  });

  bindSwipe(lightbox.querySelector(".lb-media"), nextSlide, prevSlide);

  const storiesRow = document.querySelector("#stories-row");
  const storyViewer = document.querySelector("#story-viewer");
  const storyImage = document.querySelector("#story-image");
  const storyName = document.querySelector("#story-name");
  const storyBars = document.querySelector("#story-bars");
  let storySet = 0;
  let storySlide = 0;
  let storyTimer = null;

  function renderStories() {
    if (!storiesRow) return;
    storiesRow.innerHTML = content.stories
      .map(
        (s, i) =>
          '<button class="story-bubble" type="button" data-story="' +
          i +
          '"><span class="story-ring"><img src="' +
          s.cover +
          '" alt=""></span><span>' +
          s.name +
          "</span></button>"
      )
      .join("");
    storiesRow.querySelectorAll(".story-bubble").forEach((btn) => {
      btn.addEventListener("click", () => openStory(Number(btn.getAttribute("data-story"))));
    });
  }

  function paintStory() {
    const pack = content.stories[storySet];
    if (!pack) return;
    storyName.textContent = pack.name;
    storyImage.src = pack.slides[storySlide];
    storyImage.style.opacity = "1";
    storyBars.innerHTML = pack.slides
      .map((_, i) => '<span class="' + (i < storySlide ? "done" : i === storySlide ? "on" : "") + '"></span>')
      .join("");
    window.clearTimeout(storyTimer);
    storyTimer = window.setTimeout(nextStory, 3800);
  }

  function openStory(index) {
    storySet = index;
    storySlide = 0;
    storyViewer.hidden = false;
    document.body.style.overflow = "hidden";
    paintStory();
  }

  function closeStory() {
    storyViewer.hidden = true;
    document.body.style.overflow = "";
    window.clearTimeout(storyTimer);
  }

  function nextStory() {
    const pack = content.stories[storySet];
    if (!pack) return;
    if (storySlide < pack.slides.length - 1) {
      storySlide += 1;
      paintStory();
      return;
    }
    if (storySet < content.stories.length - 1) {
      storySet += 1;
      storySlide = 0;
      paintStory();
      return;
    }
    closeStory();
  }

  function prevStory() {
    if (storySlide > 0) {
      storySlide -= 1;
      paintStory();
      return;
    }
    if (storySet > 0) {
      storySet -= 1;
      storySlide = content.stories[storySet].slides.length - 1;
      paintStory();
    }
  }

  renderStories();
  if (storyViewer) {
    storyViewer.querySelector(".lb-close").addEventListener("click", (e) => {
      e.stopPropagation();
      closeStory();
    });
    storyViewer.addEventListener("click", (e) => {
      if (e.target === storyViewer || e.target === storyImage) {
        const mid = window.innerWidth / 2;
        if (e.clientX < mid) prevStory();
        else nextStory();
      }
    });
    bindSwipe(storyViewer, nextStory, prevStory);
  }

  function bindSwipe(el, onLeft, onRight) {
    if (!el) return;
    let x0 = null;
    el.addEventListener("pointerdown", (e) => {
      x0 = e.clientX;
    });
    el.addEventListener("pointerup", (e) => {
      if (x0 == null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (dx < -40) onLeft();
      if (dx > 40) onRight();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePost();
      closeStory();
    }
    if (!lightbox.hidden) {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
})();
