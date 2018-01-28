import React, { Component } from 'react';
import logo from './logo.svg';
import BudgetItemForm from './BudgetItemForm.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
				    <BudgetItemForm />
				    <div id='list'>
				    </div> 
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
