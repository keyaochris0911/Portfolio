import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ light = false }) {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/')} // 统一返回 Home
      className={`fixed top-8 left-8 z-[100] flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-300
        ${light 
          ? 'border border-white/20 bg-white/10 backdrop-blur-md text-white/70 hover:bg-white/20 hover:text-white hover:border-white/40' 
          : 'border border-slate-200/80 bg-white/60 backdrop-blur-md text-slate-400 hover:bg-white/90 hover:text-slate-600 hover:border-slate-300'
        }`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back
    </motion.button>
  );
}