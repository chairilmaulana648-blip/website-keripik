// Mengambil elemen-elemen modal dari HTML
const modal = document.getElementById("modalPesan");
const btnPesanNav = document.getElementById("btnPesanNav");
const closeModal = document.getElementById("closeModal");
const formPemesanan = document.getElementById("formPemesanan");
const selectVarian = document.getElementById("varian");

// Fungsi untuk membuka modal
btnPesanNav.onclick = function() {
  modal.style.display = "flex";
}

// Fungsi untuk menutup modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

// Menutup modal jika area luar kotak diklik
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Fungsi ketika tombol "Pilih" pada kartu produk diklik
function pilihProduk(namaVarian) {
  selectVarian.value = namaVarian; // Mengubah opsi dropdown sesuai varian yang dipilih
  modal.style.display = "flex";    // Membuka modal pemesanan
}

// Fungsi mengirim pesanan ke WhatsApp saat form disubmit
formPemesanan.onsubmit = function(e) {
  e.preventDefault(); // Mencegah halaman refresh
  
  const nama = document.getElementById("nama").value;
  const varian = selectVarian.value;
  const jumlah = document.getElementById("jumlah").value;
  
  // Nomor WhatsApp tujuan (ganti dengan nomor Anda)
  const nomorWA = "6285134586521"; 
  
  // Format pesan WhatsApp
  const pesan = `Halo Admin, saya mau pesan Keripik:%0A- Nama: ${nama}%0A- Varian: ${varian}%0A- Jumlah: ${jumlah} bungkus`;
  
  // Buka link WhatsApp di tab baru
  window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
}