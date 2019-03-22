import React, { Component } from 'react';
import './App.css';
import EmployeeList from '../employee-list';
import FormEmployee from '../form-employee';

import { BrowserRouter as Router, Route, 
  Switch } from 'react-router-dom';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';

import { connect } from 'react-redux';
import * as actions from '../redux/actions';

class App extends Component {
  
  newId = 18;

  componentDidMount() {
    const data = require('../employees.json');
      this.setState({employeeData: data});
    }  

  render() {

    const {employeeData, addItem, deleteItem, editItem} = this.props;

    console.log('Array is ', employeeData);

    console.log('App props ', this.props);

    return (
<ErrorBoundry>
    <Router>
      <Switch>
        <Route path="/" exact render={() => {
          return <EmployeeList data={employeeData}
            onItemDeleted={deleteItem} />
        }} />
        <Route path="/addEmployee" render={() => {
          return <FormEmployee
            id = {this.newId}
            typeForm="add"
            onItemAdded={addItem} />
        }} />
        <Route path="/editItem/:id" render={({ match }) => {
          const id = Number(match.params.id);
          console.log('id match is ', id);
          return <FormEmployee
            id={id}
            data={employeeData}
            typeForm="edit"
            onItemChange={editItem} />
        }} />
        <Route component={ErrorIndicator}/>
      </Switch>
    </Router>
</ErrorBoundry>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
      employeeData: state
  }
}

export default connect(mapStateToProps, actions)(App);
