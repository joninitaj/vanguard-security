(function () {
  const content = window.VS_CONTENT;
  if (!content) return;

  const fb = document.querySelector("#facebook-feed");
  const ig = document.querySelector("#instagram-feed");

  if (fb) {
    fb.innerHTML = content.facebook
      .map((item) => {
        const post = content.posts[item.id];
        return (
          '<button class="feed-card" type="button" data-post="' +
          item.id +
          '">' +
          '<img src="' +
          post.images[0] +
          '" alt="">' +
          "<div>" +
          "<strong>" +
          post.title +
          "</strong>" +
          '<span class="tiny">' +
          item.time +
          " më parë</span>" +
          "<p>" +
          item.preview +
          "</p>" +
          "</div></button>"
        );
      })
      .join("");
    fb.querySelectorAll("[data-post]").forEach((el) => {
      el.addEventListener("click", () => window.VS_UI && window.VS_UI.openPost(el.getAttribute("data-post")));
    });
  }

  if (ig) {
    ig.innerHTML =
      '<p class="tiny">@vanguard.demo</p><div class="ig-grid">' +
      content.instagram
        .map(
          (item) =>
            '<button class="ig-card" type="button" data-post="' +
            item.id +
            '"><img src="' +
            item.src +
            '" alt="' +
            item.caption +
            '"><span>' +
            item.caption +
            "</span></button>"
        )
        .join("") +
      "</div>";
    ig.querySelectorAll("[data-post]").forEach((el) => {
      el.addEventListener("click", () => window.VS_UI && window.VS_UI.openPost(el.getAttribute("data-post")));
    });
  }
})();
