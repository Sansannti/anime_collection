# 🎌 MY ANIME COLLECTION APP

Aplikasi web untuk mengelola koleksi anime dengan sistem kategori lengkap, upload multiple gambar tokoh, dan export PDF dengan foto.

## ✨ FITUR LENGKAP

### 📋 Kategori Mutually Exclusive
Setiap anime hanya bisa ada di **SATU** kategori:
- ✅ **Sudah Ditonton** - Anime yang sudah selesai ditonton
- ⏳ **Belum Ditonton** - Anime yang belum/sedang ditonton
- ⭐ **Rekomendasi** - Anime yang sangat direkomendasikan
- 🔄 **Cocok Rewatch** - Anime yang cocok ditonton ulang
- 🚫 **Ga Cocok Rewatch** - Anime yang tidak perlu rewatch
- 🎯 **Mau Coba Tonton** - Anime yang ingin dicoba

### 🖼️ Upload Gambar
- **Poster Anime**: Upload 1 gambar poster/cover anime
- **Tokoh/Pemeran**: Upload maksimal 6 gambar tokoh dengan nama
- Format: JPG, PNG, GIF, WebP (Max 5MB per gambar)
- Gambar disimpan sebagai Base64 di database

### 📄 Export PDF dengan Gambar
- Export per kategori
- Menampilkan poster anime
- Menampilkan foto tokoh/pemeran (circular avatar)
- Layout profesional dengan cover page
- Statistik lengkap
- Pagination otomatis

### 🔍 Fitur Lainnya
- CRUD lengkap (Create, Read, Update, Delete)
- Search anime berdasarkan judul
- Statistik real-time
- Responsive design
- Loading indicators
- Notifications

---

## 📁 STRUKTUR FILE

```
anime-collection/
├── index.html          # Halaman utama
├── style.css           # Styling lengkap
├── script.js           # JavaScript (gabungkan Part 1 + Part 2)
├── api.php             # REST API
├── config.php          # Konfigurasi (optional)
├── database.sql        # Database schema & sample data
└── README.md           # Dokumentasi ini
```

---

## 🚀 CARA INSTALASI

### 1️⃣ Install XAMPP
Download dan install XAMPP dari: https://www.apachefriends.org/
- Windows: xampp-windows-x64.exe
- Mac: xampp-osx-x64.dmg
- Linux: xampp-linux-x64.run

### 2️⃣ Start Services
Buka XAMPP Control Panel dan start:
- ✅ Apache
- ✅ MySQL

### 3️⃣ Buat Database
1. Buka browser: `http://localhost/phpmyadmin`
2. Klik **New** untuk membuat database baru
3. Nama database: `anime_collection`
4. Collation: `utf8mb4_unicode_ci`
5. Klik **Create**

### 4️⃣ Import Database
1. Pilih database `anime_collection`
2. Klik tab **SQL**
3. Copy semua isi file `database.sql`
4. Paste ke text area
5. Klik **Go**
6. ✅ Database berhasil dibuat dengan sample data!

### 5️⃣ Copy Files
Copy semua file ke folder XAMPP:
```
Windows: C:\xampp\htdocs\anime-collection\
Mac/Linux: /opt/lampp/htdocs/anime-collection/
```

### 6️⃣ Gabungkan JavaScript
**PENTING**: File `script.js` dibagi menjadi 2 part. Gabungkan mereka:

1. Buat file baru: `script.js`
2. Copy semua kode dari **Part 1**
3. Lanjutkan dengan kode dari **Part 2** (tanpa header duplikat)
4. Save

### 7️⃣ Test Aplikasi
Buka browser dan akses:
```
http://localhost/anime-collection/
```

### 8️⃣ Test API (Optional)
Test endpoint API:
```
http://localhost/anime-collection/api.php/animes
http://localhost/anime-collection/api.php/statistics
```

---

## 🔧 KONFIGURASI

### Database Settings (api.php)
Jika menggunakan username/password berbeda:

```php
private $host = 'localhost';
private $db_name = 'anime_collection';
private $username = 'root';  // Ganti jika perlu
private $password = '';      // Ganti jika perlu
```

### API URL (script.js)
Jika menggunakan folder berbeda:

```javascript
const API_URL = 'http://localhost/anime-collection/api.php';
// Ganti sesuai lokasi folder Anda
```

### PHP Settings
Edit `php.ini` untuk upload gambar besar:

```ini
upload_max_filesize = 10M
post_max_size = 10M
max_execution_time = 300
memory_limit = 256M
```

Restart Apache setelah edit `php.ini`

---

## 📖 CARA PENGGUNAAN

### Menambah Anime Baru

1. **Isi Form**:
   - Judul Anime (required)
   - Tahun Rilis (required)
   - Genre (optional)
   - Episode (optional)
   - Catatan/Review (optional)

2. **Pilih Kategori** (required):
   - Pilih salah satu dari 6 kategori
   - Hanya bisa pilih 1 kategori

3. **Upload Poster**:
   - Klik area upload poster
   - Pilih gambar (max 5MB)

4. **Tambah Tokoh** (optional):
   - Klik "➕ Tambah Tokoh"
   - Upload foto tokoh
   - Tulis nama tokoh
   - Maksimal 6 tokoh
   - Klik ✕ untuk hapus slot

5. **Submit**:
   - Klik "➕ Tambahkan Anime"

### Edit Anime

1. Klik tombol "✏️ Edit" pada card anime
2. Form akan terisi otomatis
3. Ubah data yang diperlukan
4. Klik "💾 Update Anime"

### Hapus Anime

1. Klik tombol "🗑️ Hapus" pada card anime
2. Konfirmasi penghapusan
3. Anime akan dihapus dari database

### Cari Anime

1. Ketik judul anime di search box
2. Klik "Cari"
3. Hasil akan difilter

### Export PDF

1. Pilih kategori yang ingin di-export
2. Klik tombol "📄 Export PDF"
3. PDF akan otomatis ter-download
4. PDF berisi:
   - Cover page dengan statistik
   - Semua anime di kategori tersebut
   - Poster anime
   - Info lengkap
   - Foto tokoh (circular avatar)

---

## 🗄️ DATABASE SCHEMA

### Table: animes

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key (auto increment) |
| title | VARCHAR(255) | Judul anime |
| year | INT | Tahun rilis |
| genre | VARCHAR(255) | Genre anime |
| episodes | INT | Jumlah episode |
| notes | TEXT | Catatan/review |
| category | ENUM | Kategori (6 pilihan) |
| poster | LONGTEXT | Base64 gambar poster |
| characters | JSON | Array tokoh [{name, image}] |
| created_at | TIMESTAMP | Waktu dibuat |
| updated_at | TIMESTAMP | Waktu diupdate |

### Category Values:
- `watched`
- `unwatched`
- `recommended`
- `rewatch`
- `no_rewatch`
- `want_to_watch`

---

## 🌐 API ENDPOINTS

### GET Endpoints

```
GET /api.php/animes
→ Get all animes

GET /api.php/animes/{id}
→ Get anime by ID

GET /api.php/category/{category}
→ Get animes by category
  Categories: watched, unwatched, recommended, rewatch, no_rewatch, want_to_watch

GET /api.php/search?q={keyword}
→ Search animes

GET /api.php/statistics
→ Get statistics
```

### POST Endpoints

```
POST /api.php/animes
Body: {
  "title": "Naruto",
  "year": 2002,
  "genre": "Action, Shounen",
  "episodes": 220,
  "notes": "Great anime!",
  "category": "watched",
  "poster": "data:image/jpeg;base64,...",
  "characters": "[{\"name\":\"Naruto\",\"image\":\"...\"}]"
}
→ Create new anime
```

### PUT Endpoints

```
PUT /api.php/animes/{id}
Body: { ...same as POST... }
→ Update anime
```

### DELETE Endpoints

```
DELETE /api.php/animes/{id}
→ Delete anime
```

---

## 🐛 TROUBLESHOOTING

### 1. Database Connection Error
**Problem**: "Database connection failed"

**Solution**:
- Pastikan MySQL running di XAMPP
- Check credentials di `api.php`
- Pastikan database `anime_collection` sudah dibuat

### 2. Gambar Tidak Muncul
**Problem**: Gambar tidak ditampilkan

**Solution**:
- Check ukuran file < 5MB
- Format harus JPG/PNG/GIF/WebP
- Check console browser untuk error

### 3. PDF Tidak Keluar
**Problem**: Klik export PDF tidak ada response

**Solution**:
- Check browser console untuk error
- Pastikan jsPDF library ter-load
- Test dengan data yang lebih sedikit dulu

### 4. CORS Error
**Problem**: API request blocked by CORS

**Solution**:
- Pastikan akses dari `localhost`
- Check header CORS di `api.php`
- Gunakan XAMPP, jangan buka file langsung

### 5. Upload Error
**Problem**: Gambar tidak bisa di-upload

**Solution**:
- Edit `php.ini`: `upload_max_filesize = 10M`
- Edit `php.ini`: `post_max_size = 10M`
- Restart Apache

---

## 💡 TIPS & TRICKS

### 1. Compress Gambar
Gunakan online tool untuk compress gambar sebelum upload:
- TinyPNG: https://tinypng.com
- Compressor.io: https://compressor.io

### 2. Sample Data
Database sudah include 12 sample anime dengan karakter. Explore dulu sebelum add sendiri.

### 3. Backup Data
Export database secara berkala:
1. Buka phpMyAdmin
2. Select database `anime_collection`
3. Klik **Export**
4. Klik **Go**

### 4. Kategori Rules
- **Watched vs Recommended**: Watched = sudah nonton, Recommended = sangat bagus
- **Rewatch**: Anime yang enjoyable untuk ditonton ulang
- **Want to Watch**: Wishlist anime yang belum ditonton

### 5. PDF Quality
Untuk PDF dengan gambar berkualitas tinggi, gunakan gambar resolusi sedang (tidak terlalu besar).

---

## 📞 SUPPORT

Jika ada masalah:

1. **Check Browser Console**:
   - Press F12
   - Lihat tab Console untuk error

2. **Check PHP Error Log**:
   - Location: `C:\xampp\apache\logs\error.log`
   - Atau di phpMyAdmin SQL tab

3. **Test API Manual**:
   - Gunakan Postman atau browser
   - Test endpoint satu per satu

---

## 🎉 SELESAI!

Aplikasi Anime Collection siap digunakan!

**URL Aplikasi**: `http://localhost/anime-collection/`

**Sample Login** (if applicable): Tidak ada login, langsung pakai.

**Data Sample**: 12 anime sudah ter-load otomatis dari `database.sql`

---

## 📝 CHANGELOG

### Version 1.0.0 (Latest)
- ✅ 6 kategori mutually exclusive
- ✅ Upload poster anime
- ✅ Upload multiple gambar tokoh (max 6)
- ✅ Export PDF dengan gambar lengkap
- ✅ CRUD operations
- ✅ Search functionality
- ✅ Real-time statistics
- ✅ Responsive design
- ✅ Sample data included

---

## 📄 LICENSE

Free to use for personal projects.

---

Made with ❤️ for anime lovers! 🎌

Enjoy your anime collection management! 🚀