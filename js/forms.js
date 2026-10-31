// GitHub Pages is static (no server to receive a POST), so we cancel
// the real submission and go back to the home page instead
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = "index.html";
  });
});
