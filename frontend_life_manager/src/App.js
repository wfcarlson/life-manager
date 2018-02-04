import React, { Component } from 'react';
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
			expense_category_options: [],
			income_category_options: [],
			expenses: [],
			incomes: [],
		}
	}

	componentDidMount(){
		document.title = "Life Manager";
		this.getCategoryOptions();
		this.update();
	}

	getCategoryOptions = () => {
		var data = {
			method: "GET",
			headers: {

			},
			mode: 'cors'
		};

		fetch('http://localhost:8000/api/expenses/categories/', data).then((response) => {
			return response.json();
		}).then((result) => {
			this.setState({ expense_category_options: result });
		}).catch(err => { alert(err) })
		fetch('http://localhost:8000/api/incomes/categories/', data).then((response) => {
			return response.json();
		}).then((result) => {
			this.setState({ income_category_options: result });
		}).catch(err => { alert(err) })
	}

	getExpenses = () => {
		var data = {
			method: "GET",
			headers: {

			},
			mode: 'cors'
		};

		fetch('http://localhost:8000/api/expenses/', data).then((response) => {
			return response.json();
		}).then((result) => {
			this.setState({ expenses: result });
		}).catch(err => { alert(err) });
	}

	getIncomes = () => {
		var data = {
			method: "GET",
			headers: {

			},
			mode: 'cors'
		};

		fetch('http://localhost:8000/api/incomes/', data).then((response) => {
			return response.json();
		}).then((result) => {
			this.setState({ incomes: result });
		}).catch(err => { alert(err) });
	}

	update = () => {
		this.getIncomes();
		this.getExpenses();
	}


	render() {
		return (
			<MuiThemeProvider>
				<Grid fluid>
					<div className="App">
						<Row>
							<Col>
					    		<BudgetItemForm 
					    			income_category_options={ this.state.income_category_options }
					    			expense_category_options={ this.state.expense_category_options }
					    			update={ this.update }
					    		/>
					    	</Col>
					    	<Col>
					    		<ExpenseList
					    			category_options={ this.state.expense_category_options }
					    			expenses={ this.state.expenses }	
					    		/>
					    	</Col>
					    	<Col>
					    		<IncomeList
					    			category_options={ this.state.income_category_options }
					    			incomes={ this.state.incomes }
					    		/>
					    	</Col>
				    	</Row>
					</div>
				</Grid>
			</MuiThemeProvider>
		);
	}
}

export default App;
