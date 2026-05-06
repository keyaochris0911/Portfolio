import { Link } from 'react-router-dom';
import React, { useMemo, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const getSmoothPath = (points) => {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;
    d += ` Q ${curr.x} ${curr.y}, ${midX} ${midY}`;
  }
  d += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
  return d;
};

const cities = [
  { id: 1, name: "Gap-ing", x: 8, y: 30, type: 'video', src: "/visuals/Day1.MOV", text: "GAP期间 我去西班牙\n走了朝圣之路" },
  { id: 2, name: "but not", x: 29, y: 22, type: 'video', src: "/visuals/Day2.MOV", text: "100公里的徒步\n 让我终于慢下来 思考想要什么" },
  { id: 3, name: "stopping", x: 45, y: 32, type: 'video', src: "/visuals/Day3.MOV", text: "要在正确的方向上前行\n才会遇上志同道合的同行人" },
  { id: 4, name: "I am", x: 37, y: 55, type: 'video', src: "/visuals/Day45.mp4", text: "坚持按自己的节奏行走\n就总会到达目的地", position: 'left' },
  { id: 5, name: "walking", x: 55, y: 68, type: 'images', images: ["/visuals/newsletter.png", "/visuals/Job.jpg"], text: "回国之后Vibe coding了作品集\n搭了些AI自动化工作流" , position: 'left'},
  { id: 6, name: "while", x: 72, y: 55, type: 'video', src: "/visuals/cookie.MOV", text: "手搓了一个抽选每日运势的\n幸运饼干小游戏", position: 'top' },
  { id: 7, name: "learning", x: 82, y: 75, type: 'video', src: "/visuals/gift.mp4", text: "以及一个为朋友设计的\n生日礼物决赛圈小游戏", position: 'top' },
];

const MagneticMarker = ({ city, onToggle, isActive }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 25, stiffness: 200 });
  const springY = useSpring(y, { damping: 25, stiffness: 200 });

  return (
    <motion.div 
      ref={ref}
      onMouseMove={(e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        x.set((clientX - (left + width / 2)) * 0.12);
        y.set((clientY - (top + height / 2)) * 0.12);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={(e) => {
        e.stopPropagation(); // 防止触发空白关闭逻辑
        onToggle(city.id);
      }}
      className="absolute z-[80] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
      style={{ left: `${city.x}%`, top: `${city.y}%`, x: springX, y: springY }}
    >
      <div className="mb-2 flex flex-col items-center pointer-events-none">
        <span className="text-[18px] font-black text-white tracking-[0.4em] uppercase px-4 py-1" style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 1px 5px rgba(0, 0, 0, 0.69)' }}>
          {city.name}
        </span>
        <div className={`w-[1px] transition-all duration-500 bg-white/80 ${isActive ? 'h-6' : 'h-3'}`} />
      </div>
      <div className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-500 ${isActive ? 'bg-white scale-125 shadow-lg' : 'bg-red-600 shadow-xl'}`} />
    </motion.div>
  );
};

export default function LifePage() {
  const [activeId, setActiveId] = useState(null);
  const currentCity = useMemo(() => cities.find(c => c.id === activeId), [activeId]);

  const { steps, fullPath } = useMemo(() => {
    const points = [{ x: -5, y: 30 }, ...cities, { x: 105, y: 100 }];
    const pathD = getSmoothPath(points);
    const stepsArr = [];
    const stepInterval = 0.45;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i], p1 = points[i + 1];
      const dx = p1.x - p0.x, dy = p1.y - p0.y;
      const numSteps = Math.floor(Math.sqrt(dx*dx + dy*dy) / 7.5);
      for (let j = 0; j < numSteps; j++) {
        stepsArr.push({
          x: p0.x + dx * (j / numSteps),
          y: p0.y + dy * (j / numSteps),
          rotate: (Math.atan2(dy, dx) * 180 / Math.PI) + 90,
          delay: stepsArr.length * stepInterval
        });
      }
    }
    return { steps: stepsArr, fullPath: pathD };
  }, []);

  // --- 手动调整位置的代码在这里 ---
  const getPopupPlacement = (city) => {
    const baseWidth = '210px'; // 弹窗宽度
    if (city.position === 'left') {
      return { 
        width: baseWidth, 
        left: `${city.x - 15}%`, // 控制左侧弹出时的横向间距
        top: `${city.y - 15}%`, 
        transform: 'translate(-100%, -50%)', 
        transformOrigin: 'right' 
      };
    }
    if (city.position === 'top') {
      return { 
        width: baseWidth, 
        left: `${city.x - 10}%`, 
        top: `${city.y - 55}%`, // 控制上方弹出时的垂直间距
        transform: 'translate(-50%, -100%)', 
        transformOrigin: 'bottom' 
      };
    }
    // 默认（下方弹出）
    return { 
      width: baseWidth, 
      left: `${city.x}%`, 
      top: `${city.y + 12}%`, // 控制下方弹出时的垂直间距
      transform: 'translateX(-50%)', 
      transformOrigin: 'top' 
    };
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#A5C28F]">
      <div className="absolute inset-0 z-0 bg-[url('/visuals/grass_bg.jpg')] bg-cover bg-center" />
      
      {/* 1. 点击空白关闭遮罩层 */}
      <AnimatePresence>
        {activeId && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
            className="absolute inset-0 z-[90] bg-transparent cursor-default"
          />
        )}
      </AnimatePresence>

      <svg className="hidden">
        <filter id="rip-filter"><feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" seed="2" /><feDisplacementMap in="SourceGraphic" scale="7" /></filter>
      </svg>

      {/* 云朵路径通道 */}
      <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <mask id="pathMask">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <motion.path d={fullPath} fill="none" stroke="black" strokeWidth="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 12, ease: "linear" }} />
        </mask>
        <image href="/visuals/cloud_bg.jpg" x="0" y="0" width="100" height="100" mask="url(#pathMask)" preserveAspectRatio="none" />
      </svg>

      {/* 弹出小窗 */}
      <AnimatePresence mode="wait">
        {activeId && (
          <motion.div 
            key={activeId} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            className="absolute z-[100] flex flex-col p-3 shadow-2xl pointer-events-auto"
            style={getPopupPlacement(currentCity)}
            onClick={(e) => e.stopPropagation()} // 防止点击弹窗内部导致关闭
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md border border-white/40" style={{ filter: 'url(#rip-filter)', zIndex: -1 }} />
            <div className="px-1 pb-3">
              <p className="text-zinc-900 text-[12px] font-serif italic leading-relaxed drop-shadow-md whitespace-pre-line" 
               style={{ fontFamily: "'Playfair Display', serif" }}>
               {currentCity.text}
              </p>
            </div>
            {currentCity.type !== 'images' ? (
              <div className="w-full aspect-[9/16] bg-black/20 rounded-sm overflow-hidden"><video src={currentCity.src} autoPlay loop muted playsInline className="w-full h-full object-cover" /></div>
            ) : (
              <div className="flex flex-col gap-2">{currentCity.images.map((img, idx) => (<img key={idx} src={img} className="w-full aspect-video object-cover rounded-sm border border-white/20" alt="work" />))}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {cities.map(c => <MagneticMarker key={c.id} city={c} onToggle={setActiveId} isActive={activeId === c.id} />)}

      {/* 脚印 */}
      {steps.map((s, i) => (
        <motion.div key={i} className="absolute z-50 pointer-events-none" style={{ left: `${s.x}%`, top: `${s.y}%` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: s.delay, duration: 4, times: [0, 0.1, 1] }}>
          <div style={{ transform: `translate(-50%, -50%) rotate(${s.rotate}deg)` }}>
            <svg width="14" height="24" viewBox="0 0 30 60" className="text-white fill-current shadow-sm"><path d="M15,2 C22,2 28,8 28,18 C28,26 22,32 15,34 C8,34 2,26 2,18 C2,8 8,2 15,2 Z M15,42 C20,42 24,46 24,52 C24,58 20,60 15,60 C10,60 6,58 6,52 C6,46 10,42 15,42 Z" /></svg>
          </div>
        </motion.div>
      ))}

      <div className="absolute top-10 left-10 z-[110]">
        <Link to="/" className="text-[10px] tracking-[0.3em] text-white font-bold opacity-70 hover:opacity-100 uppercase">← BACK</Link>
      </div>
    </div>
  );
}