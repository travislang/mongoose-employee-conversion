const express = require('express');
const router = express.Router();
// const pool = require('../modules/pool.js');
const mongoose = require('mongoose');

// Mongoose Schema
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    jobTitle: { type: String},
    annualSalary: {type: Number}
})

const Employee = mongoose.model('Employee', employeeSchema)

// Setup a GET route to get all the employees from the database
router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    // const sqlText = `SELECT * FROM employees ORDER BY lastName;`;
    // pool.query(sqlText)
    Employee.find({})
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.send(result);
        })
        .catch((error) => {
            console.log(`Error making database query`, error);
            res.sendStatus(500); // Good server always responds
        })
})


// Setup a POST route to add a new employee to the database
router.post('/', (req, res) => {
    const employee = req.body;
//     const sqlText = `INSERT INTO employees (firstName, lastName, jobTitle, annualSalary) VALUES 
//   ($1, $2, $3, $4)`;
    // pool.query(sqlText, [employee.firstName, employee.lastName, employee.jobTitle, employee.annualSalary])
    Employee.create(employee)
        .then((result) => {
            console.log(`Added to the database`, employee);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query`, error);
            res.sendStatus(500); // Good server always responds
        })
})

// Setup DELETE to remove an employee
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    // let sqlText = 'DELETE FROM employees WHERE id=$1;';
    // pool.query(sqlText, [reqId])
    Employee.findOneAndDelete({
        _id: reqId
    })
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query`, error);
            res.sendStatus(500); 
        })
})

module.exports = router;