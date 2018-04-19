import React, { Component } from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import Table from './components/Table';
import Row from './components/Row';
import Cell from './components/Cell';
import { alphabet } from './constants';
import { generateKey } from './utils';

const Container = styled.div`
	border-color: blue;
	width: 100%;
	height: 100%;
	overflow: scroll;
	& * {
		cursor: cell;
	}
`;


class Tavalo extends Component {
	constructor(props) {
		super(props);

		console.info('setting state', props);

		this.state = {
			hasError: false,
			data: [],
			size: {
				rows: props.rows,
				columns: props.columns,
			},
			selected: {
				row: [1, 1],
				column: [2, 2],
			},
			isDragging: false,
		}
	}

	componentDidCatch(error, info) {
		console.info('Error in Tavolo:', error, info);
		this.setState({ hasError: true });
	}

	setSelected = (rowEnd, colEnd, isDragging = false) => {
		console.info('setting selected', isDragging);
		if (rowEnd && colEnd) {
			this.setState((state) => ({
				...state,
				isDragging,
				selected: {
					row: [ state.selected.row[0], rowEnd ],
					column: [ state.selected.column[0], colEnd ],
				},
			}));
		}
	}

	setAllSelected = (row, column) => {
		if (row && column) {
			this.setState((state) => ({
				...state,
				isDragging: true,
				selected: {
					row: [ row, row ],
					column: [ column, column ],
				},
			}));
		}
	}

	onDragStart = (row, column) => {
		this.setAllSelected(row, column);
	}

	onDragEnd = (row, column) => {
		this.setSelected(row, column);
	}

	duringDrag = (row, column) => {
		this.setSelected(row, column, true);
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


	generateRows(size, data) {
		const rows = [];
		for (let i = 1; i <= size.rows; i++) {
			rows.push(
				<Row
					key={generateKey()}
					index={i}
					data={data[i - 1]}
					row={i}
					columns={size.columns}
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}
					duringDrag={this.duringDrag}
					isDragging={this.state.isDragging}
					selected={this.state.selected}
					{...this.state}
					>
				</Row>
			)
		}
		return rows;
	}

	getHeaderText(index) {
		let text = '';
		while (index > 0) {
			text = alphabet[index  % alphabet.length] + text;
			index = Math.floor(index / alphabet.length);
		}
		return text;
	}

	generateHeader() {
		const { size } = this.state;
		const cells = [];
		for (let i = -1; i < size.columns; i++) {
			cells.push(
				<Cell
					header={true}
					column={i}
					row={0}
					key={generateKey()}
					{...this.state}
					>
						{this.getHeaderText(i)}
					</Cell>
			);
		}
		return (
			<Row index={0} {...this.state}>
				{cells}
			</Row>
		);
	}

	render() {
		const { size, data } = this.state;
		if (this.state.hasError) {
			return <h2>
				:( Sad day...
				Tavalo ran into an error. We sent a report to our developers and will hopefully get if fixed soon.
				Sorry about that.
				</h2>;
		}
		if (!this.props.children) {
			return (
				<Container
					onCopy={this.handleCopy.bind(this)}
					onPaste={this.handlePaste.bind(this)}
					>
					<Table {...this.state}>
						<thead>
							{this.generateHeader()}
						</thead>
						<tbody>
							{this.generateRows(size, data)}
						</tbody>
					</Table>
				</Container>
			);
		}
		return (
			<Table>
				{this.props.children}
			</Table>
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

