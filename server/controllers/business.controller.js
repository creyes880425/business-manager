const Business = require('../models/business.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.create = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if (payload) {
        const business = req.body;
        business.userId = payload.id;
        Business.create(business)
            .then(data => {
                Business.findById(data._id).populate('user', '-password')
                    .then(user => res.json({ ok: true, message: 'Se agregó la empresa', data: user }))
                    .catch(error => {
                        if (error.name == 'ValidationError')
                            res.status(200).json({ ok: false, message: error.message, error: error });
                        else {
                            res.status(200).json({ ok: false, message: 'Error al guardar la empresa' });
                        }
                    });
            })
            .catch(error => {
                if (error.name == 'ValidationError')
                    res.status(200).json({ ok: false, message: error.message, error: error });
                else {
                    res.status(200).json({ ok: false, message: 'Error al guardar la empresa' });
                }
            });
    } else {
        res.status(200).json({ ok: false, message: 'Error al guardar la empresa' });
    }
}

module.exports.edit = (req, resp) => {
    const business = req.body;
    Business.findOneAndUpdate({ _id: req.params.id }, business)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó la empresa', data: business }))
        .catch(error => {
            if (error.name === 'ValidationError') {
                resp.status(500).json({ ok: false, message: error.message, error: error })
            } else {
                resp.status(500).json({ ok: false, message: 'Error al guardar la empresa' })
            }
        });
}

module.exports.get = (req, res) => {
    Business.findById(req.params.id).populate('user', '-password')
        .then(data => res.status(200).json({ ok: true, message: 'business', data: data }))
        .catch(error => {
            console.log('GET', error);
            res.status(500).json({ ok: false, message: 'Error al obtener la empresa' })
        });
}

module.exports.list = (req, res) => {
    Business.find().populate('user', '-password')
        .then(data => res.status(200).json({ ok: true, message: 'business', data: data }))
        .catch(error => {
            console.log('LIST', error);
            res.status(500).json({ ok: false, message: 'Error al obtener las empresas' })
        });
}

module.exports.del = (req, res) => {
    Business.findByIdAndRemove(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'Se eliminó  la empresa', data: data }))
        .catch(error => {
            console.log('DELETE', error);
            res.status(500).json({ ok: false, message: 'Error al eliminar la empresa' })
        });
}