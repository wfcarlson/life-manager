import React, { Component } from 'react';
import logo from './logo.svg';
import BudgetItemForm from './BudgetItemForm.js';
import ExpenseList from './ExpenseList.js';
import IncomeList from './IncomeList.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category_options: [],
		}
	}

	componentDidMount(){
		document.title = "Life Manager";
		this.getCategoryOptions();
	}

	getCategoryOptions = () => {
		var data = {
			method: "GET",
			headers: {

			},
			mode: 'cors'
		};

		fetch('http://localhost:8000/api/categories/', data).then((response) => {
			return response.json();
		}).then((result) => {
			this.setState({ category_options: result });
		}).catch(err => { alert(err) })
	}


	render() {
		return (
			<MuiThemeProvider>
				<Grid fluid>
					<div className="App">
						<Row>
							<Col>
					    		<BudgetItemForm category_options={ this.state.category_options }/>
					    	</Col>
					    	<Col>
					    		<ExpenseList category_options={ this.state.category_options }/>
					    	</Col>
					    	<Col>
					    		<IncomeList category_options={ this.state.category_options }/>
					    	</Col>
				    	</Row>
					</div>
				</Grid>
			</MuiThemeProvider>
		);
	}
}

export default App;
