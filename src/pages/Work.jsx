import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Work() {
  const [isLoading, setIsLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState([]);
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const clock = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => { clearTimeout(timer); clearInterval(clock); };
  }, []);

  const formatTime = (date) => {
    const options = { month: 'short', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
    const parts = date.toLocaleString('en-US', options).replace(/,/g, '').split(' ');
    return `${parts[1]} ${parts[2]} ${parts[0]} ${parts[3]}`;
  };

  // 数据中心：以后改文字只动这里
  const careerData = [
    { 
      id: 'ali', 
      title: '阿里巴巴.doc', 
      type: 'text', 
      company: '淘天集团', 
      role: '公关传播专家',
      duration: 'Aug 2023 - Jan 2026',
      oneLiner: 'Digital Marketing System & Integrated Campaigns',
      highlights: [
        '数字营销体系建设：',
        '  体系搭建：在淘天集团独立拆分背景下，从0到1搭建短视频数字营销体系，建立供应商准入标准、达人资源库与动态评分考核机制；核心供应商实现70%续签率，渠道合作模型被集团其他事业部复用；',
        '  项目交付：独立负责淘宝、天猫核心节点（双11/510周年庆/淘宝闪购等）和日常传播的短视频内容策略与效果交付；统筹千万级年度传播预算，保障月均20+项目高质量落地；实现热搜上榜率超75%，CPM/CPE优于市场均值。',
        '整合Campaign策划——热点营销项目：',
        '  统筹“淘宝丑东西大赛”“大国重器购物车”等项目的整合营销设计，构建「预热种草→正片爆发→线下激活→KOL/UGC长尾联动」传播节奏，线上声量与线下场景双线联动，项目多次登上视频平台热门榜，获评国家级传播奖项和中国区年度营销案例奖等国际性奖项。'
      ],
      skills: ['Integrated Marketing', 'Digital Strategy', 'Agency Management', 'Data-Driven']
    },
    { 
      id: 'daily', 
      title: '四川日报', 
      type: 'text', 
      company: '四川日报', 
      role: '新媒体主编/策划师',
      duration: 'Sep 2020 - Jul 2023',
      oneLiner: 'Multi-Platform Growth & IP Content Operations',
      highlights: [
        '新媒体增长与内容操盘：',
        '  通过平台算法研究与用户行为分析，建立了稳定爆款生产模型，30+次登上微博热搜前三，50+条微信阅读量破10万，10+条抖音播放量过亿，就职期间保持了单条视频流量最高记录，集团年度十佳优秀编辑的最年轻获得者；',
        '  主导矩阵号的内容结构升级与视频化转型，实现抖音粉丝量从300万涨到1000万，微博粉丝量从800万涨到1200，b站粉丝增长10倍，多平台账号的粉丝规模进入行业前三；',
        '爆款IP项目策划——三星堆：',
        '  牵头“三星堆考古大发现”融媒体整合策划，统筹跨部门与外部机构资源，打造了“专题报道+微纪录片+文物推介短视频+动画MV+文博机构新媒体联动+KOL共创+UGC挑战+文创衍生（表情包、NFT数字藏品、实体文创）”的立体内容矩阵，实现IP化运营。项目全网总传播量近50亿，单条最高曝光超10亿；作品获中国新闻奖二等奖及2023网络正能量音视频奖，三星堆也因其突出的社会传播效果获2021全国十大考古新发现。',
      ],
      skills: ['Digital Media Landscape','Hit Content Models', 'Cultural IP Operations', 'User Growth', 'Cross-functional Leadership']
    },
  ];

  const projectData = [
    { 
      id: 'ugly', 
      title: '淘宝丑东西大赛.mp4', 
      type: 'visual', 
      company: '淘天集团', 
      role: '视觉牵头人',
      duration: '2025.12 - 2026.08',
      oneLiner: '2025淘宝丑东西大赛',
      videoSrc: '/visuals/04-7.MP4',
      highlights: [
        '从Z世代消费者对「个性美学」的重新定义出发，重新设计淘宝丑东西大赛的传播设计逻辑',
        '创新性提出‘丑术馆’运营创意并负责线下落地，实现线上声量与线下场景双线联动',
        '14天展期内每天预约满额，期间产生了20000+条用户原创内容',
        '超10+展览单品转化直接来自展览场景种草，商品/店铺流量达到年度峰值，远超双11；月成交数据环比翻倍',
        '项目因此获2025中国区年度最佳营销案例奖'
      ],
      skills: ['Social Buzz', 'Brand Identity', 'Integrated Marketing']
    },
    { 
      id: 'sxd', 
      title: '三星堆IP运营.mp4', 
      type: 'visual', 
      company: '四川日报',
      role: '项目负责人',
      duration: '2020 - 2023',
      oneLiner: '三星堆IP运营',
      videoSrc: '/visuals/2021_news_award.mp4',
      highlights: [
        '打造了“专题报道+微纪录片+文物推介短视频+动画MV+文博机构新媒体联动+文创衍生（表情包、NFT数字藏品、实体文创）+KOL共创+UGC挑战”的立体内容矩阵',
        '将考古事件转化为可持续运营的文化IP',
        '项目全网总传播量近50亿，单条最高曝光超10亿',
        '作品获中国新闻奖二等奖及2023网络正能量音视频奖，三星堆也因其突出的社会传播效果获2021全国十大考古新发现'
      ],
      skills: ['IP Operation', 'Cultural Marketing', 'Resource Coordination']
    },
    { 
      id: 'Awards', 
      title: '所获奖项.zip', 
      type: 'Awards', 
      company: '创意内容类', 
      role: '负责项目的获奖经历',
      duration: '2020 - 2026',
      oneLiner: '国家级及以上级别奖项',
      highlights: [],
    }
  ];

  const focusWindow = (id) => {
    const newZ = zIndexCounter + 1;
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
    setZIndexCounter(newZ);
  };

  const openWindow = (item) => {
    if (!openWindows.find(w => w.id === item.id)) {
      const offset = openWindows.length * 25;
      const newZ = zIndexCounter + 1;
      setOpenWindows([...openWindows, { ...item, zIndex: newZ, x: 280 + offset, y: 60 + offset }]);
      setZIndexCounter(newZ);
    } else {
      focusWindow(item.id);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans select-none bg-[#F1F5F9]">
      
      {/* 1. 墙纸渐变衔接层：独立出来，始终渲染 */}
      <div className="absolute inset-0 z-0 bg-[#F1F5F9]" />
      <motion.div 
        className="absolute inset-0 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ background: 'linear-gradient(to bottom, #F1F5F9 0%, #D1DBE5 10%, #4e7698 100%)' }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0 z-[5000] flex flex-col items-center justify-center bg-transparent"
          >
            {/* 这里的容器现在是 bg-transparent，直接透出下方的渐变 */}
            <div className="relative flex flex-col items-center">
              {[64, 48, 32, 24].map((size, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: [0, 0.6, 0.2], y: -40, x: [0, i % 2 === 0 ? 8 : -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  style={{ fontSize: size }}
                  className="mb-1"
                >🫧</motion.div>
              ))}
              <motion.p className="mt-8 text-[18px] font-mono tracking-[0.5em] text-slate-800/40 uppercase">
                工作经历回忆中...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full z-10">
          {/* Menu Bar */}
          <div className="w-full h-7 bg-white/20 backdrop-blur-xl flex items-center justify-between px-4 border-b border-white/10">
            <div className="flex space-x-8 items-center">
              <span className="text-[11px] font-bold text-slate-800 tracking-tighter italic"> Keyao Zhu</span>
              <span className="text-[10px] text-slate-700/80 font-medium cursor-default">File</span>
              <span className="text-[10px] text-slate-700/80 font-medium cursor-default">View</span>
            </div>
            <div className="text-[10px] text-slate-700/70 font-mono tracking-tight">{formatTime(currentTime)}</div>
          </div>

          {/* Desktop Icons */}
          <div className="absolute left-10 top-12 flex space-x-12 text-left">
            <div className="flex flex-col space-y-10">
              {careerData.map(item => <SquircleIcon key={item.id} item={item} onClick={() => openWindow(item)} />)}
            </div>
            <div className="flex flex-col space-y-10">
              {projectData.map(item => <SquircleIcon key={item.id} item={item} onClick={() => openWindow(item)} />)}
            </div>
          </div>

          {/* Windows */}
          <AnimatePresence>
            {openWindows.map((win) => (
              <motion.div 
                key={win.id} drag dragMomentum={false}
                onMouseDown={() => focusWindow(win.id)}
                initial={{ opacity: 0, scale: 0.98, y: 10 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }}
                style={{ zIndex: win.zIndex, position: 'absolute', top: win.y, left: win.x }}
                className={`shadow-2xl rounded-2xl overflow-hidden border border-white/40 bg-white/70 backdrop-blur-3xl flex flex-col ${win.type === 'Awards' ? 'w-[640px]' : 'w-[460px]'}`}
              >
                <div className="h-9 px-4 flex items-center bg-white/30 border-b border-white/10 cursor-grab active:cursor-grabbing">
                  <div className="flex space-x-2">
                    <div onClick={(e) => { e.stopPropagation(); setOpenWindows(prev => prev.filter(w => w.id !== win.id)) }} className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm cursor-pointer hover:brightness-90 transition-all" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm" />
                  </div>
                  <span className="flex-1 text-center text-[9px] text-slate-500 font-bold tracking-[0.15em] uppercase ml-[-36px]">{win.title}</span>
                </div>

              
                   {/* Window Content */}
                <div className="p-7 max-h-[550px] overflow-y-auto custom-scrollbar">
                  {win.type === 'Awards' ? (
                    <div className="text-left">
                      {/* Awards 顶部标题区 */}
                      <div className="mb-10">
                        <div className="flex justify-between items-end mb-1">
                          <p className="text-[10px] text-blue-600 font-bold tracking-wider uppercase">{win.company}</p>
                          <p className="text-[9px] text-slate-400 font-mono italic">{win.duration}</p>
                        </div>
                        <h2 className="text-[22px] font-black text-slate-900 mb-1 leading-tight tracking-tighter uppercase">{win.role}</h2>
                        <p className="text-[11px] text-slate-500 font-light italic leading-snug">{win.oneLiner}</p>
                      </div>

                      {/* 内容区块 01: 2021新闻奖 */}
                      <div className="relative z-10 mb-24 group">
                        <div className="relative w-[108%] -ml-[4%] aspect-[16/7] bg-slate-950 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
                          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
                            <source src="/visuals/2021_news_award.mp4" type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />
                          <div className="absolute top-5 right-10 flex flex-col items-end text-white">
                            <span className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase mb-1">Year</span>
                            <span className="text-[32px] font-light font-mono leading-none text-white">2021</span>
                          </div>
                          <div className="absolute bottom-5 left-10 max-w-[80%]">
                            <h3 className="text-[42px] font-black text-white leading-none tracking-tighter uppercase mb-4">
                              China News <br /> <span className="text-blue-600">Awards</span>
                            </h3>
                            <div className="flex flex-col">
                              <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Issued by</p>
                              <p className="text-[11px] font-bold text-white/90 uppercase tracking-widest">All-China Journalists Association</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 内容区块 02: 2023音视频奖 */}
                      <div className="relative mb-32 px-4 group">
                        <div className="flex gap-8 items-start mb-10">
                          <div className="relative w-[15%] pt-4">
                            <div className="aspect-[1/2.5] rounded-full border border-slate-200 bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center py-8">
                              <span className="text-[9px] font-black tracking-[0.4em] text-blue-500 uppercase mb-2">Year</span>
                              <span className="text-[28px] font-light text-slate-800 font-mono">2023</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src="/visuals/2023_energy_award.mp4" type="video/mp4" />
                              </video>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-[44px] font-black text-slate-900 leading-[0.9] uppercase mb-4 tracking-tighter">China Inspiring <br /> Audio-Visual <span className="text-blue-600">Awards</span></h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issued by <span className="text-slate-800 ml-2">Cyberspace Administration of China</span></p>
                      </div>

                      {/* 内容区块 03: 2023双大奖 */}
                      <div className="relative mt-12 mb-24 px-4 group">
                        <div className="absolute top-0 -left-2 z-20 max-w-[250px] p-3.5 bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl transform -translate-y-12">
                          <h3 className="text-[18px] font-black text-slate-900 leading-tight uppercase mb-1 tracking-tighter">
                            China Inspiring <br /> Campaign <span className="text-blue-600">Awards</span>
                          </h3>
                          <p className="text-[7px] font-bold text-slate-500 uppercase tracking-wider text-left">Cyberspace Administration of China</p>
                        </div>
                        <div className="absolute bottom-4 -right-2 z-20 max-w-[220px] p-3.5 bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-2xl transform translate-y-10">
                          <h3 className="text-[18px] font-black text-slate-900 leading-tight uppercase mb-1 tracking-tighter text-right">
                            China <span className="text-blue-600">PR Case</span> <br /> of the Year
                          </h3>
                          <p className="text-[7px] font-bold text-slate-500 uppercase tracking-wider text-right text-right">China Public Relations Association</p>
                        </div>
                        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-10 -mx-4 px-12 snap-x snap-mandatory">
                          {[
                            { type: 'image', src: '/visuals/03-1.png' },
                            { type: 'image', src: '/visuals/03-2.png' },
                            { type: 'image', src: '/visuals/03-3.png' },
                            { type: 'video', src: '/visuals/03-4.mp4' },
                            { type: 'image', src: '/visuals/03-5.png' },
                            { type: 'image', src: '/visuals/03-6.jpg' },
                          ].map((item, index) => (
                            <div key={index} className="flex-none w-[80vw] md:w-[70%] snap-start relative">
                              <div className="relative aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm">
                                {item.type === 'video' ? (
                                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                    <source src={item.src} type="video/mp4" />
                                  </video>
                                ) : (
                                  <img src={item.src} alt="" className="w-full h-full object-cover" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 内容区块 04: 2025亚洲零售大奖 */}
                      <div className="relative mt-24 mb-20 px-4 group">
                        <div className="mb-8">
                          <h3 className="text-[44px] font-black text-slate-900 leading-[0.9] uppercase mb-4 tracking-tighter">
                            Marketing Initiative <br /> of the <span className="text-blue-600">Year</span>
                          </h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Issued by <span className="text-slate-800 ml-2">Retail Asia Awards</span>
                          </p>
                        </div>
                        <div className="flex gap-8 items-start">
                          <div className="relative w-[15%] pt-4">
                            <div className="aspect-[1/2.5] rounded-full border border-slate-200 bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center py-8 shadow-sm">
                              <span className="text-[9px] font-black tracking-[0.4em] text-blue-500 uppercase mb-2">Year</span>
                              <span className="text-[28px] font-light text-slate-800 font-mono">2025</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="columns-2 gap-3 space-y-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar-thin">
                              {[
                                { type: 'video', src: '/visuals/04-4.mp4' },
                                { type: 'image', src: '/visuals/04-1.png' },
                                { type: 'image', src: '/visuals/04-2.jpeg' },
                                { type: 'image', src: '/visuals/04-3.jpeg' },
                                { type: 'video', src: '/visuals/04-7.MP4' },
                                { type: 'image', src: '/visuals/04-6.jpeg' },
                                { type: 'image', src: '/visuals/04-5.jpeg' },
                                { type: 'image', src: '/visuals/04-8.png' },
                                { type: 'image', src: '/visuals/04-16.png' },
                                { type: 'video', src: '/visuals/04-9.mp4' },
                                { type: 'image', src: '/visuals/04-11.png' },
                                { type: 'image', src: '/visuals/04-12.png' },
                                { type: 'image', src: '/visuals/04-14.png' },
                                { type: 'image', src: '/visuals/04-10.png' },
                              ].map((item, idx) => (
                                <motion.div key={idx} whileHover={{ y: -4 }} className="relative break-inside-avoid rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                                  {item.type === 'video' ? (
                                    <video autoPlay loop muted playsInline className="w-full object-cover">
                                      <source src={item.src} type="video/mp4" />
                                    </video>
                                  ) : (
                                    <img src={item.src} alt="" className="w-full h-auto object-cover" />
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (win.id === 'ugly' || win.id === 'sxd') ? (
                    /* Visual Layout (Ugly/SXD) */
                    <div className="space-y-6 text-left">
                      <section className="border-b border-slate-100 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-[10px] text-blue-600 font-black tracking-widest uppercase mb-1">{win.company}</p>
                            <h2 className="text-[19px] font-black text-slate-900 leading-tight tracking-tighter uppercase">
                              {win.oneLiner}
                            </h2>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 shadow-sm">
                            {win.duration}
                          </span>
                        </div>
                      </section>

                      <div className="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                        <video key={win.id} autoPlay loop muted playsInline className="w-full h-full object-cover">
                          <source src={win.videoSrc} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
                      </div>

                      <div className="grid grid-cols-1 gap-5">
                        <section>
                          <h4 className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                            My Role
                          </h4>
                          <div className="pl-3.5 border-l-2 border-slate-100">
                            <p className="text-[13px] text-slate-700 font-medium leading-relaxed">{win.role}</p>
                          </div>
                        </section>
                        <section>
                          <h4 className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            Results
                          </h4>
                          <ul className="space-y-2 pl-3.5">
                            {win.highlights?.map((text, i) => (
                              <li key={i} className="flex items-start text-[12px] text-slate-600 font-light leading-relaxed">
                                <span className="mr-2 text-slate-300">•</span>{text}
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {win.skills?.map((skill, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-200/50 shadow-sm">#{skill}</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Original Text Layout (Ali/Daily) */
                    <div className="space-y-6 text-left">
                      <div className="mb-6">
                        <div className="flex justify-between items-end mb-1">
                          <p className="text-[10px] text-blue-600 font-bold tracking-wider uppercase">{win.company}</p>
                          <p className="text-[9px] text-slate-400 font-mono italic">{win.duration}</p>
                        </div>
                        <h2 className="text-[17px] font-semibold text-slate-900 mb-2 leading-tight">{win.role}</h2>
                        <p className="text-[12px] text-slate-500 font-light italic leading-snug">{win.oneLiner}</p>
                      </div>
                      <section className="bg-white/40 rounded-xl p-4 border border-white/30">
                        <h4 className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-3">Key Responsibilities</h4>
                        <ul className="space-y-3">
                          {win.highlights?.map((text, i) => (
                            <li key={i} className="flex items-start text-[12px] text-slate-700 font-light leading-relaxed">
                              <span className="mr-2 text-blue-400/60 mt-1">•</span>{text}
                            </li>
                          ))}
                        </ul>
                      </section>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {win.skills?.map((skill, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-white/50 text-slate-500 border border-slate-200/50 shadow-sm">#{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Bottom Dock */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Link to="/" className="group block relative">
              <motion.div 
                whileHover={{ y: -4, scale: 1.05 }}
                className="w-14 h-14 bg-white/20 backdrop-blur-2xl border border-white/40 rounded-[18px] flex items-center justify-center text-2xl shadow-xl hover:bg-white/30 transition-all duration-300"
              >💼</motion.div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-900/80 rounded-full" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function SquircleIcon({ item, onClick }) {
  const iconMap = { 'text': '📄', 'Awards': '📬', 'visual': '🗂️' };
  return (
    <motion.div whileHover={{ scale: 1.08, y: -2 }} onClick={onClick} className="cursor-pointer flex flex-col items-center w-20 group transition-all duration-300">
      <div className="relative w-12 h-12 flex items-center justify-center mb-1.5">
        <span className="relative text-[42px] z-10 select-none filter drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300">{iconMap[item.type] || '📄'}</span>
      </div>
      <span className="text-[9px] text-slate-800 font-semibold px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm whitespace-nowrap">{item.title}</span>
    </motion.div>
  );
}