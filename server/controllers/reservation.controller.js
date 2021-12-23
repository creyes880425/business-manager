const Reservation = require('../models/reservation.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.create = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if (payload) {
        const reservation = req.body;
        //reservation.userId = payload.id;
        Reservation.create(reservation)
            .then(data => {
                Reservation.findById(data._id)
                    .then(user => res.json({ ok: true, message: 'Se agregó la reservación', data: user }))
                    .catch(error => {
                        console.log(error);
                        if (error.name == 'ValidationError')
                            res.status(200).json({ ok: false, message: error.message, error: error });
                        else {
                            res.status(200).json({ ok: false, message: 'Error al guardar la reservación' });
                        }
                    });
            })
            .catch(error => {
                console.log(error);
                if (error.name == 'ValidationError')
                    res.status(200).json({ ok: false, message: error.message, error: error });
                else {
                    res.status(200).json({ ok: false, message: 'Error al guardar la reservación' });
                }
            });
    } else {
        res.status(200).json({ ok: false, message: 'Error al guardar la reservación' });
    }
}

module.exports.edit = (req, resp) => {
    const reservation = req.body;
    Reservation.findOneAndUpdate({ _id: req.params.id }, reservation)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó la reservación', data: reservation }))
        .catch(error => {
            if (error.name === 'ValidationError') {
                resp.status(500).json({ ok: false, message: error.message, error: error })
            } else {
                resp.status(500).json({ ok: false, message: 'Error al guardar la reservación' })
            }
        });
}

module.exports.get = (req, res) => {
    Reservation.findById(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'reservation', data: data }))
        .catch(error => {
            console.log('GET', error);
            res.status(500).json({ ok: false, message: 'Error al obtener la reservación' })
        });
}

module.exports.getByBusiness = (req, res) => {
    Reservation.find({ businessId: req.params.businessId }).sort({date: 'asc'})
        .then(data => res.status(200).json({ ok: true, message: 'reservation', data: data }))
        .catch(error => {
            console.log('List By Business', error);
            res.status(500).json({ ok: false, message: 'Error al obtener las reservaciones de la empresa' })
        });
}

module.exports.getByBusinessToday = (req, res) => {
    var first = new Date();
    var last = new Date().setHours(23,59,59);
    Reservation.find(
        {
            businessId: req.params.businessId,
            date: {$gte: first, $lt: last},
            $or: [{ status: "Reservado" }, { status: "Confirmado" }]
        })
        .then(data => res.status(200).json({ ok: true, message: 'reservation', data: data }))
        .catch(error => {
            console.log('List By Business', error);
            res.status(500).json({ ok: false, message: 'Error al obtener las reservaciones del día' })
        });
}

module.exports.list = (req, res) => {
    Reservation.find()
        .then(data => res.status(200).json({ ok: true, message: 'reservation', data: data }))
        .catch(error => {
            console.log('LIST', error);
            res.status(500).json({ ok: false, message: 'Error al obtener las reservaciones' })
        });
}

module.exports.del = (req, res) => {
    Reservation.findByIdAndRemove(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'Se eliminó  la reservación', data: data }))
        .catch(error => {
            console.log('DELETE', error);
            res.status(500).json({ ok: false, message: 'Error al eliminar la reservacion' })
        });
}

