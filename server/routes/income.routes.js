//const { create, edit,del, get, list } = require('../controllers/mascota.controller');
const IncomeController = require('../controllers/income.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/incomes', authenticate, IncomeController.list);
    app.get('/api/incomes/:id', authenticate, IncomeController.get);
    app.get('/api/incomes/business/:businessId', authenticate, IncomeController.getByBusiness);
    app.post('/api/incomes', authenticate, IncomeController.create);
    app.post('/api/incomes/upsert', authenticate, IncomeController.upsert);
    app.put('/api/incomes/:id', authenticate, IncomeController.edit);
    app.delete('/api/incomes/:id', authenticate, IncomeController.del);
}