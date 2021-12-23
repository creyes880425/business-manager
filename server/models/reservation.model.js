const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ReservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El Nombre es requerido'],
        minlength: [3, 'El Nombre debe tener al menos 3 caracteres'],
    },
    date: {
        type: Date,
        required: [true, 'La Fecha es requerida']
    },
    persons: {
        type: Number,
        required: [true, 'La cantidad de personas es requerida'],
        min: [1, 'La cantidad de personas no puede ser 0'],
    },
    phone: {
        type: String,
        required: [true, 'El Teléfono es requerido']
    },
    status: {
        type: String,
        required: [true, 'El Estado es requerido']
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: [true, 'La Empresa es requerida']
    }
}, { timestamps: true });

ReservationSchema.plugin(uniqueValidator, { message: 'La Reservación debe ser única.' });

ReservationSchema.virtual('business', {
    ref: 'Business',
    localField: 'businessId',
    foreignField: '_id'
});

ReservationSchema.set('toObject', { virtuals: true });
ReservationSchema.set('toJSON', { virtuals: true });

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;