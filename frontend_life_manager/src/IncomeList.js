import React, { Component } from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'
import { API_ROOT } from './config.js'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear';

export default class IncomeList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			incomes: [],
			category_options: [],
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			category_options: props.category_options,
			incomes: props.incomes,
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

	handleClickDelete = (id) => {
		return (event) => {
			var data = {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors',
			};

			fetch(API_ROOT + '/api/incomes/' + id + "/", data)
				.then(() => { this.props.update(); })
				.catch(err => { console.log(err) });
		}
	}

	renderRows = () => {
		return this.state.incomes.map((income) => {

			var date = new Date(income.time);
			var month = "" + (date.getMonth() + 1);
			if (month.length === 1){
				month = "0" + month;
			}

			return (
				<TableRow key={ income.id }>
					<TableRowColumn>
						{ month }/{ date.getDate() }/{ date.getYear() }
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
					<TableRowColumn>
						<IconButton onClick={this.handleClickDelete(income.id)}>
							<ContentClear hoverColor="red"/>
						</IconButton>
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
				        <TableHeaderColumn></TableHeaderColumn>
			        </TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{ this.renderRows() }
				</TableBody>
			</Table>
		);
	}
}