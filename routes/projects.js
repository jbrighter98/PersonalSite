const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Rendering projects page...");

    let items = [];

    try {
        const rawData = fs.readFileSync(path.join(__dirname, '../portfolio.json'), 'utf-8');
        items = JSON.parse(rawData);

        // Sort descending by date (newest first)
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (err) {
        console.error('Error reading/parsing JSON:', err);
        items = []; // fail gracefully
    }

    res.render('projects/portfolio', { items });
});


router.route('/:id')
    .get((req, res) => {
        let idArray = req.params.id.split('.');
        if (idArray.length > 1) {
            if (idArray[0] === 'GravitySimRun') {
                res.sendFile(path.join(__dirname, `../public/project_public/SimProj/${idArray[0]}.${idArray[1]}`));
            } else {
                res.sendFile(path.join(__dirname, `../public/project_public/${idArray[0]}.${idArray[1]}`));
            }
        } else {
            if (idArray[0] === 'GravitySimRun') {
                res.sendFile(path.join(__dirname, `../public/project_public/SimProj/${idArray[0]}.html`));
            } else {
                res.sendFile(path.join(__dirname, `../public/project_public/${idArray[0]}.html`));
            }
        }
    });



module.exports = router;