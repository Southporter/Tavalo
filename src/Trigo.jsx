import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Trigo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {},
		}
	}

	handleCopy = (event) => {

	}

	handlePaste = (event) => {
		this.setState((currentState) => {
			return {
				...currentState,
				data: event.clipboardData.getData(),
			};
		});
	}

	render() {
		return (
			<div
				onCopy={this.handleCopy}
				onPaste={this.handlePaste}
				>
				<h2>Trigo goes here</h2>
				<p>{this.state.data}</p>
			</div>
		);
	}
}




