import React, { PureComponent } from 'react';
import { func, number, bool } from 'prop-types';
import styled, { css } from 'styled-components';

function isBetween({ row, column, selected }) {
	const [ rowStart, rowStop ] = selected.row;
	const [ colStart, colStop ] = selected.column;
	if (rowStart <= row && row <= rowStop &&
		colStart <= column && column <= colStop) {
		return true;
	}
	return false;
}

function isColumnBetween({ column, selected }) {
	const [ colStart, colStop ] = selected.column;
	if (colStart <= column && column <= colStop) {
		return true;
	}
	return false;
}


const Th = styled.th`
	border: 1px solid black;
	background-color: gray;
	${props => isColumnBetween(props) && css`
		background-color: green;
	`}
	text-align: center;
`;
const Td = styled.td`
	border: 1px solid black;
	${props => isBetween(props) && css`
		background-color: green;
		& > input {
			background-color: green;
		}
	`}
`;
const Input = styled.input`
	min-height: 20px;
	border: blue;
	&:focus {
		outline: none;
	}
`;
const ReadOnly = styled.div`
	min-height: 20px;
	min-width: 60px;
	${props => props.strong ? 'font-weight: bold' : ''}
`;

class Cell extends PureComponent {
	state = {
		isEditing: false,
	}

	handleMouseDown = () => {
		const { onMouseDown, row, column } = this.props;
		onMouseDown(row, column);
	}
	handleMouseUp = () => {
		const { onMouseUp, row, column } = this.props;
		onMouseUp(row, column);
	}
	handleMouseOver = () => {
		const { onMouseMove, row, column, isDragging } = this.props;
		console.info('isDragging', isDragging);
		if (isDragging) onMouseMove(row, column);
	}
	handleDoubleClick = () => {
		console.info('handling double click');
		this.setState((state) => ({
			isEditing: true,
		}));
	}

	render() {
		const { children } = this.props;

		if (this.props.header) {
			return (
				<Th {...this.props}>
					<ReadOnly strong={true}>{children}</ReadOnly>
				</Th>
			);
		} else if (this.props.readonly || !this.state.isEditing) {
			return (
				<Td {...this.props}>
					<ReadOnly
						onMouseDown={this.handleMouseDown}
						onMouseUp={this.handleMouseUp}
						onMouseEnter={this.handleMouseOver}
						>
						{children}
					</ReadOnly>
				</Td>
			);
		}
		return (
			<Td {...this.props}>
				<Input
					defaultValue={children}
					onMouseDown={this.handleMouseDown}
					onMouseUp={this.handleMouseUp}
					onMouseEnter={this.handleMouseOver}
					/>
			</Td>
		);
	}
}

Cell.propTypes = {
	updateFocus: func,
	column: number,
	row: number,
	header: bool,
	readonly: bool,
};

export default Cell;
