import React from 'react';
import { connect } from 'react-redux';

const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

const employeeSalary = (sum, employee) => sum + Number(employee.annualsalary);

const calculateMonthlyCost = employeeList => employeeList.reduce(employeeSalary, 0) / 12;

const EmployeeTotal = ({ reduxState }) => (
  <p>Total Monthly Cost: {calculateMonthlyCost(reduxState.employeeReducer)}</p>
);

export default connect(mapReduxStateToProps)(EmployeeTotal);
