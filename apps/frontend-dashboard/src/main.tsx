import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[RootErrorBoundary Caught Error]', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#090d16', color: '#f43f5e', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fb7185' }}>React Rendering Exception Caught</h2>
          <div style={{ background: '#1e1b4b', padding: '1rem', borderRadius: '8px', border: '1px solid #f43f5e', color: '#fff', marginBottom: '1rem' }}>
            <strong>{this.state.error?.toString()}</strong>
          </div>
          <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', color: '#94a3b8', overflowX: 'auto' }}>
            {this.state.errorInfo?.componentStack || this.state.error?.stack}
          </pre>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{ marginTop: '1.5rem', background: '#002b7f', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Clear Session & Reload Portal
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);
