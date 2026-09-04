import React, { useState } from 'react';
import { Maximize2, Minimize2, Eye } from 'lucide-react';

interface FramedMockupContainerProps {
  children: React.ReactNode;
}

export const FramedMockupContainer: React.FC<FramedMockupContainerProps> = ({ children }) => {
  // Start in framed mode to match the reference image mockup presentation
  const [isFramed, setIsFramed] = useState<boolean>(true);

  return (
    <div
      id="app-root-container"
      className={`min-h-screen transition-colors duration-500 ${
        isFramed
          ? 'bg-gradient-to-br from-[#778B81] via-[#BFA48B] to-[#DFA37B] p-3 sm:p-6 md:p-10 lg:p-12 flex flex-col items-center justify-start'
          : 'bg-[#FDFBF7]'
      }`}
    >
      {/* Top Floating Control Bar for Framing Toggle */}
      <div className="w-full max-w-7xl flex items-center justify-between pb-3 px-2 select-none">
        <div className="flex items-center gap-2 text-stone-900">
          <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/70 backdrop-blur-md shadow-xs">
            Soft Hook Studio
          </span>
          <span className="text-xs text-stone-800/80 hidden sm:inline">
            Official E-Commerce Catalog & Boutique
          </span>
        </div>

        <button
          id="toggle-mockup-frame-btn"
          onClick={() => setIsFramed(!isFramed)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-800 hover:text-stone-950 text-xs font-medium backdrop-blur-md shadow-sm transition-all cursor-pointer"
          title={isFramed ? 'Switch to Full Browser View' : 'Switch to Reference Mockup Frame'}
        >
          {isFramed ? (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen View</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Reference Frame View</span>
            </>
          )}
        </button>
      </div>

      {/* Main Website Canvas */}
      <div
        id="website-canvas"
        className={`w-full max-w-7xl transition-all duration-500 bg-[#FDFBF7] ${
          isFramed
            ? 'rounded-2xl sm:rounded-3xl md:rounded-[32px] shadow-2xl shadow-stone-950/25 overflow-hidden border border-stone-100/30'
            : 'rounded-none shadow-none min-h-screen'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
