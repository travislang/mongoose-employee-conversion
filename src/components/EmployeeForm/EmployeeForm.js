import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const emptyEmployeeObject = {
  firstName: '',
  lastName: '',
  idNumber: '',
  jobTitle: '',
  annualSalary: '',
};

class EmployeeForm extends Component {
  state = emptyEmployeeObject;

  addEmployee = () => {
    axios({
      method: 'POST',
      url: '/employees',
      data: this.state
    })
    .then( ( response ) => {
      this.props.getEmployees();
      this.clearEmployeeFields();
    })
    .catch( (error) => {
      alert('Bad things happened! Oh no!');
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.addEmployee();
  }

  clearEmployeeFields = () => {
    this.setState(emptyEmployeeObject);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} placeholder="First Name" value={this.state.firstName} name="firstName" />
        <input onChange={this.handleChange} placeholder="Last Name" value={this.state.lastName} name="lastName" />
        <input onChange={this.handleChange} placeholder="ID Number" value={this.state.idNumber} name="idNumber" />
        <input onChange={this.handleChange} placeholder="Job Title" value={this.state.jobTitle} name="jobTitle" />
        <input onChange={this.handleChange} placeholder="Annual Salary" value={this.state.annualSalary} name="annualSalary" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default connect()(EmployeeForm);
