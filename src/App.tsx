import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dna, Info, Zap, Shield, Microscope, Atom, Database, Radio } from 'lucide-react';
import DnaHelix from './components/3d/DnaHelix';
import { fetchDNAFact } from './services/geminiService';
import { cn } from './lib/utils';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeFact, setActiveFact] = useState<string | null>(null);
  const [loadingFact, setLoadingFact] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleHoverSegment = async (id: number | null) => {
    setHoveredId(id);
    if (id !== null) {
      setLoadingFact(true);
      const types = ['Adenine-Thymine', 'Thymine-Adenine', 'Cytosine-Guanine', 'Guanine-Cytosine'];
      const fact = await fetchDNAFact(types[id % 4]);
      setActiveFact(fact);
      setLoadingFact(false);
    } else {
      setActiveFact(null);
    }
  };

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans selection:bg-[#00f2ff]/30 text-slate-200">
      {/* 3D Background */}
      <DnaHelix onHoverSegment={handleHoverSegment} hoveredId={hoveredId} />

      {/* HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between z-10">
        {/* Header */}
        <header className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 animate-in fade-in slide-in-from-left duration-700"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
              <Dna className="text-cyan-400 relative z-10 w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-white neon-glow-cyan">
                HELIX EXPLORER
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/60">
                v2.0 // Genetic Sequence Visualizer
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-6 font-mono text-[10px] items-start"
          >
            <div className="text-right">
              <div className="text-white/40 uppercase">System Status</div>
              <div className="text-green-400 flex items-center gap-1 justify-end">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Operational
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/40 uppercase">Sequence Quality</div>
              <div className="text-cyan-400">99.98% Clarity</div>
            </div>
          </motion.div>
        </header>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-4 max-w-sm mt-8 md:mt-0">
          <AnimatePresence mode="wait">
            {activeFact ? (
              <motion.div
                key="fact-box"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="glass-panel rounded-2xl p-6 pointer-events-auto border-cyan-400/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Microscope size={18} />
                  </div>
                  <h3 className="font-display font-semibold text-white">Advanced Molecular Data</h3>
                </div>
                <div className="text-slate-300 text-sm leading-relaxed prose prose-invert prose-cyan">
                  <ReactMarkdown>{activeFact}</ReactMarkdown>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-white/30">
                  <span>SEGMENT_ID: {hoveredId?.toString().padStart(3, '0')}</span>
                  <span className="text-cyan-400/50 tracking-widest uppercase">Analysis Complete</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tip-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/20 font-mono text-[10px] p-6 space-y-1"
              >
                <p>HOVER OVER HELIX STRANDS FOR DEPTH ANALYSIS</p>
                <p>SCROLL OR PINCH TO ADJUST FIELD DEPTH</p>
                <p>DRAG TO ROTATE MOLECULAR VIEWER</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Bar */}
        <footer className="flex flex-wrap items-end justify-between gap-6 pointer-events-auto mt-auto">
          <div className="flex gap-4">
            <StatCard icon={<Database size={14}/>} label="Storage" value="4.2 PB" color="text-cyan-400" />
            <StatCard icon={<Radio size={14}/>} label="Uptime" value="128:09:42" color="text-purple-400" />
          </div>
          
          <div className="flex gap-2 p-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/5">
            <LegendItem color="bg-[#ff4d4d]" label="A" />
            <LegendItem color="bg-[#4dff88]" label="T" />
            <LegendItem color="bg-[#4da6ff]" label="C" />
            <LegendItem color="bg-[#ffcc4d]" label="G" />
          </div>
        </footer>
      </div>

      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-12 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <Zap className="mx-auto text-cyan-400 mb-6 animate-pulse" size={48} />
              <h2 className="font-display text-3xl font-bold text-white mb-2 tracking-tight uppercase">Initializing Neural Link</h2>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(0,242,255,0.8)]"
                />
              </div>
              <p className="font-mono text-[9px] text-white/40 mt-4 uppercase tracking-[0.3em]">Downloading genetic sequence 0x42A...19F</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </main>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3">
      <div className={cn("opacity-60", color)}>{icon}</div>
      <div>
        <div className="text-[8px] font-mono text-white/30 uppercase leading-none mb-1">{label}</div>
        <div className="text-xs font-mono text-white font-medium leading-none">{value}</div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-default">
      <div className={cn("w-2 h-2 rounded-full", color, "shadow-[0_0_5px_currentColor]")} />
      <span className="text-[10px] font-mono text-white/60">{label}</span>
    </div>
  );
}

