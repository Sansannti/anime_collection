let animes = [];

/* =========================
   FETCH DATA
========================= */
async function loadAnimes() {
  try {
    const res = await fetch("/api/animes");
    animes = await res.json();
  } catch (err) {
    console.error("Gagal load anime:", err);
  }
}

/* =========================
   SAVE DATA
========================= */
async function saveAnime(record) {
  try {
    await fetch("/api/animes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    });

    await loadAnimes();
    renderAll();
  } catch (err) {
    console.error("Gagal simpan anime:", err);
  }
}

/* =========================
   DELETE DATA
========================= */
async function deleteAnime(id) {
  if (!confirm("Yakin ingin menghapus anime ini?")) return;

  try {
    await fetch(`/api/animes/${id}`, {
      method: "DELETE"
    });

    await loadAnimes();
    renderAll();
  } catch (err) {
    console.error("Gagal hapus anime:", err);
  }
}

/* =========================
   FORM SUBMIT
========================= */
document.getElementById("animeForm").addEventListener("submit", async e => {
  e.preventDefault();

  const record = {
    title: document.getElementById("title").value,
    year: parseInt(document.getElementById("year").value),
    genre: document.getElementById("genre").value,
    episodes: parseInt(document.getElementById("episodes").value),
    notes: document.getElementById("notes").value,
    category: document.getElementById("category").value,
    poster: document.getElementById("poster").value,
    characters: getCharacters()
  };

  await saveAnime(record);
  e.target.reset();
});

/* =========================
   CHARACTERS
========================= */
function getCharacters() {
  const chars = [];
  document.querySelectorAll(".character").forEach(row => {
    const name = row.querySelector(".char-name").value;
    const role = row.querySelector(".char-role").value;
    if (name && role) chars.push({ name, role });
  });
  return chars;
}

/* =========================
   RENDER
========================= */
function renderAll() {
  const container = document.getElementById("animeList");
  container.innerHTML = "";

  animes.forEach(anime => {
    const div = document.createElement("div");
    div.className = "anime-card";

    div.innerHTML = `
      <img src="${anime.poster}" alt="${anime.title}">
      <h3>${anime.title} (${anime.year})</h3>
      <p><strong>Genre:</strong> ${anime.genre}</p>
      <p><strong>Episode:</strong> ${anime.episodes}</p>
      <p><strong>Category:</strong> ${anime.category}</p>
      <p>${anime.notes || ""}</p>

      <ul>
        ${(anime.characters ? JSON.parse(anime.characters) : [])
          .map(c => `<li>${c.name} - ${c.role}</li>`)
          .join("")}
      </ul>

      <button onclick="deleteAnime(${anime.id})">🗑️ Hapus</button>
    `;

    container.appendChild(div);
  });
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", async () => {
  await loadAnimes();
  renderAll();
});
