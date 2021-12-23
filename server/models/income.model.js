const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const IncomeSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: [true, 'El Mes es requerido'],
        unique: true
    },
    income: {
        type: Number,
        required: [true, 'El ingreso es requerido']
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: [true, 'La Empresa es requerida']
    }
}, { timestamps: true });

IncomeSchema.plugin(uniqueValidator, { message: 'La Ingreso debe ser único.' });

IncomeSchema.virtual('business', {
    ref: 'Business',
    localField: 'businessId',
    foreignField: '_id'
});

IncomeSchema.set('toObject', { virtuals: true });
IncomeSchema.set('toJSON', { virtuals: true });

const Income = mongoose.model("Income", IncomeSchema);

module.exports = Income;