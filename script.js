console.log("Script loaded");

const CLANS = [
  "1MIS - Neglected Misfits / Strapons",
  "2MIS - Unleashed Misfits",
  "3MIS - Abandoned Misfits",
  "5MIS - Rejected Misfits / Kittens",
  "5KIS - Exiled Misfits"
];

const ROLES = [
  "Clan Leader",
  "Clan Deputy",
  "Cluster Officer / Leadership",
  "RSL Content Expert"
];

function showInfo(data) {
  const container = document.getElementById("cards");
  const clanFilter = document.getElementById("clanFilter");
  const roleFilter = document.getElementById("roleFilter");
  const nameInput = document.getElementById("nameInput");
  const nameSearchBtn = document.getElementById("nameSearchBtn");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  function renderCards(filtered) {
    container.innerHTML = "";
    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      const images = (item.Images || "").split(",").map(url => url.trim()).filter(url => url);
      const thumbs = images.map(url =>
        `<a href="${url}" target="_blank"><img class="thumb" src="${url}" alt="img"></a>`
      ).join("");

      card.innerHTML = `
        <div class="thumbs">${thumbs}</div>
        <h3>${item["In-Game User Name"]}</h3>
        <p><strong>Discord:</strong> ${item["Discord User Name"]}</p>
        <p><strong>IRL Name:</strong> ${item["IRL Name"]}</p>
        <p><strong>Clan:</strong> ${item["Clan"]}</p>
        <p><strong>Role:</strong> ${item["Role"]}</p>
        <p><strong>Favorite Champ:</strong> ${item["Favorite Champion"]}</p>
        <p><strong>Occupation:</strong> ${item["Occupation"]}</p>
        <p><strong>Family / Pets:</strong> ${item["Family / Pets"]}</p>
        <p><strong>Comments:</strong> ${item["Comments"]}</p>
      `;
      container.appendChild(card);
    });
  }

  function populateDropdown(selectEl, options) {
    selectEl.innerHTML = `<option value="">All</option>`;
    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      selectEl.appendChild(option);
    });
  }

  function filterCards() {
    const selectedClan = clanFilter.value;
    const selectedRole = roleFilter.value;
    const searchName = nameInput.value.trim().toLowerCase();

    const filtered = data.filter(item => {
      const clanMatch = !selectedClan || (item["Clan"] || "").toLowerCase().includes(selectedClan.toLowerCase());
      const roleMatch = !selectedRole || (item["Role"] || "").toLowerCase().includes(selectedRole.toLowerCase());
      const nameMatch = !searchName ||
        (item["Discord User Name"] || "").toLowerCase().includes(searchName) ||
        (item["In-Game User Name"] || "").toLowerCase().includes(searchName);

      return clanMatch && roleMatch && nameMatch;
    });

    renderCards(filtered);
  }

  function clearFilters() {
    clanFilter.value = "";
    roleFilter.value = "";
    nameInput.value = "";
    renderCards(data);
  }

  populateDropdown(clanFilter, CLANS);
  populateDropdown(roleFilter, ROLES);

  clanFilter.addEventListener("change", filterCards);
  roleFilter.addEventListener("change", filterCards);
  nameSearchBtn.addEventListener("click", filterCards);
  clearFiltersBtn.addEventListener("click", clearFilters);

  renderCards(data);
}

window.addEventListener("DOMContentLoaded", () => {
  fetch("/.netlify/functions/bios")
    .then(res => res.json())
    .then(data => {
      console.log("Data from proxy:", data);
      showInfo(data);
    })
    .catch(err => console.error("Proxy fetch error:", err));
});
