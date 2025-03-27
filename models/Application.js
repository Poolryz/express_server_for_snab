import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    number: { type: Number, unique: true },
    responsible: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
    invoices: {
        company: String,
        number: String,
        date: String,
        amount: Number,
        chois: Boolean
    },
    payment: {
        company: String,
        number: String,
        date: String,
        amount: Number
    },
    receipt: {
        company: String,
        number: String,
        date: String,
        items: [{
            name: String,
            quantity: Number,
            price: Number,
            warehouse: String,
            amount: Number
        }]
    }
});
ApplicationSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        // Автоматически удаляем связанные файлы при удалении заявки
        await mongoose.model('PdfFile').deleteMany({ applicationId: doc._id });
    }
});

export default mongoose.model('Application', ApplicationSchema);