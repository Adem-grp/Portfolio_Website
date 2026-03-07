import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { id, title, description, image_path, skills } = project;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="max-w-sm rounded-2xl overflow-hidden bg-black border border-gray-800 flex flex-col h-full shadow-2xl"
    >
      <img className="w-full h-48 object-cover opacity-70 hover:opacity-100 transition-opacity" src={image_path} alt={title} />

      <div className="px-6 py-6 flex-grow">
        <h3 className="font-bold text-xl mb-3 text-yellow-500 uppercase tracking-tight">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{description}</p>
      </div>

      <div className="px-6 pb-4 flex flex-wrap gap-2">
        {skills?.map((skill) => (
          <span key={skill.id} className="bg-blue-900/20 text-blue-400 border border-blue-900/50 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
            {skill.name}
          </span>
        ))}
      </div>

      <div className="px-6 py-6 border-t border-gray-900 mt-auto">
        <Link
          to={`/project/${id}`}
          className="text-yellow-500 font-black text-xs uppercase tracking-widest hover:text-yellow-300 transition-colors flex items-center gap-2"
        >
          View Details <span className="text-lg">→</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;