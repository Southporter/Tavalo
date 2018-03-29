import React, { PureComponent } from 'react';

class Row extends PureComponent {
	render() {
		const { children } = this.props;
		return (
			<tr style={{ minHeight: '50px' }}>
				{children}
			</tr>
		);
	}
}

export default Row;
