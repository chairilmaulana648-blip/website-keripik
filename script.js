// Mengambil elemen-elemen modal dari HTML
const modal = document.getElementById("modalPesan");
const btnPesanNav = document.getElementById("btnPesanNav");
const closeModal = document.getElementById("closeModal");
const formPemesanan = document.getElementById("formPemesanan");
const pilihanVarian = Array.from(formPemesanan.querySelectorAll('input[name="varian"]'));

pilihanVarian.forEach((checkbox) => {
  const jumlah = document.getElementById(`jumlah-${checkbox.id.replace("varian-", "")}`);

  checkbox.addEventListener("change", () => {
    jumlah.disabled = !checkbox.checked;
    jumlah.required = checkbox.checked;
  });
});

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
  const checkbox = pilihanVarian.find((item) => item.value === namaVarian);
  if (checkbox) {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));
  }
  modal.style.display = "flex";
}

// Fungsi mengirim pesanan ke WhatsApp saat form disubmit
formPemesanan.onsubmit = function(e) {
  e.preventDefault(); // Mencegah halaman refresh
  
  const nama = document.getElementById("nama").value;
  const pesanan = pilihanVarian
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => {
      const idJumlah = `jumlah-${checkbox.id.replace("varian-", "")}`;
      const jumlah = document.getElementById(idJumlah).value;
      return `- ${checkbox.value}: ${jumlah} bungkus`;
    });

  if (pesanan.length === 0) {
    alert("Pilih minimal satu varian sebelum mengirim pesanan.");
    return;
  }
  
  // Nomor WhatsApp tujuan (ganti dengan nomor Anda)
  const nomorWA = "6285134586521"; 
  
  // Format pesan WhatsApp
  const pesan = `Halo Admin, saya mau pesan Keripik:\n- Nama: ${nama}\n${pesanan.join("\n")}`;
  
  // Buka link WhatsApp di tab baru
  window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, "_blank");
}