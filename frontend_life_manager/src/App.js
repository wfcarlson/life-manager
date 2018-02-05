import React, { Component } from 'react';
import BudgetItemForm from './BudgetItemForm.js';
import ExpenseList from './ExpenseList.js';
import IncomeList from './IncomeList.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import { API_ROOT } from './config.js';
import './App.css';


const barStyle = {
	position: 'fixed',
	top: 0
};


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

		fetch(API_ROOT + '/api/expenses/categories/', data).then((response) => {
			return response.json();
		}).then((result) => {
			this.setState({ expense_category_options: result });
		}).catch(err => { alert(err) })
		fetch(API_ROOT + '/api/incomes/categories/', data).then((response) => {
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

		fetch(API_ROOT + '/api/expenses/', data).then((response) => {
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

		fetch(API_ROOT + '/api/incomes/', data).then((response) => {
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
			<div className="App">
				<MuiThemeProvider>
					<div>
						<AppBar
							showMenuIconButton={false} 
							title="Monthly Budgets"
							style={barStyle}
						/>
						<Grid style={{ paddingTop: 100 }} fluid>
							<Row center="xs">
								<Col>
						    		<BudgetItemForm 
						    			income_category_options={ this.state.income_category_options }
						    			expense_category_options={ this.state.expense_category_options }
						    			update={ this.update }
						    		/>
						    	</Col>
						    	<Col>
						    		<IncomeList
						    			category_options={ this.state.income_category_options }
						    			incomes={ this.state.incomes }
						    			update={ this.update }
						    		/>
						    	</Col>
						    	<Col>
						    		<ExpenseList
						    			category_options={ this.state.expense_category_options }
						    			expenses={ this.state.expenses }
						    			update={ this.update }	
						    		/>
						    	</Col>
					    	</Row>
						</Grid>
					</div>
				</MuiThemeProvider>
			</div>

		);
	}
}

export default App;
