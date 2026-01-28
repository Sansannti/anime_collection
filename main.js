/* =========================
   ANIME COLLECTION APP
   GitHub Pages Version
   Using LocalStorage
========================= */

let animes = [];
let editingId = null;

// Storage key
const STORAGE_KEY = 'anime_collection_data';

/* =========================
   INITIALIZATION
========================= */
function initApp() {
  loadFromStorage();
  setupEventListeners();
  setupCharacters();
  renderAll();
  loadSampleData();
}

/* =========================
   LOAD/SAVE STORAGE
========================= */
function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      animes = JSON.parse(data);
    } catch (err) {
      console.error('Error loading data:', err);
      animes = [];
    }
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animes));
  } catch (err) {
    console.error('Error saving data:', err);
    showNotification('Gagal menyimpan data!', 'error');
  }
}

/* =========================
   SAMPLE DATA
========================= */
function loadSampleData() {
  if (animes.length === 0) {
    animes = [
      {
        id: 1,
        title: "Naruto",
        year: 2002,
        genre: "Action, Adventure, Shounen",
        episodes: 220,
        notes: "Kisah ninja muda yang bercita-cita menjadi Hokage. Anime klasik dengan cerita yang menginspirasi!",
        category: "watched",
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%23FF6B35' width='300' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3ENaruto%3C/text%3E%3C/svg%3E",
        characters: JSON.stringify([
          { name: "Naruto Uzumaki", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23FFB84D'/%3E%3C/svg%3E" },
          { name: "Sasuke Uchiha", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2334495E'/%3E%3C/svg%3E" }
        ])
      },
      {
        id: 2,
        title: "One Piece",
        year: 1999,
        genre: "Action, Adventure, Comedy",
        episodes: 1000,
        notes: "Petualangan bajak laut mencari harta karun legendaris One Piece!",
        category: "rewatch",
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%233498DB' width='300' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3EOne Piece%3C/text%3E%3C/svg%3E",
        characters: JSON.stringify([
          { name: "Monkey D. Luffy", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23E74C3C'/%3E%3C/svg%3E" }
        ])
      },
      {
        id: 3,
        title: "Attack on Titan",
        year: 2013,
        genre: "Action, Drama, Dark Fantasy",
        episodes: 87,
        notes: "Manusia melawan titan raksasa. Cerita yang epic dan penuh plot twist!",
        category: "recommended",
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%238B4513' width='300' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='white' text-anchor='middle' dy='.3em'%3EAttack on Titan%3C/text%3E%3C/svg%3E",
        characters: JSON.stringify([])
      },
      {
        id: 4,
        title: "Demon Slayer",
        year: 2019,
        genre: "Action, Supernatural",
        episodes: 26,
        notes: "Animasi yang sangat indah dengan cerita yang menyentuh hati.",
        category: "want_to_watch",
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%239B59B6' width='300' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='white' text-anchor='middle' dy='.3em'%3EDemon Slayer%3C/text%3E%3C/svg%3E",
        characters: JSON.stringify([])
      }
    ];
    saveToStorage();
  }
}

/* =========================
   EVENT LISTENERS
========================= */
function setupEventListeners() {
  // Form submit
  document.getElementById('animeForm').addEventListener('submit', handleFormSubmit);
  
  // Search
  document.getElementById('searchAnime').addEventListener('submit', handleSearch);
  
  // Poster upload
  document.getElementById('animePoster').addEventListener('change', handlePosterUpload);
  
  // Add character button
  document.getElementById('addCharacterBtn').addEventListener('click', addCharacterSlot);
}

/* =========================
   FORM HANDLING
========================= */
function handleFormSubmit(e) {
  e.preventDefault();
  
  const title = document.getElementById('animeTitle').value.trim();
  const year = parseInt(document.getElementById('animeYear').value);
  const genre = document.getElementById('animeGenre').value.trim();
  const episodes = parseInt(document.getElementById('animeEpisodes').value) || 0;
  const notes = document.getElementById('animeNotes').value.trim();
  const category = document.querySelector('input[name="category"]:checked')?.value;
  
  if (!title || !year || !category) {
    showNotification('Mohon isi semua field yang wajib!', 'error');
    return;
  }
  
  const posterImg = document.querySelector('#posterPreview img');
  const poster = posterImg ? posterImg.src : '';
  
  const characters = getCharactersData();
  
  const animeData = {
    id: editingId || Date.now(),
    title,
    year,
    genre,
    episodes,
    notes,
    category,
    poster,
    characters: JSON.stringify(characters)
  };
  
  if (editingId) {
    // Update existing
    const index = animes.findIndex(a => a.id === editingId);
    if (index !== -1) {
      animes[index] = animeData;
      showNotification('Anime berhasil diupdate! 🎉', 'success');
    }
    editingId = null;
  } else {
    // Add new
    animes.push(animeData);
    showNotification('Anime berhasil ditambahkan! 🎉', 'success');
  }
  
  saveToStorage();
  renderAll();
  resetForm();
}

/* =========================
   CHARACTER HANDLING
========================= */
function setupCharacters() {
  const container = document.getElementById('charactersContainer');
  container.innerHTML = '';
}

function addCharacterSlot() {
  const container = document.getElementById('charactersContainer');
  const currentSlots = container.querySelectorAll('.character-slot').length;
  
  if (currentSlots >= 6) {
    showNotification('Maksimal 6 tokoh!', 'info');
    return;
  }
  
  const slotId = `char-${Date.now()}`;
  const slot = document.createElement('div');
  slot.className = 'character-slot';
  slot.innerHTML = `
    <div class="character-image-preview" onclick="document.getElementById('${slotId}-img').click()">
      <div class="image-preview-placeholder">📷<br>Klik</div>
    </div>
    <input type="file" id="${slotId}-img" accept="image/*" style="display:none" onchange="handleCharacterImage(this)">
    <input type="text" class="character-name-input" placeholder="Nama tokoh...">
    <button type="button" class="btn-danger" onclick="this.parentElement.remove()" style="margin-top:8px; width:100%; padding:6px; font-size:0.85em">✕ Hapus</button>
  `;
  
  container.appendChild(slot);
}

function handleCharacterImage(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Ukuran gambar maksimal 5MB!', 'error');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = input.previousElementSibling;
      preview.innerHTML = `<img src="${e.target.result}" alt="Character">`;
    };
    reader.readAsDataURL(file);
  }
}

function getCharactersData() {
  const characters = [];
  const slots = document.querySelectorAll('.character-slot');
  
  slots.forEach(slot => {
    const name = slot.querySelector('.character-name-input').value.trim();
    const img = slot.querySelector('.character-image-preview img');
    
    if (name && img) {
      characters.push({
        name: name,
        image: img.src
      });
    }
  });
  
  return characters;
}

/* =========================
   POSTER HANDLING
========================= */
function handlePosterUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    showNotification('Ukuran gambar maksimal 5MB!', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const preview = document.getElementById('posterPreview');
    preview.innerHTML = `<img src="${event.target.result}" alt="Poster">`;
  };
  reader.readAsDataURL(file);
}

/* =========================
   SEARCH
========================= */
function handleSearch(e) {
  e.preventDefault();
  const keyword = document.getElementById('searchTitle').value.toLowerCase().trim();
  
  if (!keyword) {
    renderAll();
    return;
  }
  
  const filtered = animes.filter(anime => 
    anime.title.toLowerCase().includes(keyword)
  );
  
  renderAnimesByCategory(filtered);
  updateStatistics();
  
  if (filtered.length === 0) {
    showNotification('Tidak ada anime yang ditemukan', 'info');
  }
}

/* =========================
   RENDERING
========================= */
function renderAll() {
  renderAnimesByCategory(animes);
  updateStatistics();
}

function renderAnimesByCategory(animeList) {
  const categories = ['watched', 'unwatched', 'recommended', 'rewatch', 'no_rewatch', 'want_to_watch'];
  
  categories.forEach(category => {
    const filtered = animeList.filter(a => a.category === category);
    const container = document.getElementById(`${category.replace('_', '')}List`.replace('norewatch', 'noRewatch').replace('wanttowatch', 'wantToWatch'));
    const countElement = document.getElementById(`${category.replace('_', '')}Count`.replace('norewatch', 'noRewatch').replace('wanttowatch', 'wantToWatch'));
    
    if (countElement) {
      countElement.textContent = filtered.length;
    }
    
    if (!container) return;
    
    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty-message">🔭 Belum ada anime</div>';
      return;
    }
    
    container.innerHTML = filtered.map(anime => createAnimeCard(anime)).join('');
  });
}

function createAnimeCard(anime) {
  const characters = anime.characters ? JSON.parse(anime.characters) : [];
  const categoryLabels = {
    watched: 'Sudah Ditonton',
    unwatched: 'Belum Ditonton',
    recommended: 'Rekomendasi',
    rewatch: 'Cocok Rewatch',
    no_rewatch: 'Ga Cocok Rewatch',
    want_to_watch: 'Mau Coba Tonton'
  };
  
  return `
    <div class="anime-card">
      ${anime.poster ? `<img src="${anime.poster}" class="anime-image" alt="${anime.title}">` : '<div class="anime-image" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7b2ff7,#00c853);color:white;font-size:1.2em">📺</div>'}
      <div class="anime-content">
        <h3 class="anime-title">${anime.title} (${anime.year})</h3>
        <div class="anime-category-badge badge-${anime.category.replace('_', '-')}">${categoryLabels[anime.category]}</div>
        ${anime.genre ? `<p class="anime-info"><strong>Genre:</strong> ${anime.genre}</p>` : ''}
        ${anime.episodes ? `<p class="anime-info"><strong>Episode:</strong> ${anime.episodes}</p>` : ''}
        ${anime.notes ? `<div class="anime-notes">${anime.notes}</div>` : ''}
        
        ${characters.length > 0 ? `
          <div style="margin-top:12px">
            <strong style="display:block;margin-bottom:8px;color:#334155">Tokoh/Pemeran:</strong>
            <div class="characters-grid">
              ${characters.map(char => `
                <div style="text-align:center">
                  <img src="${char.image}" class="character-avatar" alt="${char.name}">
                  <div class="character-name">${char.name}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn-edit" onclick="editAnime(${anime.id})" style="flex:1;padding:8px;font-size:0.9em">✏️ Edit</button>
          <button class="btn-danger" onclick="deleteAnime(${anime.id})" style="flex:1;padding:8px;font-size:0.9em">🗑️ Hapus</button>
        </div>
      </div>
    </div>
  `;
}

/* =========================
   CRUD OPERATIONS
========================= */
function editAnime(id) {
  const anime = animes.find(a => a.id === id);
  if (!anime) return;
  
  editingId = id;
  
  // Fill form
  document.getElementById('animeTitle').value = anime.title;
  document.getElementById('animeYear').value = anime.year;
  document.getElementById('animeGenre').value = anime.genre || '';
  document.getElementById('animeEpisodes').value = anime.episodes || '';
  document.getElementById('animeNotes').value = anime.notes || '';
  
  // Set category
  const categoryRadio = document.querySelector(`input[name="category"][value="${anime.category}"]`);
  if (categoryRadio) categoryRadio.checked = true;
  
  // Set poster
  if (anime.poster) {
    document.getElementById('posterPreview').innerHTML = `<img src="${anime.poster}" alt="Poster">`;
  }
  
  // Set characters
  setupCharacters();
  const characters = anime.characters ? JSON.parse(anime.characters) : [];
  characters.forEach(char => {
    addCharacterSlot();
    const slots = document.querySelectorAll('.character-slot');
    const lastSlot = slots[slots.length - 1];
    lastSlot.querySelector('.character-name-input').value = char.name;
    lastSlot.querySelector('.character-image-preview').innerHTML = `<img src="${char.image}" alt="${char.name}">`;
  });
  
  // Update button
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.textContent = '💾 Update Anime';
  submitBtn.className = 'btn-edit';
  
  // Scroll to form
  document.getElementById('animeForm').scrollIntoView({ behavior: 'smooth' });
  
  showNotification('Mode edit - silakan ubah data', 'info');
}

function deleteAnime(id) {
  if (!confirm('Yakin ingin menghapus anime ini?')) return;
  
  const index = animes.findIndex(a => a.id === id);
  if (index !== -1) {
    animes.splice(index, 1);
    saveToStorage();
    renderAll();
    showNotification('Anime berhasil dihapus!', 'success');
  }
}

/* =========================
   STATISTICS
========================= */
function updateStatistics() {
  document.getElementById('totalAnime').textContent = animes.length;
  document.getElementById('totalWatched').textContent = animes.filter(a => a.category === 'watched').length;
  document.getElementById('totalUnwatched').textContent = animes.filter(a => a.category === 'unwatched').length;
  document.getElementById('totalRecommended').textContent = animes.filter(a => a.category === 'recommended').length;
}

/* =========================
   UTILITIES
========================= */
function resetForm() {
  document.getElementById('animeForm').reset();
  document.getElementById('posterPreview').innerHTML = '<div class="image-preview-placeholder">📷<br>Klik untuk upload<br>poster anime</div>';
  setupCharacters();
  editingId = null;
  
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.textContent = '➕ Tambahkan Anime';
  submitBtn.className = 'btn-primary';
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/* =========================
   PDF EXPORT
========================= */
function exportToPDF(category) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const filtered = animes.filter(a => a.category === category);
  
  if (filtered.length === 0) {
    showNotification('Tidak ada anime untuk di-export!', 'info');
    return;
  }
  
  showLoading(true);
  
  setTimeout(() => {
    const categoryLabels = {
      watched: 'Sudah Ditonton',
      unwatched: 'Belum Ditonton',
      recommended: 'Rekomendasi',
      rewatch: 'Cocok Rewatch',
      no_rewatch: 'Ga Cocok Rewatch',
      want_to_watch: 'Mau Coba Tonton'
    };
    
    // Cover page
    doc.setFontSize(24);
    doc.text('My Anime Collection', 105, 40, { align: 'center' });
    doc.setFontSize(16);
    doc.text(categoryLabels[category], 105, 60, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Total: ${filtered.length} anime`, 105, 80, { align: 'center' });
    doc.text(`Generated: ${new Date().toLocaleDateString('id-ID')}`, 105, 100, { align: 'center' });
    
    // Anime list
    let yPos = 140;
    filtered.forEach((anime, index) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${anime.title} (${anime.year})`, 20, yPos);
      yPos += 8;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      if (anime.genre) {
        doc.text(`Genre: ${anime.genre}`, 25, yPos);
        yPos += 6;
      }
      if (anime.episodes) {
        doc.text(`Episode: ${anime.episodes}`, 25, yPos);
        yPos += 6;
      }
      if (anime.notes) {
        const lines = doc.splitTextToSize(anime.notes, 160);
        doc.text(lines, 25, yPos);
        yPos += (lines.length * 6);
      }
      
      yPos += 10;
    });
    
    doc.save(`anime-${category}-${Date.now()}.pdf`);
    showLoading(false);
    showNotification('PDF berhasil di-export! 📄', 'success');
  }, 500);
}

function exportToXLSX(category) {
  showNotification('Export XLSX akan segera tersedia!', 'info');
}

function showLoading(show) {
  const overlay = document.getElementById('loadingOverlay');
  overlay.style.display = show ? 'flex' : 'none';
}

/* =========================
   INIT ON LOAD
========================= */
document.addEventListener('DOMContentLoaded', initApp);

// Make functions global for onclick handlers
window.editAnime = editAnime;
window.deleteAnime = deleteAnime;
window.handleCharacterImage = handleCharacterImage;
window.exportToPDF = exportToPDF;
window.exportToXLSX = exportToXLSX;