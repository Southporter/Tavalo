import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Tr = styled.tr`
	min-height: 25px;
`;

class Row extends PureComponent {
	render() {
		const { children } = this.props;
		return (
			<Tr>
				{children}
			</Tr>
		);
	}
}

export default Row;
