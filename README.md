# systemKasKartar-LaravelFilament

Aplikasi manajemen keuangan organisasi Karang Taruna Desa Sumberdawesari berbasis web, dibangun untuk mendukung transparansi dan efisiensi dalam pencatatan serta pelaporan transaksi keuangan.

---

## ✨ Fitur Utama

- ✅ Manajemen transaksi: pendapatan dan pengeluaran
- 📂 Kategori keuangan yang fleksibel
- 👥 Role pengguna: Admin Admin Finance & Member
- 📊 Dashboard laporan keuangan interaktif (Filament)
- 🔐 Autentikasi pengguna menggunakan Laravel Breeze

---

## 🛠️ Teknologi yang Digunakan

| Layer      | Teknologi                                    |
|------------|----------------------------------------------|
| Frontend   | Vite + React + TypeScript + Tailwind CSS + [shadcn/ui](https://ui.shadcn.dev) |
| Backend    | Laravel 12 + Inertia.js + Laravel Breeze     |
| Admin Panel| Laravel Filament                             |
| Database   | MySQL                                        |

---

## 📁 Struktur Aplikasi

- `/resources/js` – Halaman frontend publik (contoh: `/finance`) dibangun dengan React + shadcn
- `/app/Filament` – Halaman admin berbasis Laravel Filament
- `/database` – Struktur migrasi tabel: Users, Categories, Transactions
- `/routes/web.php` – Routing utama berbasis Inertia.js

---

## 🚀 Cara Menjalankan Proyek

### Persiapan Awal
1. **Clone repositori:**
   ```bash
   git clone https://github.com/tado3002/systemKasKartar-LaravelFilament.git
   cd systemKasKartar-LaravelFilament
   ```
2. **Install dependensi PHP & JavaScript:**
    ```bash
    composer install
    npm install
    ```
3. **Salin dan sesuaikan file environment:**
    ```dotenv
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=kas_kartar
    DB_USERNAME=root
    DB_PASSWORD=
    ```
4. **Migrasi & seed database:**
    ```dotenv
    php artisan migrate --seed
    ```
5. **Buat symbolic link untuk akses file dari storage::**
    ```dotenv
    php artisan storage:link
    ```

### Mode Development

    **Akan menjalankan backend Laravel dan Vite secara bersamaan**
```bash
    composer run dev
```

### Production

```bash
    npm run build
    php artisan serve
```

## Authentikasi
    - Sistem login menggunakan Laravel Breeze dengan Inertia.js.
    - Pengguna yang login akan diarahkan ke halaman sesuai rolenya (Admin ke Filament, Member ke frontend publik).

    >Untuk menambahkan data user dengan role admin, karena hanya role admin yang bisa menambahkan user
    , maka gunakan seeder dari laravel


    **Ketikan perintah**
```bash
    php artisan db:seed UserAdminSeeder
```

    ## Demo Account

    | Role   | Email                                           | Password      |
    | ------ | ----------------------------------------------- | --------------|
    | admin  | [myAdmin@gmail.com]                             | adminpassword |
    

## Struktur Table

    | Tabel          | Deskripsi                             |
    | -------------- | ------------------------------------- |
    | `users`        | Data pengguna aplikasi                |
    | `categories`   | Kategori transaksi (Income / Expense) |
    | `transactions` | Catatan transaksi keuangan            |

## Note 

    - Halaman publik seperti /finance dirender melalui Inertia dan dibangun dengan React + ShadCN.
    - Panel admin (dashboard dan CRUD data) sepenuhnya dikendalikan melalui Laravel Filament.

---

## 📬 Kontak

Jika ada pertanyaan, saran, atau ingin kolaborasi, silakan hubungi saya melalui:

- Instagram: [@tdh.schwarzen](https://instagram.com/tdh.schwarzen)

