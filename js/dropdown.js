const avatarBtn = document.getElementById("avatar-btn");
const dropdown = document.getElementById("user-dropdown");

avatarBtn.addEventListener("click", () => {
  const opening = dropdown.hidden;
  dropdown.hidden = !opening;
  avatarBtn.setAttribute("aria-expanded", String(opening));
});
