const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint untuk mendapatkan pesan
app.get('/server.json', (req, res) => {
    fs.readFile(path.join(__dirname, 'server.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read messages' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint untuk mengirim pesan
app.post('/server.json', (req, res) => {
    const newMessage = req.body;

    fs.readFile(path.join(__dirname, 'server.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read messages' });
            return;
        }

        const messages = JSON.parse(data);
        messages.messages.push(newMessage);
        
        fs.writeFile(path.join(__dirname, 'server.json'), JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                res.status(500).json({ error: 'Failed to save message' });
                return;
            }
            res.status(200).json(newMessage);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
