const express = require('express')
const router = express.Router()

const frontendUrl = process.env.FRONTEND_ORIGIN;

router.get('/addItem/:id', (req, res) => {
    const { id } = req.params;
    res.redirect(`${frontendUrl}/addItem/${encodeURIComponent(id)}`);
});

router.get('/addPhotos/:id', (req, res) => {
    const { id } = req.params;
    res.redirect(`${frontendUrl}/addPhotos/${encodeURIComponent(id)}`)
});

module.exports = router;