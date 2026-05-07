import React, { useEffect } from 'react'; // ✨ 关键点：必须在这里加上 useEffect
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import Home from './pages/Home';
import Work from './pages/Work';
import Edu from './pages/Edu';
import Life from './pages/Life';
import About from './pages/About';

const preloadMedia = () => {
  const mediaUrls = [
    "/visuals/Day1.webm", 
    "/visuals/Day2.webm",
    "/visuals/Day3.webm",
    "/visuals/Day45.webm",
    "/visuals/cookie.webm",
    "/visuals/gift.webm",
    "/visuals/cloud_bg.webp",
    "/visuals/grass_bg.webp",
    "/visuals/04-7.webm",
    "/visuals/2021_news_award.webp", // 补充了前面的斜杠确保路径一致
  ];
  mediaUrls.forEach(url => {
    // 兼容 .webm 和 .mp4 的视频预加载逻辑
    if (url.endsWith('.mp4') || url.endsWith('.webm')) {
      const video = document.createElement('video');
      video.src = url;
      video.preload = 'auto';
    } else {
      const img = new Image();
      img.src = url;
    }
  });
};

// 1. 悬浮联系组件
const FloatContact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }} 
      className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3"
    >
      <motion.a
        href="/Keyao Zhu.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        // 已经应用了你要求的瘦身后的样式
        className="px-4 py-2 rounded-full border-[0.5px] border-slate-200 bg-white/40 backdrop-blur-md text-[#5A7A9A] text-[10px] font-medium tracking-[0.2em] shadow-sm flex items-center gap-2 transition-colors hover:bg-white/60"
      >
        <span>简历 / RESUME</span>
        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
      </motion.a>

      <div className="text-[10px] text-slate-400 font-mono text-right mr-2 opacity-60">
        chris_zky@163.com
      </div>
    </motion.div>
  );
};

// 2. 主程序入口
function App() {
  // 在组件加载后执行素材预加载
  useEffect(() => {
    preloadMedia();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#F1F5F9]">
      <div className="noise-overlay" /> {/* 全局噪点层 */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/edu" element={<Edu />} />
        <Route path="/life" element={<Life />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <FloatContact />
    </div>
  );
}

export default App;