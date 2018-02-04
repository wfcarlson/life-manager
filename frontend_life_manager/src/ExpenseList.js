import React, { Component } from 'react';
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
	}

	componentWillReceiveProps(props) {
		this.setState({
			category_options: props.category_options,
			expenses: props.expenses,
		})
	}

	getCategoryOption = (pk) => {
		var name = "Unknown Category";
		this.state.category_options.forEach((option) => {
			if (option.id === pk){
				name = option.name;
			}
		});

		return name;
	}

	renderRows = () => {
		return this.state.expenses.map((expense) => {
			
			var date = new Date(expense.time);
			var month = "" + (date.getMonth() + 1);
			if (month.length === 1){
				month = "0" + month;
			}

			return (
				<TableRow key={ expense.id }>
					<TableRowColumn>
						{ month }/{ date.getDate() }/{ date.getYear() }
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
					<TableRow>
						<TableHeaderColumn>Date</TableHeaderColumn>
				        <TableHeaderColumn>Description</TableHeaderColumn>
				        <TableHeaderColumn>Vendor</TableHeaderColumn>
				        <TableHeaderColumn>Amount</TableHeaderColumn>
				        <TableHeaderColumn>Category</TableHeaderColumn>
			        </TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{ this.renderRows() }
				</TableBody>
			</Table>
		);
	}
}