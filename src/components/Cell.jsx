import React, { PureComponent } from 'react';

class Cell extends PureComponent {
	render() {
		const { children } = this.props;
				
		if (this.props.header) {
			<th style={{ minWidth: '100px' }}>
				{children}
			</th>
		}
		return (
			<td style={{ minWidth: '100px' }}>
				{children}
			</td>
		);
	}
}

export default Cell;
