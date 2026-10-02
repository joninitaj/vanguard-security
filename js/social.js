const SOCIAL = {
  facebookPage: "Securitas",
  instagramHandle: "securitas",
  instagramPosts: [
    "https://www.instagram.com/p/C8nKqG8tYxA/",
    "https://www.instagram.com/p/C7vH2nOt2kL/"
  ],
  instagramFallback: [
    { src: "assets/ig-1.jpg", href: "https://www.instagram.com/securitas/", caption: "Control room" },
    { src: "assets/ig-2.jpg", href: "https://www.instagram.com/securitas/", caption: "Briefing" },
    { src: "assets/ig-3.jpg", href: "https://www.instagram.com/securitas/", caption: "On duty" },
    { src: "assets/ig-4.jpg", href: "https://www.instagram.com/securitas/", caption: "Corporate sites" },
    { src: "assets/ig-5.jpg", href: "https://www.instagram.com/securitas/", caption: "Events" },
    { src: "assets/ig-6.jpg", href: "https://www.instagram.com/securitas/", caption: "Nightlife coverage" }
  ]
};

function renderFacebook(target) {
  const page = encodeURIComponent(SOCIAL.facebookPage);
  const width = Math.min(500, Math.max(340, target.clientWidth || 500));
  target.innerHTML = "";
  const frame = document.createElement("iframe");
  frame.title = "Facebook updates from " + SOCIAL.facebookPage;
  frame.src =
    "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F" +
    page +
    "&tabs=timeline&width=" +
    width +
    "&height=520&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true";
  frame.width = String(width);
  frame.height = "520";
  frame.style.border = "none";
  frame.style.overflow = "hidden";
  frame.allow = "encrypted-media";
  frame.loading = "lazy";
  target.appendChild(frame);
}

function renderInstagram(target) {
  target.innerHTML = "";
  const intro = document.createElement("p");
  intro.className = "tiny";
  intro.innerHTML =
    'Demo feed: <a href="https://www.instagram.com/' +
    SOCIAL.instagramHandle +
    '/" target="_blank" rel="noopener">@' +
    SOCIAL.instagramHandle +
    "</a>";
  target.appendChild(intro);

  const embedsWrap = document.createElement("div");
  embedsWrap.className = "embeds";
  SOCIAL.instagramPosts.forEach((url) => {
    const bq = document.createElement("blockquote");
    bq.className = "instagram-media";
    bq.setAttribute("data-instgrm-permalink", url);
    bq.setAttribute("data-instgrm-version", "14");
    bq.style.margin = "0 auto";
    embedsWrap.appendChild(bq);
  });
  target.appendChild(embedsWrap);

  const grid = document.createElement("div");
  grid.className = "ig-grid";
  grid.style.marginTop = "1rem";
  SOCIAL.instagramFallback.forEach((item) => {
    const a = document.createElement("a");
    a.className = "ig-card";
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = '<img src="' + item.src + '" alt="' + item.caption + '"><span>' + item.caption + "</span>";
    grid.appendChild(a);
  });
  target.appendChild(grid);

  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  }
}

(function initSocial() {
  const fbPanel = document.querySelector("#panel-facebook");
  const igPanel = document.querySelector("#panel-instagram");
  const tabs = document.querySelectorAll(".tab");

  if (fbPanel) renderFacebook(fbPanel.querySelector(".social-frame"));
  if (igPanel) renderInstagram(igPanel.querySelector(".social-frame"));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      const id = tab.getAttribute("data-panel");
      document.querySelectorAll(".panel").forEach((panel) => {
        panel.hidden = panel.id !== id;
      });
      if (id === "panel-facebook") {
        renderFacebook(fbPanel.querySelector(".social-frame"));
      }
    });
  });
})();
