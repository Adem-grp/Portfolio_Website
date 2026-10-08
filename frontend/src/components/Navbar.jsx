import { motion } from 'framer-motion';

const InteractiveHeader = () => {
  const buttons = [
    { name: 'About', link: '#about' },
    { name: 'Projects', link: '#projects' },
    { name: 'Contact', link: '#contact' }
  ];

  return (
    <header className="py-32 px-8 text-center bg-black border-b border-gray-900">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-7xl md:text-8xl font-black text-white mb-10 tracking-tighter"
      >
        NAME <span className="text-yellow-500">SURNAME</span>
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-6">
        {buttons.map((btn) => (
          <motion.a
            key={btn.name}
            href={btn.link}
            whileHover={{ scale: 1.15, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            className="px-10 py-4 bg-yellow-500 text-black font-black rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)] uppercase tracking-widest text-sm transition-shadow hover:shadow-yellow-500/50"
          >
            {btn.name}
          </motion.a>
        ))}
      </div>
    </header>
  );
};

export default InteractiveHeader;