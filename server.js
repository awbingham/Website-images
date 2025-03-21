const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const imagesFolderPath = path.join(__dirname, 'images'); // Path to your 'images' folder

// Serve static files (images)
app.use('/images', express.static(imagesFolderPath));

// Route to get all image filenames in the 'images' folder
app.get('/get-images', (req, res) => {
    fs.readdir(imagesFolderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to read images folder');
        }
        // Filter out non-image files if needed
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|bmp)$/i.test(file));
        res.json(imageFiles);
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Path to your HTML file
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});