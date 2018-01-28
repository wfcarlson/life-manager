import React, { Component } from 'react';
import logo from './logo.svg';
import { MenuItem, RaisedButton } from 'material-ui';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';

export default class BudgetItemForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			amount: props.amount,
			time: props.time,
			category: props.category,
			description: props.description,
			party: props.party,
			category_options: []
		};

		this.getCategoryOptions();
	}

	componentWillReceiveProps(props) {
		this.setState({
			amount: props.amount,
			time: props.time,
			category: props.category,
			description: props.description,
			party: props.party,
			category_options: props.category_options,
		})

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

	handleChange = (attribute) => {
		return (event) => {
			this.setState({
				attribute: event.target.value
			});
		}
	}

	handleSubmit = () => {

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
				<TextValidator
                    floatingLabelText="Amount"
                    onChange={this.handleChange('amount')}
                    name="amount"
                    value={this.state.amount}
                    validators={['required',]}
                    errorMessages={['this field is required',]}
                />
                <TextValidator
                    floatingLabelText="Description"
                    onChange={this.handleChange('description')}
                    name="description"
                    value={this.state.amount}
                    validators={['required',]}
                    errorMessages={['this field is required',]}
                />
                <TextValidator
                    floatingLabelText="Party"
                    onChange={this.handleChange('party')}
                    name="party"
                    value={this.state.party}
                    validators={['required',]}
                    errorMessages={['this field is required',]}
                />
                <SelectValidator 
                	floatingLabelText="Category"
                    onChange={this.handleChange('category')}
                    name="category"
                    value={this.state.category}
                    validators={['required',]}
                    errorMessages={['this field is required',]}
                >
                	{ this.renderCategoryOptions() }
                </SelectValidator>
                <RaisedButton type="submit" />
			
			</ValidatorForm>
		);
	}
}