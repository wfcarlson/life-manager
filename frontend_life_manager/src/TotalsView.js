import React, { Component } from 'react';

export default class TotalsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            income_category_options: [],
            expense_category_options: []
		};
    }

    componentWillReceiveProps(props) {
		this.setState({
			income_category_options: props.income_category_options ,
			expense_category_options: props.expense_category_options 
		});
    }
    
    render() {
        return (
            <div>
                <p>Income and Expense Totals will go here.</p>
            </div>
        );
    }
}