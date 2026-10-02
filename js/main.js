(function () {
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
        status.textContent = "Please complete name, email, and message.";
        return;
      }
      const subject = encodeURIComponent("Quote request — Vanguard Security");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${data.get("phone") || ""}\nService: ${data.get("service") || ""}\n\n${message}`
      );
      status.textContent = "Opening your email client…";
      window.location.href = `mailto:info@vanguardsecurity-ks.com?subject=${subject}&body=${body}`;
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
})();
