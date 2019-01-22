import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

class EmployeeList extends Component {

  deleteEmployee = (id) => {
    // call axios
    axios({
      method: 'DELETE',
      url: `/employees/${id}`
    })
    .then( (response) => {
      this.props.getEmployees();
    })
    .catch( (error) => {
      alert('Bad stuff happened! Oh no!');
    })
  }

  render() {
    return (
      <ul>
        {this.props.reduxState.employeeReducer.map(employee => (
          <li key={employee._id}>
            {`${employee.firstname}
            ${employee.lastname}
            is the ${employee.jobtitle}
            and makes ${employee.annualsalary}`}
            <button onClick={() => { 
                this.deleteEmployee(employee._id) 
              } 
            }>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }

}

export default connect(mapReduxStateToProps)(EmployeeList);
