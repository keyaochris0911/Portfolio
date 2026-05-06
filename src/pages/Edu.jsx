import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Noto+Serif+SC:wght@400;700&family=Lora:ital,wght@0,400;0,500;1,400&family=Ma+Shan+Zheng&display=swap');
  
  /* 1. 标题（昆士兰大学）：统一使用衬线宋体，告别硬邦邦的黑体 */
  .font-header { 
    font-family: "Noto Serif SC", serif; 
    font-weight: 700;
    letter-spacing: 0.02em; 
  }
  
  /* 2. 职位（传播学硕士）：换成清秀不粘黏的毛笔感，或者直接用优雅的宋体 */
  .font-kalam { 
    font-family: 'Ma Shan Zheng', cursive; 
  }
  
  /* 3. 正文：Lora 处理数字，Noto Serif SC 处理中文 */
  .font-body { 
    font-family: 'Lora', "Noto Serif SC", serif; 
  }
  
  /* 4. 左侧年份：使用稳重的 Lora 斜体 */
  .font-note { 
    font-family: 'Lora', serif; 
    font-style: italic; 
    font-weight: 500; 
  }
`;

export default function Edu() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const eduData = [
    {
      year: "2018 – 2019",
      org: "昆士兰大学",
      role: "传播学硕士",
      tagColor: "#6B8CAE",
      highlights: [
        "QS全球排名40",
        "GPA：6.4/7.0",
        "以学院学术优秀奖身份毕业",
        "累计获奖学金达15,000澳元"
      ]
    },
    {
      year: "2014 – 2018",
      org: "华东师范大学",
      role: "公共关系学士",
      tagColor: "#82A696",
      highlights: [
        "双一流",
        "GPA：3.75/4.0",
        "四年保持专业排名前5%",
        "获上海公共关系协会优秀学生奖、优秀新生奖"
      ]
    },
    {
      year: "2019.07 – 12",
      org: "昆士兰大学-学生就业中心",
      role: "海外社交媒体运营",
      tagColor: "#D4A373",
      highlights: [
        "用户调研及传播策略：基于6类受众调研输出覆盖官网、社媒与EDM的分层传播框架，推动多行政组协同落地；",
        "海外社媒矩阵内容运营：从0-1搭建Instagram官方账号并建立内容调性标准，4个月涨粉6000+；主导YouTube 6支视频的选题策划与制作，频道平均播放量提升800%；重塑Facebook内容策略，实现互动率增长200%。"
      ]
    },
    {
      year: "2017.05 – 09",
      org: "万博宣伟",
      role: "媒介策划",
      tagColor: "#CC8B8C",
      highlights: [
        "品牌传播全案策划：参与澳大利亚旅游局“中澳旅游年”项目，协调《我们相爱吧》综艺与形象大使等拍摄，统筹艺人的在澳行程、采访提纲、宣传稿件；支持澳式足球中国首赛及高奢品牌酒店开业发布会的策划执行，协助媒体前置沟通和现场拍摄；",
        "行业监控及竞品调研：跟踪酒店行业竞品传播与媒体表现，输出周期分析报告并维护媒介数据库。"
      ]
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#F1F5F9]">
      <style>{fontStyle}</style>
      
      {/* 1. 底层：Homepage 静态快照 (z-0) */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundColor: '#F1F5F9',
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(107, 140, 174, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(167, 243, 208, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(107, 140, 174, 0.15) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(167, 243, 208, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.8) 0px, transparent 50%)
          `
        }}
      />

      {/* 2. 中间层：Edu 暖棕叠化层 (z-10) - 0.5s 快速变色 */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ 
          background: 'linear-gradient(135deg, #f3f0e1 0%, #D4CDC3 35%, #B7AD9E 100%)' 
        }}
      />

      {/* 3. 年轮纹理层 (z-20) - 0.6s 同步浮现 */}
      <motion.div 
        className="absolute inset-0 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ 
  backgroundImage: `
    repeating-radial-gradient(
      circle at 15% 15%, 
      rgba(101, 86, 75, 0.05) 0px, 
      rgba(101, 86, 75, 0.02) 1px,   /* 增加这 10px 的缓冲带 */
      transparent 200px               /* 这里的距离决定了“年轮”的疏密 */
    )
  `,
  mixBlendMode: 'multiply'
}}
      />

      {/* 内容层 (z-30) */}
      <div className="relative z-30 w-full h-full flex flex-col font-body">
        <div className="w-full px-10 py-8">
          <Link to="/" className="text-[10px] font-header tracking-[0.2em] text-slate-500/80 hover:text-slate-900 transition-all">
            ← BACK TO HOME
          </Link>
        </div>

        <div className="flex-1 flex px-20 pb-20 items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-6xl h-[680px] grid grid-cols-[360px_1fr] relative rounded-[18px] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)]"
          >
            {/* 左页 */}
            <div className="relative bg-[#FCFBF9] py-20 px-12 z-10" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(101, 86, 75, 0.08) 28px)', backgroundSize: '100% 28px' }}>
              {eduData.map((item, index) => (
                <div key={index} onClick={() => setActiveTab(index)} className="mb-12 cursor-pointer relative group">
                  <div className={`text-[14px] font-note transition-colors ${activeTab === index ? 'text-slate-900' : 'text-slate-400'}`}>{item.year}</div>
                  <div className={`mt-2 text-[16px] font-header tracking-wider ${activeTab === index ? 'text-[#6B8CAE]' : 'text-slate-300 group-hover:text-slate-400'}`}>{item.org}</div>
                  {activeTab === index && <motion.div layoutId="un-line" className="w-8 h-[1.5px] mt-4" style={{ backgroundColor: item.tagColor }} />}
                </div>
              ))}
            </div>

            {/* 书脊 */}
            <div className="absolute left-[350px] top-0 bottom-0 w-[15px] z-20 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.03) 100%)' }} />

            {/* 右页 */}
            <div className="relative bg-white pt-28 px-24 z-10" style={{ backgroundImage: 'linear-gradient(rgba(101, 86, 75, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(101, 86, 75, 0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }}> 
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab} 
                  initial={{ opacity: 0, x: 10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -10 }} 
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  <header>
                    <h2 className="text-[25px] font-header text-slate-800 tracking-tight leading-tight">{eduData[activeTab].org}</h2>
                    <div className="font-kalam text-[20px] text-[#6B8CAE] mt-4 tracking-wide">{eduData[activeTab].role}</div>
                  </header>
                  <div className="w-16 h-[1px] bg-slate-100" />
                  <div className="space-y-6">
                    {eduData[activeTab].highlights.map((text, i) => (
                      <div key={i} className="flex items-start">
                        <span className="font-note text-2xl text-[#6B8CAE]/40 mr-7 mt-0.5">{i+1}.</span>
                       <p className="text-[15px] text-slate-600 leading-[1.8] font-body tracking-normal">{text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}