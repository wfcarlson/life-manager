import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Modal from 'react-responsive-modal';
import { RadioButton, RadioButtonGroup, MenuItem, RaisedButton } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { Row } from 'react-flexbox-grid';
import { API_ROOT } from './config.js';

export default class BudgetItemForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			amount: "",
			time: new Date(Date.now()),
			category: "",
			description: "",
			party: "",
			type: "expense",
			income_category_options: [],
			expense_category_options: [],
			open_modal: false
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			income_category_options: props.income_category_options,
			expense_category_options: props.expense_category_options,
		})
	}

	handleChange = (attribute) => {
		if (attribute === "type"){
			return (event, value) => {
			var obj = {};
			obj[attribute] = value;
			obj['category'] = "";
			this.setState(obj);
		}
		}
		return (event, value) => {
			var obj = {};
			obj[attribute] = value;
			this.setState(obj);
		}
	}

	handleNumberChange = (attribute) => {
		return (event, value) => {
			var valid = value.match(/^(\d*\.)?\d*$/);
			if (valid != null && valid.length === 2){
				var obj = {};
				obj[attribute] = value;
				this.setState(obj);
			}
		}
	}

	handleSelectChange = (attribute) => {
		return (event, index, value) => {
			var obj = {};
			obj[attribute] = value;
			this.setState(obj);
		}
	}

	clearItem = () => {
		this.setState({
			amount: "",
			time: new Date(Date.now()),
			category: "",
			description: "",
			party: "",
			type: "expense",
		});
	}

	handleSubmit = () => {
		var budgetItem = {
			amount: this.state.amount,
			category: this.state.category,
			description: this.state.description,
			party: this.state.party,
			time: (this.state.time ? this.state.time : new Date(Date.now()).toJSON()),
		}

		var data = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify(budgetItem),
		};

		fetch(API_ROOT + '/api/' + this.state.type + 's/', data)
			.then(() => { this.clearItem(); this.props.update(); this.closeModal(); })
			.catch(err => { console.log(err); this.closeModal(); });
	
	}

	formatDate = (date) => {
		var month = "" + (date.getMonth() + 1);
		if (month.length === 1){
			month = "0" + month;
		}	

		return "" + month + "/" + date.getDate() + "/" + date.getYear();
	}

	renderCategoryOptions = () => {
		return (this.state.type === "income") ? (this.state.income_category_options.map((option) => {
			return (<MenuItem key={option.id} value={option.id} primaryText={option.name} />);
		}))
		:
		(this.state.expense_category_options.map((option) => {
			return (<MenuItem key={option.id} value={option.id} primaryText={option.name} />);
		}));
	}

	openModal = () => {
		this.setState({open_modal:true});
	}

	closeModal = () => {
		this.setState({open_modal:false})
	}

	render() {
		return (
			<div>
				<FloatingActionButton onClick={this.openModal} style={{ marginLeft:25, marginTop:25 }}>
					<ContentAdd />
				</FloatingActionButton>
				<Modal open={this.state.open_modal} onClose={this.closeModal} little>
					<ValidatorForm
						ref="form"
						onSubmit={this.handleSubmit}
						onError={errors => console.log(errors)}
					>
						<Row>
							<RadioButtonGroup name="budget_item_type" defaultSelected="expense" onChange={this.handleChange('type')}>
								<RadioButton name="income" value="income" label="Income" />
								<RadioButton name="expense" value="expense" label="Expense" />
							</RadioButtonGroup>
						</Row>
						<Row>
							<DatePicker
								hintText="Date"
								name="time"
								value={this.state.time}
								onChange={this.handleChange('time')}
								formatDate={this.formatDate}
							/>
						</Row>
						<Row>
							<TextValidator
			                    floatingLabelText="Amount"
			                    onChange={this.handleNumberChange('amount')}
			                    name="amount"
			                    value={this.state.amount}
			                    validators={['required']}
			                    errorMessages={'this field is required'}
			                />
		                </Row>
		                <Row>
			                <TextValidator
			                    floatingLabelText="Description"
			                    onChange={this.handleChange('description')}
			                    name="description"
			                    value={this.state.description}
			                    validators={['required']}
			                    errorMessages={'this field is required'}
			                />
		                </Row>
		                <Row>
			                <TextValidator
			                    floatingLabelText="Party"
			                    onChange={this.handleChange('party')}
			                    name="party"
			                    value={this.state.party}
			                    validators={['required']}
			                    errorMessages={'this field is required'}
			                />
		                </Row>
		                <Row>
		                	<SelectValidator 
			                	floatingLabelText="Category"
			                    onChange={this.handleSelectChange('category')}
			                    name="category"
			                    value={this.state.category}
			                    validators={['required']}
			                    errorMessages={'this field is required'}
			                >
			                	{ this.renderCategoryOptions() }
			                </SelectValidator>
		                </Row>
		                <Row end="xs">
		                	<RaisedButton type="Save" label="Submit" primary={true} />
		                </Row>
					</ValidatorForm>
				</Modal>
			</div>
		);
	}
}