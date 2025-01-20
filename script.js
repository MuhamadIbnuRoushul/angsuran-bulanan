function formatRupiah(angka) {    
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);    
}    

function bulatkanKeGenap(angka) {    
    return Math.round(angka / 1000) * 1000; // Pembulatan ke genap terdekat    
}    

function hitungAngsuran() {    
    // Ambil nilai dari input    
    const otr = parseFloat(document.getElementById('otr').value);    
    const dpPersen = parseFloat(document.getElementById('dp').value) / 100;    
    const tenure = parseInt(document.getElementById('tenure').value);    

    // Validasi input    
    if (otr <= 0 || dpPersen < 0 || dpPersen > 1 || tenure <= 0) {    
        alert("Silakan masukkan nilai yang valid.");    
        return;    
    }    

    // Hitung Down Payment    
    const dp = otr * dpPersen;    

    // Hitung Pokok Utang    
    const pokokUtang = otr - dp;    

    // Tentukan bunga berdasarkan jangka waktu    
    let bungaPersen;    
    if (tenure <= 12) {    
        bungaPersen = 0.12; // 12%    
    } else if (tenure > 12 && tenure <= 24) {    
        bungaPersen = 0.14; // 14%    
    } else {    
        bungaPersen = 0.165; // 16.5%    
    }    

    // Hitung Total Bunga    
    const bungaTotal = pokokUtang * bungaPersen * (tenure / 12);    

    // Hitung Total yang Harus Dibayar    
    const totalBayar = pokokUtang + bungaTotal;    

    // Hitung Angsuran Bulanan dan bulatkan ke genap    
    const angsuranBulanan = bulatkanKeGenap(totalBayar / tenure);    

    // Tampilkan hasil    
    document.getElementById('hasil').innerHTML = `    
        Angsuran Bulanan: ${formatRupiah(angsuranBulanan)}    
          
    `;
    // <br>Total Pokok Utang: ${formatRupiah(pokokUtang)}    
    // <br>Total Bunga: ${formatRupiah(bungaTotal)}    
    // <br>Total yang Harus Dibayar: ${formatRupiah(totalBayar)}  

    

    // Buat jadwal pembayaran    
    const jadwalTbody = document.querySelector('#jadwal tbody');    
    jadwalTbody.innerHTML = ''; // Kosongkan tabel sebelum mengisi ulang    

    const today = new Date();    
    for (let i = 1; i <= tenure; i++) {    
        const dueDate = new Date(today);    
        dueDate.setMonth(today.getMonth() + i);    
        dueDate.setDate(25); // Set tanggal jatuh tempo ke tanggal 25    

        const row = document.createElement('tr');    
        row.innerHTML = `    
            <td>AGR00001</td>    
            <td>${i}</td>    
            <td>${formatRupiah(angsuranBulanan)}</td>    
            <td>${dueDate.toLocaleDateString('id-ID')}</td>    
        `;    
        jadwalTbody.appendChild(row);    
    }    
}    

function resetForm() {  
    document.getElementById('otr').value = 240000000;  
    document.getElementById('dp').value = 20;  
    document.getElementById('tenure').value = 18;  
    document.getElementById('hasil').innerHTML = '';  
    document.querySelector('#jadwal tbody').innerHTML = '';  
}  