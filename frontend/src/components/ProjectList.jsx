import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import LoadingStatus from './LoadingStatus';
import ErrorBanner from './ErrorBanner';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'error', 'success'
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProjects = async () => {
    setStatus('loading');
    try {
      // Make sure your FastAPI server is running on port 8000!
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`);
      setProjects(response.data);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Failed to connect to the backend.");
      setStatus('error');
    }
  };

  useEffect(() => {
    // The legacy API view loads its remote data on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, []);

  if (status === 'loading') return <LoadingStatus status="loading" />;
  if (status === 'error') return <ErrorBanner message={errorMessage} onRetry={fetchProjects} />;

  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 className="text-4xl font-extrabold text-white mb-10 text-center">Project Gallery</h2>

    {projects.length === 0 ? (
      <p className="text-gray-400 text-center">No projects found. Time to add some to the database!</p>
    ) : (
      /* This creates the responsive 3-column grid */
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )}
  </div>
);
}

export default ProjectList;