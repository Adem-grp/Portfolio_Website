import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-yellow-500 font-mono text-xl">
        LOADING_SYSTEM_DATA...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono">
        PROJECT_NOT_FOUND
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white p-6 md:p-12"
    >
      <motion.button
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="mb-12 px-6 py-2 bg-gray-900 text-yellow-500 border border-yellow-500/30 rounded-full text-xs font-black uppercase tracking-widest"
      >
        ← Back to Gallery
      </motion.button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="relative group">
          <div className="absolute -inset-1 bg-yellow-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <img
            src={project.image_path}
            alt={project.title}
            className="relative rounded-2xl border border-gray-800 w-full object-cover shadow-2xl"
          />
        </div>

        <div className="space-y-8">
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {project.skills?.map(skill => (
              <span key={skill.id} className="px-3 py-1 bg-blue-900/20 text-blue-400 border border-blue-900/50 rounded text-[10px] font-bold uppercase">
                {skill.name}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-lg leading-relaxed font-light">
            {project.description}
          </p>

          {project.github_link && (
            <motion.a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="inline-block px-10 py-4 bg-yellow-500 text-black font-black rounded-xl uppercase tracking-tighter hover:bg-yellow-400"
            >
              View Source Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;