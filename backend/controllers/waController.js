const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
const log = require('../utils/logger');
const db = require('../config/db');
const axios = require('axios');
require('dotenv').config();

let qrCodeData = null;
let isReady = false;

const client = new Client({
          authStrategy: new LocalAuth({ dataPath: './wwebjs_auth' }),
          puppeteer: { headless: true, args: ['--no-sandbox'] }
});

client.on('qr', qr => {
          qrcode.toDataURL(qr, (err, url) => {
                    qrCodeData = url;
                    log('📲 Menunggu QR Code');
          });
});

client.on('ready', () => {
          isReady = true;
          log('📱 WhatsApp Siap!');
});

client.on('message', msg => {
          log(`💌 Pesan Masuk Dari ${msg.from}`);
          axios.post(process.env.WEBHOOK_URL, {
                    from: msg.from,
                    body: msg.body
          }).catch(() => { });
});

client.initialize();

exports.getQR = (req, res) => {
          if (isReady) return res.json({ ready: true });
          if (qrCodeData) return res.json({ qr: qrCodeData });
          res.json({ message: '📲 Menunggu QR Code' });
};

exports.sendMessage = (req, res) => {
          const { number, message } = req.body;
          const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
          client.sendMessage(chatId, message).then(() => {
                    log(`📨 Pesan Dikirim Manual Ke ${number}`);
                    res.json({ message: '✅ Pesan Terkirim' });
          }).catch(err => {
                    log(`❌ Gagal Kirim Pesan: ${err}`);
                    res.status(500).json({ message: '❌ Gagal Kirim' });
          });
};

exports.logout = (req, res) => {
          client.logout().then(() => {
                    log('📴 Logout Berhasil');
                    res.json({ message: '✅ Logout Berhasil' });
          });
};