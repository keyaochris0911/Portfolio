import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// --- 1. 基因引擎：优化节点密度 ---
const generatePlantDNA = () => {
  const slotCount = 10;
  // 增加生长位点的随机偏移量，避免完全等距[cite: 3]
  const potentialSlots = Array.from({ length: slotCount }).map((_, i) => 
    5 + (i * 90 / (slotCount - 1)) + (Math.random() * 2)
  );

  const totalNeeded = 7; // 稍微减少节点总数，配合增加的间距，防止视觉拥挤[cite: 3]
  const activeSlots = [...potentialSlots]
    .sort(() => Math.random() - 0.5)
    .slice(0, totalNeeded)
    .sort((a, b) => a - b); 

  let flowerCount = 0; 
  let bigFlowerGenerated = false;

  const nodes = activeSlots.map((pos, index) => {
    const side = index % 2 === 0 ? -1 : 1; 
    let type = 'leaf';
    let subType = 'normal';
    let sizeScale = 1;

    // 调整花朵出现几率，确保分布均匀[cite: 3]
    const isFlowerSlot = (pos > 15 && pos < 85 && flowerCount < 3 && Math.random() > 0.5) || (flowerCount === 0 && index === 2);

    if (isFlowerSlot) {
      type = 'flower';
      flowerCount++;
      if (!bigFlowerGenerated && pos > 30 && pos < 70) {
        subType = 'big';
        sizeScale = 1.1 + Math.random() * 0.2; 
        bigFlowerGenerated = true;
      } else {
        subType = pos < 25 ? 'tiny' : 'normal';
        sizeScale = subType === 'tiny' ? 0.45 : 0.6 + Math.random() * 0.3;
      }
    } else {
      type = 'leaf';
      subType = pos < 20 ? 'tiny' : (pos > 80 ? 'big' : 'normal');
      sizeScale = subType === 'big' ? 0.9 : 0.6 + Math.random() * 0.2;
    }

    return {
      type,
      subType,
      top: `${pos}%`,
      side, 
      size: (type === 'flower' ? 68 : 42) * sizeScale,
      rotate: Math.random() * 360,
      baseDelay: (totalNeeded - index) * 0.15 
    };
  });

  return { nodes, swingPhase: Math.random() * Math.PI };
};

const WindChimeColumn = ({ data, isPlanted, onPlant }) => {
  const { nodes, swingPhase } = data.dna;

  return (
    <motion.div 
      className="relative flex flex-col items-center h-screen"
      style={{ 
        width: '92px', 
        marginLeft: data.customMargin, 
        originY: "top" 
      }}
      // --- 修改开始：进场大幅度摆动序列 ---
      animate={{ 
        // 初始大幅度摆动（例如从 -12度 到 10度），然后衰减到你目前的 [-0.6, 0.6]
        rotate: [0, -12, 10, -6, 4, -0.6, 0.6, -0.6] 
      }}
      transition={{ 
        // 前半部分大幅摆动用较快的时间，后半部分循环用你设定的 12s
        duration: 16, 
        times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.6, 1], // 控制每个角度停留的时间占比
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0,
        delay: swingPhase 
      }}
    >
      <div className="w-[1px] h-20 bg-slate-200/60" />
      
      <motion.div 
        onClick={() => onPlant(data.id)}
        className="z-50 flex flex-col items-center group cursor-pointer"
      >
        <div 
          className="w-14 h-7 rounded-t-full border border-white/40 backdrop-blur-md relative overflow-hidden shadow-sm"
          style={{ background: `radial-gradient(circle at 50% 0%, ${data.themeColor}50 0%, ${data.themeColor}10 100%)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>
        <div className="w-7 h-32 mt-[-1px] border border-slate-100 bg-white/40 backdrop-blur-[6px] flex items-center justify-center shadow-sm">
          <span className="text-[13px] text-slate-400/100 tracking-[0.4em] uppercase" style={{ writingMode: 'vertical-rl' }}>
            {data.label}
          </span>
        </div>
      </motion.div>

      <div className="absolute w-full pointer-events-none" style={{ top: '208px', bottom: '20px' }}>
        <AnimatePresence>
          {isPlanted && (
            <div className="relative w-full h-full">
              <motion.div 
                className="absolute left-1/2 w-[1.2px] bg-[#A3B18A] origin-top -translate-x-1/2"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {nodes.map((node, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + node.baseDelay, type: 'spring', damping: 15 }}
                  className="absolute"
                  style={{ 
                    top: node.top,
                    left: '50%',
                    // 维持之前的向右 10px 视觉修正[cite: 3]
                    marginLeft: node.type === 'flower' ? `${(node.side * 22) + 10}px` : '0px'
                  }}
                >
                  <div className="relative w-0 h-0 flex items-center justify-center">
                    {node.type === 'flower' ? (
                      <div
                        style={{
                          position: 'absolute',
                          width: `${node.size}px`,
                          height: `${node.size}px`,
                          transform: `translate(-50%, -50%) rotate(${node.rotate}deg)`,
                          zIndex: 20
                        }}
                      >
                        <img 
                          src={`/visuals/flower${data.flowerId}.png`} 
                          alt=""
                          className="w-full h-full object-contain"
                          style={{ filter: node.subType === 'big' ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))' : 'none' }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          position: 'absolute',
                          width: `${node.size}px`,
                          height: `${node.size * 0.7}px`,
                          transformOrigin: 'left center',
                          transform: `translate(0, -50%) scaleX(${node.side}) rotate(${-15 + Math.random() * 10}deg)`,
                          zIndex: 10
                        }}
                      >
                        <svg viewBox="0 0 30 20" className="w-full h-full">
                          <path d="M0 20 Q15 15 30 0 Q10 5 0 20" fill="#A3B18A" fillOpacity={node.subType === 'tiny' ? 0.5 : 0.8} />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function SpacedGarden() {
  const [plantedIds, setPlantedIds] = useState([]);

  const gardenWithDNA = useMemo(() => {
    // customMargin 统一增加 15% 左右[cite: 3]
    const config = [
        { id: 0, label: "整合营销策划", flowerId: 1, themeColor: "#FFB7C5", customMargin: '12px' },
        { id: 1, label: "社媒内容运营", flowerId: 2, themeColor: "#F48FB1", customMargin: '46px' },
        { id: 2, label: "数据驱动", flowerId: 3, themeColor: "#90CAF9", customMargin: '23px' },
        { id: 3, label: "消费者洞察", flowerId: 4, themeColor: "#FFCC80", customMargin: '69px' },
        { id: 4, label: "品牌叙事", flowerId: 5, themeColor: "#EF5350", customMargin: '18px' },
        { id: 5, label: "公关传播", flowerId: 6, themeColor: "#F06292", customMargin: '46px' },
    ];
    return config.map(item => ({ ...item, dna: generatePlantDNA() }));
  }, []);

  return (
    <div className="fixed inset-0 bg-[#F8F9F5] flex justify-center items-start overflow-hidden pt-10">
     
     {/* --- 新增：返回按钮 --- */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.history.back()} // 或者使用 navigate(-1)
        className="fixed top-8 left-8 z-[100] flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/60 backdrop-blur-md text-slate-400 text-xs font-medium tracking-widest shadow-sm"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        BACK
      </motion.button>
      {/* ---------------------- */}

      <div className="flex items-start">
        {gardenWithDNA.map(item => (
          <WindChimeColumn 
            key={item.id} 
            data={item} 
            isPlanted={plantedIds.includes(item.id)} 
            onPlant={(id) => !plantedIds.includes(id) && setPlantedIds(p => [...p, id])} 
          />
        ))}
      </div>
    </div>
  );
}