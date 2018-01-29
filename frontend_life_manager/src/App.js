import React, { Component } from 'react';
import logo from './logo.svg';
import BudgetItemForm from './BudgetItemForm.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid } from 'react-flexbox-grid';
import './App.css';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<Grid fluid>
					<div className="App">
					    <BudgetItemForm />
					    <div id='list'>
					    </div> 
					</div>
				</Grid>
			</MuiThemeProvider>
		);
	}
}

export default App;
