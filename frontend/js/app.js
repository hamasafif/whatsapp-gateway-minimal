/* ==========================================================
 *  WA-GATEWAY  |  frontend/js/app.js  (re-make)
 *  Tema hacker neon – full emoji log
 * ========================================================== */

/* 1. Base URL otomatis: kalau UI dibuka lewat IP/domain, ikut mengikuti */
const API = (() => {
          const { protocol, hostname, port } = window.location;
          return `${protocol}//${hostname}${port ? ':' + 5001 : ''}/api`;
})();

console.log('🌐 Frontend API base:', API);

/* 2. Helper – kirim JSON dengan error handling */
async function apiCall(endpoint, payload = {}) {
          const url = `${API}${endpoint}`;
          console.log('📡 FETCH', url, payload);

          try {
                    const res = await fetch(url, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(payload)
                    });

                    console.log('📥 HTTP status:', res.status);
                    const data = await res.json();
                    console.log('📦 Server reply:', data);

                    if (!res.ok) throw new Error(data.message || 'Unknown error');
                    return data;
          } catch (err) {
                    console.error('❌ Fetch error:', err);
                    alert('❌ ' + err.message);
                    throw err;
          }
}

/* 3. Register */
async function register() {
          const username = document.getElementById('username')?.value.trim();
          const password = document.getElementById('password')?.value.trim();

          if (!username || !password) return alert('⚠️ Isi username & password!');

          try {
                    await apiCall('/auth/register', { username, password });
                    alert('✅ Register berhasil – silakan login');
                    window.location.href = 'login.html';
          } catch { }
}

/* 4. Login */
async function login() {
          const username = document.getElementById('username')?.value.trim();
          const password = document.getElementById('password')?.value.trim();

          if (!username || !password) return alert('⚠️ Isi username & password!');

          try {
                    const data = await apiCall('/auth/login', { username, password });
                    if (data.token) {
                              localStorage.setItem('token', data.token);
                              console.log('🔑 Token tersimpan');
                              window.location.href = 'dashboard.html';
                    }
          } catch { }
}

/* 5. Kirim pesan WhatsApp */
async function sendMessage() {
          const number = document.getElementById('number')?.value.trim();
          const message = document.getElementById('message')?.value.trim();
          const token = localStorage.getItem('token');

          if (!number || !message) return alert('⚠️ Isi nomor & pesan!');
          if (!token) return alert('⚠️ Silakan login ulang');

          try {
                    const res = await fetch(`${API}/wa/send`, {
                              method: 'POST',
                              headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': token
                              },
                              body: JSON.stringify({ number, message })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message);
                    alert('✅ Pesan terkirim');
                    document.getElementById('message').value = '';
          } catch (err) {
                    alert('❌ Gagal kirim: ' + err.message);
          }
}

/* 6. Logout aplikasi */
function logout() {
          localStorage.removeItem('token');
          console.log('👋 Token dihapus');
          window.location.href = 'login.html';
}

/* 7. Logout WhatsApp (hapus device) */
async function logoutWA() {
          const token = localStorage.getItem('token');
          if (!token) return alert('⚠️ Silakan login ulang');

          try {
                    const res = await fetch(`${API}/wa/logout`, {
                              method: 'POST',
                              headers: { 'Authorization': token }
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message);
                    alert('✅ Device WhatsApp berhasil dilepas');
          } catch (err) {
                    alert('❌ Gagal lepas device: ' + err.message);
          }
}

/* 8. Dashboard – ambil QR / status WhatsApp */
async function loadQR() {
          const token = localStorage.getItem('token');
          if (!token) return;

          try {
                    const res = await fetch(`${API}/wa/qr`, {
                              headers: { 'Authorization': token }
                    });
                    const data = await res.json();

                    const qrBox = document.getElementById('qr');
                    if (data.qr) {
                              qrBox.innerHTML = `<img src="${data.qr}" alt="QR" style="max-width:250px">`;
                              console.log('📲 QR code dimuat');
                    } else if (data.ready) {
                              qrBox.innerHTML = '<p>✅ WhatsApp sudah siap</p>';
                    } else {
                              qrBox.innerHTML = '<p>⏳ Menunggu QR ...</p>';
                              setTimeout(loadQR, 3000);   // auto-refresh tiap 3 detik
                    }
          } catch (err) {
                    console.error('❌ Gagal ambil QR:', err);
          }
}

/* 9. Auto-jalankan fungsi sesuai halaman */
window.addEventListener('DOMContentLoaded', () => {
          const path = window.location.pathname;
          if (path.includes('dashboard.html')) {
                    if (!localStorage.getItem('token')) {
                              alert('⚠️ Silakan login dulu');
                              window.location.href = 'login.html';
                              return;
                    }
                    loadQR();
          }
});