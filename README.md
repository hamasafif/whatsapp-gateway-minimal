# WhatsApp Gateway Minimal

Proyek ini adalah implementasi sederhana WhatsApp Gateway menggunakan **Node.js**, **Express**, dan **Baileys**. Dirancang minimalis agar mudah dipahami, digunakan, dan dikembangkan untuk kebutuhan integrasi WhatsApp.

---

## 🚀 Fitur

- Login via QR Code untuk koneksi WhatsApp Web
- Manajemen session (disimpan di folder lokal)
- API untuk mengirim pesan teks
- Dashboard frontend sederhana
- Database MySQL untuk menyimpan data session

---

## 📂 Struktur Proyek

.
├── backend/ # Kode server (Express + Baileys)
├── frontend/ # UI dashboard
├── .env.example # Contoh konfigurasi environment
├── database.sql # Skrip SQL untuk setup database
├── package.json # Dependensi Node.js
└── README.md

yaml
Copy code

---

## ⚙️ Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/hamasafif/whatsapp-gateway-minimal.git
   cd whatsapp-gateway-minimal
Install dependencies

bash
Copy code
npm install
# atau
yarn install
Setup environment
Salin file .env.example menjadi .env, lalu sesuaikan konfigurasi:

ini
Copy code
HOST=http://localhost:3000
SESSION_NAME=session_1
AUTO_START=n
PREFIX=.
SESSION_PATH=./session
LOG_PATH=./public/log
DB_NAME=wa_gateway
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
Setup database
Buat database baru dan jalankan skrip database.sql untuk membuat tabel.

Jalankan aplikasi

bash
Copy code
npm start
Akses dashboard
Buka browser ke http://localhost:3000.

📡 API
Method	Endpoint	Deskripsi
POST	/api/sendMessage	Mengirim pesan WhatsApp
GET	/api/qrcode	Mendapatkan QR untuk login
GET	/api/session	Status session WhatsApp

Contoh request:

http
Copy code
POST /api/sendMessage
Content-Type: application/json

{
  "to": "6281234567890",
  "message": "Halo dari WhatsApp Gateway Minimal!"
}
Contoh response:

json
Copy code
{
  "success": true,
  "to": "6281234567890",
  "messageId": "XYZ123"
}
🔑 Konfigurasi Penting
AUTO_START=y → Session otomatis login saat server jalan

SESSION_PATH → Lokasi penyimpanan file session

DB_* → Koneksi database MySQL

PREFIX → Prefix command (opsional)

🛠️ Pengembangan
Tambahkan endpoint baru di folder backend/ untuk fitur tambahan (misalnya kirim media).

Modifikasi frontend/ untuk mempercantik dashboard.

Gunakan PM2 atau Docker untuk deployment di server produksi.

🤝 Kontribusi
Silakan fork repository ini, buat branch baru, lalu ajukan pull request.

📜 Lisensi
Belum ada lisensi yang ditentukan.
Silakan tambahkan file LICENSE jika ingin dibagikan dengan lisensi tertentu.

✨ Penutup
Proyek WhatsApp Gateway Minimal ini bisa menjadi fondasi ringan untuk integrasi WhatsApp — baik untuk notifikasi, customer support, atau automasi sederhana.
