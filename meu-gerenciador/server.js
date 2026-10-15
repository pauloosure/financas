const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// URL do seu Google Apps Script Web App
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuYr2Wd4YHlYNVN6f9TusyxLwfY0KI7CjvAjMK_K5atPZIUK1ttCaOQGtEiT-TYTDV/exec";

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota proxy para se comunicar com o Google Apps Script sem CORS
app.all('/api/proxy', async (req, res) => {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ result: "error", message: error.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});