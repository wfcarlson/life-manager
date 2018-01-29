import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'

export default class ExpenseList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expenses: [],
			category_options: [],
		};

		this.getExpenses();
	}

	componentWillReceiveProps(props) {
		this.setState({
			category_options: props.category_options
		})

		this.getExpenses();
	}

	getCategoryOption = (pk) => {
		var name = "Unknown Category";
		this.state.category_options.forEach((option) => {
			if (option.id == pk){
				name = option.name;
			}
		});

		return name;
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

	renderRows = () => {
		return this.state.expenses.map((expense) => {
			var date = new Date(expense.time);
			return (
				<TableRow>
					<TableRowColumn>
						{ date.getMonth() }/{ date.getDate() }/{ date.getYear() }
					</TableRowColumn>
					<TableRowColumn>
						{ expense.description }
					</TableRowColumn>
					<TableRowColumn>
						{ expense.party }
					</TableRowColumn>
					<TableRowColumn>
						${ expense.amount }
					</TableRowColumn>
					<TableRowColumn>
						{ this.getCategoryOption(expense.category) }
					</TableRowColumn>
				</TableRow>
			);
		});
	}

	render() {
		return (
			<Table>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false} >
					<TableHeaderColumn>Date</TableHeaderColumn>
			        <TableHeaderColumn>Description</TableHeaderColumn>
			        <TableHeaderColumn>Vendor</TableHeaderColumn>
			        <TableHeaderColumn>Amount</TableHeaderColumn>
			        <TableHeaderColumn>Category</TableHeaderColumn>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{ this.renderRows() }
				</TableBody>
			</Table>
		);
	}
}