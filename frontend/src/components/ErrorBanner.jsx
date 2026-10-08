// src/components/ErrorBanner.jsx
function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner" style={{
      backgroundColor: '#fee2e2',
      border: '1px solid #ef4444',
      padding: '1rem',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3 style={{ color: '#991b1b', margin: 0 }}> Connection Error</h3>
      <p style={{ color: '#b91c1c' }}>{message || "Could not connect to the server."}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorBanner;