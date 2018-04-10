import React, { Component } from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
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
`;


class Tavalo extends Component {
	constructor(props) {
		super(props);

		console.info('setting state', props);

		this.isDragging = false;

		this.state = {
			data: [],
			size: {
				rows: props.rows,
				columns: props.columns,
			},
			selected: {
				row: [1, 1],
				column: [2, 2],
			},
		}
	}

	setSelected = (rowEnd, colEnd) => {
		if (rowEnd && colEnd) {
			this.setState((state) => ({
				...state,
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
				selected: {
					row: [ row, row ],
					column: [ column, column ],
				},
			}));
		}
	}

	onDragStart = (row, column) => {
		console.info('drag start');
		this.isDragging = true;
		this.setAllSelected(row, column);
	}

	onDragEnd = (row, column) => {
		console.info('drag end');
		this.isDragging = false;
		this.setSelected(row, column);
	}

	duringDrag = (row, column) => {
		console.info('during drag', this.isDragging);
		if (this.isDragging) {
			this.setSelected(row, column);
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

	generateCells(size, row, data = []) {
		const cells = [
			<Cell
				key={generateKey()}
				row={row}
				readonly
				column={-1}
				{...this.state}
				>
				{row}
			</Cell>
		];
		for (let i = 0; i < size.columns; i++) {
			cells.push(
				<Cell
					key={generateKey()}
					row={row}
					column={i}
					onMouseDown={this.onDragStart}
					onMouseUp={this.onDragEnd}
					onMouseMove={this.duringDrag}
					{...this.state}
					>
					{data[i]}
				</Cell>
			);
		}
		return cells;
	}

	generateRows(size, data) {
		const rows = [];
		for (let i = 1; i <= size.rows; i++) {
			rows.push(
				<Row
					key={generateKey()}
					index={i}
					{...this.state}
					>
					{this.generateCells(size, i, data[i - 1])}
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
		)

	}

	render() {
		const { size, data } = this.state;
		if (!this.props.children) {
			return (
				<ErrorBoundary>
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
				</ErrorBoundary>
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

