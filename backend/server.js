const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const waRoutes = require('./routes/waRoutes');
const log = require('./utils/logger');
require('dotenv').config();

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/wa', waRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
          log(`🚀 Koneksi Server http://localhost:${PORT}`);
});