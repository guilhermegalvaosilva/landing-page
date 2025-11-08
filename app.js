// Utilidades
const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => [...ctx.querySelectorAll(q)];

// Mobile menu
const hamb = $("#hamb");
const mobileMenu = $("#mobileMenu");
hamb?.addEventListener("click", () => {
  const open = mobileMenu.style.display === "block";
  mobileMenu.style.display = open ? "none" : "block";
  mobileMenu.setAttribute("aria-hidden", String(open));
});
$$("#mobileMenu a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileMenu.style.display = "none";
    mobileMenu.setAttribute("aria-hidden", "true");
  })
);

// Smooth scroll
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document
        .querySelector(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Dark/Light mode com persistência
const modeToggle = $("#modeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let theme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
const applyTheme = (t) => {
  document.documentElement.dataset.theme = t;
  if (t === "light") {
    document.body.style.background = "#f7f8fb";
    document.body.style.color = "#0b0c10";
  } else {
    document.body.style.background = "";
    document.body.style.color = "";
  }
  modeToggle.textContent = t === "dark" ? "🌗" : "🌞";
};
applyTheme(theme);
modeToggle?.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
$$(".reveal").forEach((el) => io.observe(el));

// Footer year
$("#year").textContent = new Date().getFullYear();

// Pricing CTA (exemplo de ação)
$$("[data-buy]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const plan = btn.getAttribute("data-buy");
    alert(
      `Plano selecionado: ${plan}. (Aqui podes abrir checkout ou falar com vendas)`
    ); // Substituir por integração real
  })
);

// Validação de formulário básica
const form = $("#contactForm");
const feedback = $("#formFeedback");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get("nome")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const mensagem = data.get("mensagem")?.toString().trim();

  let errors = [];
  if (!nome) errors.push("Informe o nome.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("Email inválido.");
  if (!mensagem || mensagem.length < 10)
    errors.push("Mensagem muito curta (min. 10 caracteres).");

  if (errors.length) {
    feedback.className = "error";
    feedback.textContent = errors.join(" ");
    return;
  }

  // Exemplo de submissão fake
  setTimeout(() => {
    feedback.className = "success";
    feedback.textContent = "Obrigado! Recebemos sua mensagem.";
    form.reset();
  }, 400);

  // Para integrar de verdade: fetch('/api/lead', {method:'POST', body: JSON.stringify(Object.fromEntries(data))})
});
