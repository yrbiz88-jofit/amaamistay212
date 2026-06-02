const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable', // Opsional, coba hapus jika masih error
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // Penting untuk menghemat RAM di Render
            '--disable-gpu'
        ],
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Silahkan scan QR Code ini untuk mengaktifkan Bot Kos-Kosan:');
});

client.on('ready', () => {
    console.log('Bot WA Manajemen Kos-Kosan sudah aktif!');
});

client.on('message', async (msg) => {
    // Mengubah pesan menjadi huruf kecil dan menghapus spasi di awal/akhir
    const pesanUser = msg.body.toLowerCase().trim();

    // Daftar semua kata sapaan yang mungkin diketik oleh calon penghuni
    const kataSapaan = [
        'halo', 'hello', 'menu', 'p', 'info', 'permisi', 'misi', 'test', 'tes',
        'assalamualaikum', 'assalamu\'alaikum', 'samlekom', 'askum',
        'pagi', 'selamat pagi', 'siang', 'selamat siang', 'sore', 'selamat sore', 'malam', 'selamat malam',
        'min', 'admin', 'gan', 'bos', 'kak', 'kakak', 'bro', 'sis', 'spada'
    ];

    // 1. Menu Utama / Menyapa Bot
    // Mengecek apakah pesan user ada di dalam daftar kataSapaan ATAU mengandung kata sapaan tertentu
    if (kataSapaan.includes(pesanUser) || pesanUser.startsWith('pagi') || pesanUser.startsWith('siang') || pesanUser.startsWith('sore') || pesanUser.startsWith('malam')) {
        const menuUtama = `Selamat datang di *Kost AmaAmi Stay*! 🏡✨\n` +
                          `Ada yang bisa kami bantu? Silahkan balas dengan mengetik *nomor menu* di bawah ini:\n\n` +
                          `*1.* Cek Kamar & Fasilitas 🛏️\n` +
                          `*2.* Harga Sewa & Ketersediaan 💰\n` +
                          `*3.* Lokasi Kos 📍\n` +
                          `*4.* Cara Booking / Pesan Kamar 📝\n` +
                          `*5.* Hubungi Pemilik / Admin 👤\n\n` +
                          `_Ketik *MENU* kapan saja untuk kembali ke pilihan ini._`;
        
        await msg.reply(menuUtama);
    }

    // 2. Respon Menu 1: Fasilitas
    else if (pesanUser === '1') {
        const infoFasilitas = `*🏡 Fasilitas Kost AmaAmi Stay:*\n\n` +
                              `• Kamar Mandi Dalam, air panas dingin (Shower & Kloset Duduk)\n` +
                              `• Kasur Springbed\n` +
                              `• AC & Free WiFi\n` +
                              `• Parkir Aman (CCTV 24 Jam)`;
        
        await msg.reply(infoFasilitas);
    }

    // 3. Respon Menu 2: Harga & Ketersediaan
    else if (pesanUser === '2') {
        const infoHarga = `*💰 Tarif Sewa Kost AmaAmi Stay:*\n\n` +
                          `• *Bulanan:* Rp 1.500.000 / bulan, untuk harian hubungi admin 087770772756\n\n` +
                          `_Biaya sudah termasuk air dan wifi. Listrik menggunakan token masing-masing._`;
        
        await msg.reply(infoHarga);
    }

    // 4. Respon Menu 3: Lokasi
    else if (pesanUser === '3') {
        const infoLokasi = `*📍 Lokasi Kost AmaAmi Stay:*\n\n` +
                           `Tegalyasan 4/4 Tegalarum, Sempu, Banyuwangi.\n\n` +
                           `*Link Google Maps:* https://maps.app.goo.gl/mwBuUTqA9deBn7Ne9`;
        
        await msg.reply(infoLokasi);
    }

    // 5. Respon Menu 4: Format Booking
    else if (pesanUser === '4') {
        const formatBooking = `*📝 Format Pemesanan Kamar Kos:*\n\n` +
                              `Untuk melakukan booking, silahkan salin, isi, dan kirimkan data berikut:\n\n` +
                              `Nama Lengkap:\n` +
                              `No. HP/WA:\n` +
                              `Tanggal Rencana Masuk:\n\n` +
                              `Setelah mengirim data di atas, Admin akan mengirimkan nomor rekening untuk DP penanda jadi.`;
        
        await msg.reply(formatBooking);
    }

    // 6. Respon Menu 5: Hubungi Admin
    else if (pesanUser === '5') {
        await msg.reply('Silahkan tunggu sebentar, pesan Anda akan segera diteruskan ke Admin/Pemilik kos secara personal. Terima kasih! 🙏');
    }
});

client.initialize();