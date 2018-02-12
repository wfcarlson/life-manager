import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import { API_ROOT } from './config.js';
import { Row, Col } from 'react-flexbox-grid';

export default class CategoryForm extends Component {
    constructor(props) {
		super(props);
		this.state = {
			name: "",
			type: "",
			open_modal: false
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
            type: props.type,
		});
    }

    componentWillUpdate(props) {
		this.state.type = props.type;
    }

    handleClickSave = () => {
        var category = {
			name: this.state.name
		}

		var data = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify(category),
		};

        fetch(API_ROOT + '/api/' + this.state.type + 's/categories/', data)
            .then((data) => { 
                data.json()
                    .then((data) => { 
                        this.props.update();
                        this.props.setCategory(data.id);
                        this.props.close(); 
                    }) 
            })
            .catch(err => { console.log(err); this.close(); });

    }

    handleChange = (event, value) => {
        this.setState({name:value});
    }

    submit = () => {

    }
    
    render() {
        return (
            <Col xs={4}>
                <Row>
                    <h4>New Category</h4>
                </Row>
                <Row>
                    <ValidatorForm onSubmit={this.submit}>
                        <TextValidator
                            floatingLabelText="Name"
                            onChange={this.handleChange}
                            name="name"
                            value={this.state.name}
                            validators={['required']}
                            errorMessages={'this field is required'}
                        />
                    </ValidatorForm>
                </Row>
                <Row end="xs">
		            <RaisedButton onClick={this.handleClickSave} label="Submit" primary={true} />
		        </Row>
            </Col>
        );
    }

}
