import express from 'express';
import { uploadPdf } from '../controllers/uploads.js';

const router = express.Router();
router.post('/', uploadPdf);

// Используем именованный экспорт вместо default
export default router;