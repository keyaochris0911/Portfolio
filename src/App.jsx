import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion'; // 确保导入了 motion
import Home from './pages/Home';
import Work from './pages/Work';
import Edu from './pages/Edu';
import Life from './pages/Life';
import About from './pages/About';

// 1. 将 FloatContact 组件移到 App 定义之外（或保持在下方，但在 App 中调用）
const FloatContact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }} // 建议延迟 1 秒出现，等页面转场结束
      className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3"
    >
      <motion.a
        href="/Keyao Zhu.pdf" // 修正：直接从根目录引用，不要写 public/
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#5A7A9A] text-xs font-bold tracking-widest shadow-sm flex items-center gap-2"
      >
        <span>简历 / RESUME</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
      </motion.a>

      <div className="text-[10px] text-slate-400 font-mono text-right mr-2 opacity-60">
        CHRIS_ZKY@163.COM
      </div>
    </motion.div>
  );
};

const App = () => {
  return (
    // 2. 使用 Fragment (<>...</>) 或 div 将 Routes 和 FloatContact 包裹在一起渲染
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/edu" element={<Edu />} />
        <Route path="/life" element={<Life />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      {/* 3. 在这里显式地渲染组件 */}
      <FloatContact />
    </>
  );
};

export default App;