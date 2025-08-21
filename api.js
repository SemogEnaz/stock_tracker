const express = require('express')
const router = express.Router()

const frontendUrl = process.env.FRONTEND_ORIGIN;

router.get('addItem/:id', (req, res) => {
    const { id } = req.params;
    res.redirect(`${frontendUrl}/${encodeURIComponent(id)}`);
});

router.get('/addPhoto/:id', (req, res) => {
    const { id } = req.params;
    res.redirect(`${frontendUrl}/addPhotos/${encodeURIComponent(id)}`)
});

module.exports = router;