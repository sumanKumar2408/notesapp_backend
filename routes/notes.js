const express = require('express');
const router = express.Router();

const {getNotes, createNotes, updateNotes, deleteNotes} = require('../controllers/notes.js');

const authenticate = require('../middleware/authenticate.js');

router.get('/notes', authenticate,  getNotes);
router.post('/notes', authenticate, createNotes);
router.patch('/notes/:id', authenticate, updateNotes);
router.delete('/notes/:id', authenticate, deleteNotes);

module.exports = router;