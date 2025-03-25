import express from 'express';
import { getApplications } from '../controllers/applications.js';

const router = express.Router();
router.get('/', getApplications);

export default router;