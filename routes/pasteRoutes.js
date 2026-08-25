import express from 'express';
import protect from '../middleware/auth.js';
import { getPastes, createPaste, updatePaste, deletePaste } from '../controllers/pasteController.js';

const router = express.Router();

router.use(protect);

router.get('/', getPastes);
router.post('/', createPaste);
router.put('/:id', updatePaste);
router.delete('/:id', deletePaste);

export default router;