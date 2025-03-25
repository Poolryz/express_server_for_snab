import mongoose from 'mongoose'

const PdfFileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const PdfFile = mongoose.model('PdfFile', PdfFileSchema);
export default PdfFile;