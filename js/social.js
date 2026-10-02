const SOCIAL = {
  facebookPage: "Securitas",
  instagramHandle: "securitas",
  instagramFallback: [
    { src: "assets/ig-1.jpg", href: "https://www.instagram.com/securitas/", caption: "Kontrolli" },
    { src: "assets/ig-3.jpg", href: "https://www.instagram.com/securitas/", caption: "Në detyrë" },
    { src: "assets/ig-5.jpg", href: "https://www.instagram.com/securitas/", caption: "Ngjarje" }
  ]
};

function renderFacebook(target) {
  const page = encodeURIComponent(SOCIAL.facebookPage);
  const width = Math.min(420, Math.max(280, Math.floor(target.clientWidth || 360)));
  target.innerHTML = "";
  const frame = document.createElement("iframe");
  frame.title = "Përditësime Facebook nga " + SOCIAL.facebookPage;
  frame.src =
    "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F" +
    page +
    "&tabs=timeline&width=" +
    width +
    "&height=280&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false";
  frame.width = String(width);
  frame.height = "280";
  frame.loading = "lazy";
  frame.allow = "encrypted-media";
  target.appendChild(frame);
}

function renderInstagram(target) {
  target.innerHTML = "";
  const intro = document.createElement("p");
  intro.className = "tiny";
  intro.innerHTML =
    'Demo: <a href="https://www.instagram.com/' +
    SOCIAL.instagramHandle +
    '/" target="_blank" rel="noopener">@' +
    SOCIAL.instagramHandle +
    "</a>";
  target.appendChild(intro);

  const grid = document.createElement("div");
  grid.className = "ig-grid";
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
}

(function initSocial() {
  const fb = document.querySelector("#facebook-feed");
  const ig = document.querySelector("#instagram-feed");
  if (fb) renderFacebook(fb);
  if (ig) renderInstagram(ig);
})();
