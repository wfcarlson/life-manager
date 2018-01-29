import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup, MenuItem, RaisedButton } from 'material-ui';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { Row, Col } from 'react-flexbox-grid';

export default class BudgetItemForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			amount: "",
			time: "",
			category: "",
			description: "",
			party: "",
			type: "expense",
			category_options: [],
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			amount: props.amount,
			time: props.time,
			category: props.category,
			description: props.description,
			party: props.party,
			type: props.party,
			category_options: props.category_options,
		})
	}

	handleChange = (attribute) => {
		return (event, value) => {
			var obj = {};
			obj[attribute] = value;
			this.setState(obj);
		}
	}

	handleNumberChange = (attribute) => {
		return (event, value) => {
			var valid = value.match(/^(\d*\.)?\d*$/);
			if (valid != null && valid.length == 2){
				console.log(valid)
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

	handleSubmit = () => {
		var budgetItem = {
			amount: this.state.amount,
			category: this.state.category,
			description: this.state.description,
			party: this.state.party,
			time: new Date(Date.now()).toJSON(),
		}

		var data = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify(budgetItem),
		};

		if (this.state.type == 'expense') {
			fetch('http://localhost:8000/api/expenses/', data).catch(err => { console.log(err) });
		}
		else if (this.state.type ==' income') {
			fetch('http://localhost:8000/api/incomes/', data).catch(err => { console.log(err) });
		}
	}

	renderCategoryOptions = () => {
		return this.state.category_options.map((option) => {
			return (<MenuItem key={option.id} value={option.id} primaryText={option.name} />);
		});
	}

	render() {
		return (
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
                <Row>
                	<RaisedButton type="submit" label="Submit" primary={true} />
                </Row>
			
			</ValidatorForm>
		);
	}
}