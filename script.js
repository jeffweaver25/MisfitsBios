console.log("Script loaded");

function showInfo(data) {
  const container = document.getElementById("cards");
  const clanFilter = document.getElementById("clanFilter");
  const roleFilter = document.getElementById("roleFilter");

  const clans = new Set();
  const roles = new Set();

  function renderCards(filtered) {
    container.innerHTML = "";
    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        ${item.Images ? `<img src="${item.Images}" alt="Profile Image">` : ""}
        <h3>${item["In-Game User Name (s), include alt accounts"]}</h3>
        <p><strong>Discord:</strong> ${item["Discord User Name"]}</p>
        <p><strong>Clan:</strong> ${item["Clan (s), include alt accounts"]}</p>
        <p><strong>Role:</strong> ${item["Role (s)"]}</p>
        <p><strong>Favorite Champ:</strong> ${item["Favorite champion (s)"]}</p>
        <p>${item["Other Comments"]}</p>
      `;
      container.appendChild(card);
    });
  }

  data.forEach(item => {
    clans.add(item["Clan (s), include alt accounts"]);
    roles.add(item["Role (s)"]);
  });

  clans.forEach(c => {
    if (c) {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      clanFilter.appendChild(opt);
    }
  });

  roles.forEach(r => {
    if (r) {
      const opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r;
      roleFilter.appendChild(opt);
    }
  });

  function filterCards() {
    const selectedClan = clanFilter.value;
    const selectedRole = roleFilter.value;
    const filtered = data.filter(item => {
      return (!selectedClan || item["Clan (s), include alt accounts"] === selectedClan) &&
             (!selectedRole || item["Role (s)"] === selectedRole);
    });
    renderCards(filtered);
  }

  clanFilter.addEventListener("change", filterCards);
  roleFilter.addEventListener("change", filterCards);

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
