import express from 'express';
import {
    getApplications,
    getApplicationById,
    createApplication,
    deleteApplication
} from '../controllers/applications.js';

const router = express.Router();

// GET /api/applications - все заявки
router.get('/', getApplications);

// GET /api/applications/:id - конкретная заявка
router.get('/:id', getApplicationById);

// POST /api/applications - создание заявки
router.post('/', createApplication);

router.delete('/:id', deleteApplication);

export default router;