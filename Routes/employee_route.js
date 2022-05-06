const express = require('express');
const { registerEmployee, employeeLogin, getAllEmployees, deleteEmployee, updateEmployee } = require('../controller/employee_controller');
const router = express.Router();


router.route('/register').post(registerEmployee);
router.route('/login').post(employeeLogin);

router.route('/employees').get(getAllEmployees);

router.route('/remove/:id').delete(deleteEmployee);
router.route('/update/:id').put(updateEmployee);

module.exports = router;