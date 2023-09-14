import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    // You can log the error here for debugging purposes
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red' }}>
          <p>Something went wrong!</p>
          {/* You can customize the error message further */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
