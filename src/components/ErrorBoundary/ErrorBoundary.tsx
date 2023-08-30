import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * ErrorBoundary is a React component that catches and handles errors in its child component hierarchy.
 * Instead of the app crashing, it displays a fallback UI and logs the error details.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  /**
   * This lifecycle method is triggered after a child component throws an error.
   * It's used to capture the error and determine what is rendered next.
   */
  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorInfo: null };
  }

  /**
   * This lifecycle method provides access to the error and its stack in the form of an errorInfo object.
   * Useful for logging errors to error reporting services.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
    this.setState({ errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.errorInfo) {
      // You can render any custom fallback UI
      return (
        <div style={{ color: 'black' }}>
          <h1>Something went wrong.</h1>
          {/* Optionally, display more detailed error info for debugging */}
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
