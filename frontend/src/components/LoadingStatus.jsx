import LoadingSpinner from './LoadingSpinner';
function LoadingStatus({ status }) {
  return (
    <div className="loading-status">
      {status === 'loading' && (
        <div className="flex-center">
          <LoadingSpinner />
          <p>Fetching projects...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="error-text">
          <p> The backend is sleeping. Please try again later.</p>
        </div>
      )}
    </div>
  );
}

export default LoadingStatus;