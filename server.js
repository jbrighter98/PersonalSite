const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log("Rendering home page...");

    let items = [];
    
    try {
        const rawData = fs.readFileSync(path.join(__dirname, 'portfolio.json'), 'utf-8');
        items = JSON.parse(rawData);

        // Sort descending by date (newest first)
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (err) {
        console.error('Error reading/parsing JSON:', err);
        items = []; // fail gracefully
    }

    res.render('index', { items });
});

const projectRoutes = require('./routes/projects');

app.use('/projects', projectRoutes);

app.listen(3000)