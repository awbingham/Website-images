const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const imagesFolderPath = path.join(__dirname, 'images'); // Since server.js is inside Website-images

// Serve static files (images)
app.use('/images', express.static(imagesFolderPath));

// Route to get all image filenames
app.get('/get-images', (req, res) => {
    fs.readdir(imagesFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading images folder:', err);
            return res.status(500).send('Unable to read images folder');
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|bmp)$/i.test(file));
        res.json(imageFiles);
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});