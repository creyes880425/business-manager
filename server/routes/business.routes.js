//const { create, edit,del, get, list } = require('../controllers/mascota.controller');
const BusinessController = require('../controllers/business.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/business', authenticate, BusinessController.list);
    app.get('/api/business/:id', authenticate, BusinessController.get);
    app.post('/api/business', authenticate, BusinessController.create);
    app.put('/api/business/:id', authenticate, BusinessController.edit);
    app.delete('/api/business/:id', authenticate, BusinessController.del);
}