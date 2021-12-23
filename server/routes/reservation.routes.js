//const { create, edit,del, get, list } = require('../controllers/mascota.controller');
const ReservationController = require('../controllers/reservation.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/reservations', authenticate, ReservationController.list);
    app.get('/api/reservations/:id', authenticate, ReservationController.get);
    app.get('/api/reservations/business/:businessId', authenticate, ReservationController.getByBusiness);
    app.get('/api/reservations/business/today/:businessId', authenticate, ReservationController.getByBusinessToday);
    app.post('/api/reservations', authenticate, ReservationController.create);
    app.put('/api/reservations/:id', authenticate, ReservationController.edit);
    app.delete('/api/reservations/:id', authenticate, ReservationController.del);
}