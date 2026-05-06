import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

// --- 物件子组件 ---
const BagItem = ({ item, onHover, onClick }) => (
  <motion.div
    className={`absolute group ${item.className}`}
    style={{ zIndex: item.zIndex }}
    onMouseEnter={() => onHover(item)}
    onMouseLeave={() => onHover(null)}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div 
      className="relative w-full h-full cursor-pointer pointer-events-auto" 
      onClick={() => onClick(item.path)}
    >
      <img 
        src={item.src} 
        alt={item.label} 
        style={{ rotate: `${item.rotation}deg` }}
        className="w-full h-auto drop-shadow-xl select-none" 
      />
    </div>
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { label: '工作经历', path: '/work' },
    { label: '教育及实习', path: '/edu' },
    { label: ' Gap生活', path: '/life' },
    { label: '个人标签', path: '/about' },
  ];

  // 你提供的最新坐标与旋转配置
  const items = [
    { id: 'work', src: '/visuals/macbook.png', label: '工作经历', path: '/work', className: 'w-[55%] left-[24%] top-[29%]', zIndex: 10, rotation: -2, labelOffset: 'top-[22%] left-[44%]' },
    { id: 'edu', src: '/visuals/notebook.png', label: '教育及实习', path: '/edu', className: 'w-[16%] left-[52%] top-[54%]', zIndex: 20, rotation: 8, labelOffset: 'top-[30%] left-[56%]' },
    { id: 'life', src: '/visuals/camera.png', label: ' Gap生活', path: '/life', className: 'w-[16%] left-[32%] top-[62%]', zIndex: 30, rotation: -18, labelOffset: 'top-[40%] left-[30%]' },
    { id: 'about', src: '/visuals/guka.png', label: '个人标签', path: '/about', className: 'w-[14%] left-[29%] top-[32.5%]', zIndex: 50, rotation: 3, labelOffset: 'top-[22%] left-[29%]' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="relative w-full h-screen flex flex-col items-center overflow-hidden"
      style={{ 
        // 方案：Y2K 液态微光背景 (Mesh Gradient)
        backgroundColor: '#F1F5F9',
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(107, 140, 174, 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 0%, rgba(167, 243, 208, 0.1) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(107, 140, 174, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(167, 243, 208, 0.1) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.8) 0px, transparent 50%)
        `,
        backgroundSize: '100% 100%'
      }}
    >
      {/* 顶部导航 */}
      <nav className="absolute top-10 flex space-x-28 z-[150]">
        {navItems.map((i) => (
          <Link 
            key={i.path} 
            to={i.path} 
            className="text-[15px] tracking-[0.2em] text-[#8A9BB0] hover:text-[#496b8d] transition-colors duration-300 font-light"
          >
            {i.label}
          </Link>
        ))}
      </nav>

      {/* 场景层 */}
      <div className="relative w-full max-w-[800px] aspect-[4/3] flex items-center justify-center mt-10">
        
        {/* 渲染物件 */}
        {items.map((item) => (
          <BagItem 
            key={item.id} 
            item={item} 
            onHover={setHoveredItem} 
            onClick={() => navigate(item.path)} 
          />
        ))}

        {/* 透明包 */}
        <img 
          src="/visuals/bag.png" 
          alt="Bag" 
          className="w-[72%] h-auto z-[40] pointer-events-none select-none" 
        />

        {/* 全局悬浮 Label */}
        <div className="absolute inset-0 pointer-events-none z-[100]">
          <AnimatePresence mode="wait">
            {hoveredItem && (
              <motion.div
                key={hoveredItem.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                // Label 旋转角度同步物件旋转角度
                style={{ rotate: `${hoveredItem.rotation}deg` }}
                className={`absolute ${hoveredItem.labelOffset} -translate-x-1/2`}
              >
                <span className="block bg-white/95 px-5 py-2 rounded-sm text-sm tracking-[0.2em] font-medium text-[#6B8CAE] shadow-2xl border border-[#E2E8F0] whitespace-nowrap">
                  {hoveredItem.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="absolute bottom-10 tracking-[0.3em] text-[10px] text-[#8A9BB0]">
        朱轲瑶 · 个人作品集
      </div>

    </motion.div>
  );
}
