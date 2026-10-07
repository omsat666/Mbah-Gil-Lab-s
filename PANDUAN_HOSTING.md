# 🚀 Panduan Lengkap Deploy Digital Research Assistant ke Hosting

Folder ini adalah paket **Full-Stack Production-Ready** yang sudah siap di-upload ke server hosting, VPS, cloud, maupun Docker. Seluruh aset frontend telah dikompilasi, backend Express sudah terkonfigurasi, dan database SQLite terpasang secara utuh.

---

## 📋 Pilihan Metode Hosting

| Metode Hosting | Rekomendasi Penggunaan | Layanan Contoh |
| :--- | :--- | :--- |
| **1. cPanel Node.js Selector** | Pengguna hosting lokal Indonesia | Niagahoster, DomaiNesia, IDCloudHost, Hostinger, Rumahweb |
| **2. Cloud Platform Gratis** | Deploy cepat, gratis HTTPS SSL | Render.com, Railway.app, Fly.io |
| **3. VPS Linux (Ubuntu/Debian)** | Server mandiri dengan PM2 + Nginx | DigitalOcean, Linode, AWS EC2, IDCloudHost VPS |
| **4. Docker / Docker Compose** | Deploy 1-klik di container | Portainer, CapRover, Coolify, Docker Engine |
| **5. Shared Hosting Biasa (`public_html`)** | Upload file statis langsung | Apache / LiteSpeed cPanel File Manager |

---

## 🛠️ 1. Deploy di cPanel (Node.js Selector)

1. **Kompres folder ini** menjadi file ZIP (`digital-research-assistant.zip`).
2. Masuk ke **cPanel** hosting Anda, lalu buka **File Manager**.
3. Buat folder baru bernama `research-app` (di luar `public_html` atau di home directory `/home/username/research-app`).
4. **Upload** file ZIP dan klik **Extract** di dalam folder `research-app`.
5. Kembali ke menu utama cPanel, klik menu **Setup Node.js App**.
6. Klik **Create Application**:
   - **Node.js version**: Pilih `20.x` atau `22.x`
   - **Application mode**: `Production`
   - **Application root**: `research-app`
   - **Application URL**: Pilih subdomain atau domain (misal: `research.domainanda.com`)
   - **Application startup file**: `server.js` (atau `app.js`)
7. Klik **CREATE**.
8. Klik tombol **Run NPM Install** untuk memastikan seluruh library terpasang.
9. Klik **Restart / Start Application**.
10. Buka domain/subdomain Anda di browser.

---

## ☁️ 2. Deploy di Cloud Gratis (Render.com)

1. Buat akun di [Render.com](https://render.com).
2. Buat repository di GitHub Anda, lalu push isi folder ini ke GitHub.
3. Di Render Dashboard, pilih **New +** -> **Web Service**.
4. Hubungkan ke repositori GitHub Anda.
5. Konfigurasi:
   - **Runtime**: `Node`
   - **Build Command**: `npm install --omit=dev`
   - **Start Command**: `node server.js`
6. Klik **Create Web Service**. Render akan otomatis memberikan URL HTTPS online aktif.

---

## 🖥️ 3. Deploy di VPS Linux (PM2 + Nginx)

1. Upload folder ke server:
   ```bash
   scp -r DIGITAL_RESEARCH_ASSISTANT_HOSTING user@ip-server:/var/www/digital-research-assistant
   ```
2. Hubungkan via SSH:
   ```bash
   cd /var/www/digital-research-assistant
   npm install --omit=dev
   ```
3. Jalankan aplikasi di background menggunakan **PM2**:
   ```bash
   npm install -g pm2
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   ```
4. Pasang Nginx Reverse Proxy (gunakan template `nginx.example.conf`):
   ```bash
   sudo cp nginx.example.conf /etc/nginx/sites-available/research-assistant
   sudo ln -s /etc/nginx/sites-available/research-assistant /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
5. Pasang SSL gratis:
   ```bash
   sudo certbot --nginx -d research.domainanda.com
   ```

---

## 🐳 4. Deploy dengan Docker Compose

Cukup jalankan satu perintah di direktori ini:
```bash
docker compose up -d --build
```
Aplikasi langsung berjalan di port `3001` (`http://ip-server:3001`).

---

## 📁 5. Deploy Statis ke `public_html` (Shared Hosting Biasa)

Jika hosting Anda tidak menyediakan Node.js:
1. Buka subfolder `STATIC_WEB_HOSTING_HTML/`.
2. Upload seluruh isinya langsung ke folder `public_html` di cPanel File Manager.
3. File `.htaccess` yang telah disediakan akan otomatis mengatur routing Single Page Application (SPA).

---

## 📦 Struktur Berkas Paket Hosting

- `server.js` : Entry point Node.js untuk hosting (cPanel & cloud)
- `app.js` : Alias entry point cPanel
- `package.json` : Manifest dependensi produksi
- `.env` : Konfigurasi port & environment
- `database.sqlite` : Database SQLite terisi data riset awal
- `ecosystem.config.cjs` : Konfigurasi PM2 Process Manager
- `Procfile` : Konfigurasi cloud PaaS
- `Dockerfile` & `docker-compose.yml` : Konfigurasi container Docker
- `nginx.example.conf` : Template konfigurasi Nginx Reverse Proxy
- `dist/` : Frontend UI yang sudah dikompilasi (HTML/CSS/JS)
- `server/` : Backend API, SQLite database handler, ChatGPT live fetcher
- `node_modules/` : Pustaka produksi yang sudah terinstal
- `STATIC_WEB_HOSTING_HTML/` : Paket khusus upload ke Apache `public_html`
