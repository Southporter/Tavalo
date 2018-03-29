import React, { Component } from 'react';
import { number } from 'prop-types';
// import { Row, Cell } from './components';
import Row from './components/Row';
import Cell from './components/Cell';
import { alphabet } from './constants';
import { generateKey } from './utils';

class Tavalo extends Component {
	constructor(props) {
		super(props);

		console.info('setting state', props);

		this.state = {
			data: [],
			size: {
				rows: props.rows,
				columns: props.columns,
			}
		}
	}

	handleCopy(event) {}

	handlePaste(event) {
		const clipData = event.clipboardData.getData('text');
		const rows = clipData.split('\n');
		this.setState((currentState) => {
			return {
				...currentState,
				data: rows.map((row) => row.split('\t')),
			};
		});
	}

	generateCells(size, data = []) {
		const cells = [];
		for (let i = 0; i < size.columns; i++) {
			cells.push(<Cell key={generateKey()}>{data[i]}</Cell>);
		}
		console.info('cells', cells, size, data);
		return cells;
	}

	generateRows(size, data) {
		const rows = [];
		for (let i = 0; i < size.rows; i++) {
			console.info(`creating row ${i}`);
			rows.push(
				<Row key={generateKey()}>
					{this.generateCells(size, data[i])}
				</Row>
			)
		}
		return rows;
	}

	getHeaderText(index) {
		let text = '';
		// do {
			text += alphabet[index % alphabet.length];
		// 	index /= alphabet.length;
		// } while (index >= 0);
		return text;
	}

	generateHeader() {
		const { size } = this.state;
		const cells = [];
		for (let i = 0; i < size.columns; i++) {
			cells.push(<Cell header={true}>{this.getHeaderText(i)}</Cell>);
		}
		return (
			<Row>
				{cells}
			</Row>
		)

	}

	render() {
		console.info('render', this.state.data);
		const { size, data } = this.state;
		if (!this.props.children) {
			return (
				<div
					style={{ borderColor: 'blue', width: '100%', height:'100%' }}
					onCopy={this.handleCopy.bind(this)}
					onPaste={this.handlePaste.bind(this)}
					>
					<table>
						<thead>
							{this.generateHeader()}
						</thead>
						<tbody>
							{this.generateRows(size, data)}
						</tbody>
					</table>
				</div>
			);
		}
		return (
			<table>
				{this.props.children}
			</table>
		);
	}
}

Tavalo.propTypes = {
	rows: number,
	columns: number,
};
Tavalo.defaultProps = {
	rows: 5,
	columns: 10,
}

export default Tavalo;

