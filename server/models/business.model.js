const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const BusinessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El Nombre es requerido'],
        minlength: [3, 'El Nombre debe tener al menos 3 caracteres'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'La Descripcion es requerida'],
        minlength: [3, 'El Nombre debe tener al menos 3 caracteres'],
    },
    address: {
        type: String,
        required: [true, 'La Dirección es requerida']
    },
    email: {
        type: String,
        required: [true, 'Debe ingresar el Email de la empresa'],
        validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, 'El Email no es válido']
    },
    type: {
        type: String,
        required: [true, 'El Tipo de Empresa es requerido']
    },
    phone: {
        type: String,
        required: [true, 'El Teléfono es requerido']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'El usuario es requerido']
    }
}, { timestamps: true });

BusinessSchema.plugin(uniqueValidator, { message: 'La Empresa debe ser única.' });

BusinessSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

BusinessSchema.set('toObject', { virtuals: true });
BusinessSchema.set('toJSON', { virtuals: true });

const Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;