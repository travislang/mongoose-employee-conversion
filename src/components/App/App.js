import React, { Component } from 'react';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import EmployeeList from '../EmployeeList/EmployeeList';
import EmployeeTotal from '../EmployeeTotal/EmployeeTotal';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {

  // When the App is first loaded get our stuff
  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    // Get our employees from the server
    axios.get('/employees')
      .then( (response) => {
        //Do something with stuff
        this.props.dispatch( {type: 'SET_EMPLOYEES', payload: response.data} );
      })
      .catch( (error) => {
        console.log('Bad stuff happened! Oh no!', error);
        alert('Bad stuff happened! Oh no!');
      })
  }

  render() {
    return (
      <div>
        <section>
          <h2>Add Employee</h2>
          <EmployeeForm getEmployees={this.getEmployees} />
        </section>
        <section>
          <h2>Employees</h2>
          <EmployeeList getEmployees={this.getEmployees} />
          <EmployeeTotal /> 
        </section>
      </div>
    );
  }
}

export default connect()(App);
