import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { generateKey } from '../utils';

const Tr = styled.tr`
	min-height: 25px;
`;

class Row extends PureComponent {
	generateCells() {
		const {
			data,
			columns,
			row,
			onDragStart,
			onDragEnd,
			duringDrag,
			isDragging,
			selected,
		} = this.props;
		console.info('in row cells', isDragging);

		const cells = [
			<Cell
				key={generateKey()}
				row={row}
				readonly
				column={-1}
				selected={selected}
				{...this.state}
				>
				{row}
			</Cell>
		];
		for (let i = 0; i < columns; i++) {
			cells.push(
				<Cell
					key={generateKey()}
					row={row}
					column={i}
					onMouseDown={onDragStart}
					onMouseUp={onDragEnd}
					onMouseMove={duringDrag}
					selected={selected}
					isDragging={isDragging}
					{...this.state}
					>
					{data[i]}
				</Cell>
			);
		}
		return cells;
	}

	render() {
		const { children } = this.props;
		return (
			<Tr>
				{children || this.generateCells()}
			</Tr>
		);
	}
}

export default Row;
