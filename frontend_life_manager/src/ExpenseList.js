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
import Modal from 'react-responsive-modal';
import RaisedButton from 'material-ui/RaisedButton';

export default class ExpenseList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expenses: [],
			category_options: [],
			open_modal: false,
			expense: { id:-1, description:"hello" }
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

	handleClickDelete = (expense) => {
		return (event) => {
			this.openModal(expense);
		}
	}

	onClickConfirm = () => {
		var data = {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors',
		};

		fetch(API_ROOT + '/api/expenses/' + this.state.expense.id + "/", data)
			.then(() => { this.props.update(); })
			.catch(err => { console.log(err) });
		this.closeModal();
	}

	openModal = (expense) => {
		this.setState({expense:expense, open_modal:true})
	}

	closeModal = () => {
		this.setState({open_modal:false})
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
					<TableRowColumn>
						<IconButton onClick={this.handleClickDelete(expense)}>
							<ContentClear hoverColor="red"/>
						</IconButton>
					</TableRowColumn>
				</TableRow>
			);
		});
	}

	render() {
		return (
			<div>
				<Modal open={this.state.open_modal} onClose={this.closeModal} little>
					<p>Delete {this.state.expense.description} - ${this.state.expense.amount}</p>
					<RaisedButton label="Confirm" primary={true} onClick={this.onClickConfirm} />
					&nbsp;&nbsp;&nbsp; 
					<RaisedButton label="Cancel" secondary={true} onClick={this.closeModal} />
				</Modal>
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
			</div>
		);
	}
}