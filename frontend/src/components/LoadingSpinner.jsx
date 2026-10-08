function LoadingSpinner() {
  return (
    <div style={{
      width: '40px', height: '40px',
      border: '4px solid #333',
      borderTop: '4px solid #eab308',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      margin: '0 auto'
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingSpinner;

