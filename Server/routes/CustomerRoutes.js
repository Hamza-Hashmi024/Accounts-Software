const Routes = require('express').Router();
const Customer = require('../Controllers/CustomerControllers');



Routes.post('/customer', Customer.createCustomer );
Routes.get('/customer', Customer.getCustomerByIdOrName);
Routes.get('/customers', Customer.getAllCustomers);
Routes.put('/:id' , Customer.updateCustomerById)
Routes.delete('/:id' ,  Customer.DeleteCustomerById)
Routes.get('/name' ,  Customer.getCustomerName)
Routes.get('/numberCus' , Customer.GetTotalNumOfCustomers)


module.exports = Routes;
