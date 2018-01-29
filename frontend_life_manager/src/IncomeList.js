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

export default class IncomeList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			incomes: [],
			category_options: [],
		};

		this.getIncomes();
	}

	componentWillReceiveProps(props) {
		this.setState({
			category_options: props.category_options
		})

		this.getIncomes();
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

	renderRows = () => {
		return this.state.incomes.map((income) => {
			var date = new Date(income.time);
			return (
				<TableRow>
					<TableRowColumn>
						{ date.getMonth() }/{ date.getDate() }/{ date.getYear() }
					</TableRowColumn>
					<TableRowColumn>
						{ income.description }
					</TableRowColumn>
					<TableRowColumn>
						{ income.party }
					</TableRowColumn>
					<TableRowColumn>
						${ income.amount }
					</TableRowColumn>
					<TableRowColumn>
						{ this.getCategoryOption(income.category) }
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