import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    title: String,
    number: Number,
    responsible: String,
    status: String,
    date: String,
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

export default mongoose.model('Application', ApplicationSchema);