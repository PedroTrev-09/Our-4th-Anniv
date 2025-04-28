document.addEventListener('DOMContentLoaded', () => {
    // Ambil semua elemen yang dibutuhkan
    const startButton = document.getElementById('startButton');
    const introText = document.getElementById('introText');
    const showHabitsButton = document.getElementById('showHabitsButton');
    const habitsSection = document.getElementById('habitsSection');
    const showGoodHabitsButton = document.getElementById('showGoodHabitsButton');
    const showBadHabitsButton = document.getElementById('showBadHabitsButton');
    const goodHabits = document.getElementById('goodHabits');
    const badHabits = document.getElementById('badHabits');
    const nextFromGoodHabits = document.getElementById('nextFromGoodHabits');
    const nextFromBadHabits = document.getElementById('nextFromBadHabits');
    const messageButtonContainer = document.getElementById('messageButtonContainer');
    const showMessageButton = document.getElementById('showMessageButton');
    const messageSection = document.getElementById('messageSection');
    const finalButton = document.getElementById('finalButton');
    const finalNote = document.getElementById('finalNote');

    // Helper function untuk menampilkan elemen
    function showElement(element) {
        element.classList.remove('hidden');
        // Sedikit delay agar transisi CSS bisa berjalan
        setTimeout(() => {
             element.classList.add('visible');
        }, 10);
    }

    // Helper function untuk menyembunyikan elemen
    function hideElement(element) {
        element.classList.remove('visible');
        // Tunggu transisi selesai sebelum benar-benar menyembunyikan
         setTimeout(() => {
            if (!element.classList.contains('visible')) { // Cek lagi kalau-kalau ada race condition
                element.classList.add('hidden');
            }
        }, 600); // Sesuaikan dengan durasi transisi di CSS (0.6s)
    }

    let goodHabitsShown = false;
    let badHabitsShown = false;

    // Fungsi untuk cek apakah kedua habit sudah ditampilkan
    function checkHabitsCompletion() {
        if (goodHabitsShown && badHabitsShown) {
            hideElement(showGoodHabitsButton);
            hideElement(showBadHabitsButton);
            hideElement(nextFromGoodHabits); // Sembunyikan tombol lanjut jika ada
            hideElement(nextFromBadHabits); // Sembunyikan tombol lanjut jika ada
            showElement(messageButtonContainer); // Tampilkan tombol menuju pesan
        }
    }

    // 1. Klik Tombol Mulai
    startButton.addEventListener('click', () => {
        hideElement(startButton);
        showElement(introText);
    });

    // 2. Klik Tombol "Tentang Kita Berdua?"
    showHabitsButton.addEventListener('click', () => {
        hideElement(introText);
        showElement(habitsSection);
    });

    // 3. Klik Tombol "Yang Perlu Dipertahanin"
    showGoodHabitsButton.addEventListener('click', () => {
        hideElement(badHabits); // Sembunyikan habit lain jika terbuka
        showElement(goodHabits);
        // Jangan sembunyikan tombol habit utama dulu
        // Tandai sudah dilihat
        if (!goodHabitsShown) {
            goodHabitsShown = true;
            // Jangan langsung cek completion, tunggu tombol next diklik
        }
    });

    // 4. Klik Tombol "Yang Perlu Diubah"
    showBadHabitsButton.addEventListener('click', () => {
        hideElement(goodHabits); // Sembunyikan habit lain jika terbuka
        showElement(badHabits);
        // Jangan sembunyikan tombol habit utama dulu
         // Tandai sudah dilihat
        if (!badHabitsShown) {
            badHabitsShown = true;
             // Jangan langsung cek completion, tunggu tombol next diklik
        }
    });

     // 5. Klik Tombol "Lanjut?" dari Good Habits
    nextFromGoodHabits.addEventListener('click', () => {
        hideElement(goodHabits); // Sembunyikan box good habits
        checkHabitsCompletion(); // Cek apakah sudah bisa lanjut ke pesan
    });

     // 6. Klik Tombol "Oke, aku paham..." dari Bad Habits
    nextFromBadHabits.addEventListener('click', () => {
        hideElement(badHabits); // Sembunyikan box bad habits
        checkHabitsCompletion(); // Cek apakah sudah bisa lanjut ke pesan
    });


    // 7. Klik Tombol "Ada Pesan Spesial Nih..."
    showMessageButton.addEventListener('click', () => {
        hideElement(messageButtonContainer);
        hideElement(habitsSection); // Sembunyikan seluruh section habits
        showElement(messageSection);
    });

    // 8. Klik Tombol "Satu hal terakhir..."
    finalButton.addEventListener('click', () => {
        hideElement(finalButton); // Sembunyikan tombol ini
        showElement(finalNote); // Tampilkan ucapan final
    });

});