const Income = require('../models/income.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.create = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if (payload) {
        const income = req.body;
        //Income.userId = payload.id;
        Income.create(income)
            .then(data => {
                Income.findById(data._id)
                    .then(user => res.json({ ok: true, message: 'Se agregó el ingreso', data: user }))
                    .catch(error => {
                        console.log(error);
                        if (error.name == 'ValidationError')
                            res.status(200).json({ ok: false, message: error.message, error: error });
                        else {
                            res.status(200).json({ ok: false, message: 'Error al guardar el ingreso' });
                        }
                    });
            })
            .catch(error => {
                console.log(error);
                if (error.name == 'ValidationError')
                    res.status(200).json({ ok: false, message: error.message, error: error });
                else {
                    res.status(200).json({ ok: false, message: 'Error al guardar el ingreso' });
                }
            });
    } else {
        res.status(200).json({ ok: false, message: 'Error al guardar el ingreso' });
    }
}

module.exports.edit = (req, resp) => {
    const income = req.body;
    Income.findOneAndUpdate({ _id: req.params.id }, income)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó el ingreso', data: Income }))
        .catch(error => {
            if (error.name === 'ValidationError') {
                resp.status(500).json({ ok: false, message: error.message, error: error })
            } else {
                resp.status(500).json({ ok: false, message: 'Error al guardar el ingreso' })
            }
        });
}

module.exports.get = (req, res) => {
    Income.findById(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'income', data: data }))
        .catch(error => {
            console.log('GET', error);
            res.status(500).json({ ok: false, message: 'Error al obtener el ingreso' })
        });
}

module.exports.getByBusiness = (req, res) => {
    Income.find({ businessId: req.params.businessId }).sort({month: 'asc'})
        .then(data => res.status(200).json({ ok: true, message: 'income', data: data }))
        .catch(error => {
            console.log('List By Business', error);
            res.status(500).json({ ok: false, message: 'Error al obtener los ingreso de la empresa' })
        });
}

module.exports.upsert = (req, res) => {
    const income = req.body;
    Income.findOneAndUpdate({ month: income.month, businessId: income.businessId }, income)
        .then(data => {
            //console.log(JSON.stringify(data));
            if (!data) {
                Income.create(income)
                    .then(data2 => {
                        //console.log(JSON.stringify(data2));
                        Income.findById(data2._id)
                            .then(user => res.json({ ok: true, message: 'Se actualizó el ingreso', data: user }))
                            .catch(error => {
                                console.log(error);
                                if (error.name == 'ValidationError')
                                    res.status(200).json({ ok: false, message: error.message, error: error });
                                else {
                                    res.status(200).json({ ok: false, message: 'Error al guardar el ingreso' });
                                }
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        if (error.name == 'ValidationError')
                            res.status(200).json({ ok: false, message: error.message, error: error });
                        else {
                            res.status(200).json({ ok: false, message: 'Error al guardar el ingreso' });
                        }
                    });
            }else{
                res.status(200).json({ ok: true, message: 'Se actualizó el ingreso', data: Income })
            }
            
        })
        .catch(error => {
            console.log(JSON.stringify(error));
            if (error.name === 'ValidationError') {
                resp.status(500).json({ ok: false, message: error.message, error: error })
            } else {
                resp.status(500).json({ ok: false, message: 'Error al guardar el ingreso' })
            }
        });
}

module.exports.list = (req, res) => {
    Income.find()
        .then(data => res.status(200).json({ ok: true, message: 'income', data: data }))
        .catch(error => {
            console.log('LIST', error);
            res.status(500).json({ ok: false, message: 'Error al obtener los ingreso' })
        });
}

module.exports.del = (req, res) => {
    Income.findByIdAndRemove(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'Se eliminó  el ingreso', data: data }))
        .catch(error => {
            console.log('DELETE', error);
            res.status(500).json({ ok: false, message: 'Error al eliminar el ingreso' })
        });
}

