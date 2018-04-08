import React, { PureComponent } from 'react';
import { node } from 'prop-types';

class ErrorBoundary extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
		}
	}

	componentDidCatch(error, info) {
		console.info('Error in Tavolo:', error, info);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <h2>
				:( Sad day...
				Tavalo ran into an error. We sent a report to our developers and will hopefully get if fixed soon.
				Sorry about that.
				</h2>
		}
		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: node,
}

export default ErrorBoundary;
