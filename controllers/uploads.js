import multer from 'multer';
import PdfFile from '../models/PdfFile.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Получаем __dirname в ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Настройка Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('file');

export const uploadPdf = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const pdfFile = new PdfFile({
            filename: req.file.filename,
            path: req.file.path,
            applicationId: req.body.applicationId
        });

        try {
            await pdfFile.save();
            res.status(201).json({
                message: 'File uploaded successfully',
                file: {
                    id: pdfFile._id,
                    filename: pdfFile.filename,
                    path: pdfFile.path,
                    applicationId: pdfFile.applicationId
                }
            });
        } catch (error) {
            res.status(400).json({
                error: 'Failed to save file info',
                details: error.message
            });
        }
    });
};