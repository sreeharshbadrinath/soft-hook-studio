import React from 'react';

interface FramedMockupContainerProps {
  children: React.ReactNode;
}

export const FramedMockupContainer: React.FC<FramedMockupContainerProps> = ({ children }) => {
  return (
    <div
      id="app-root-container"
      className="w-full min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col antialiased selection:bg-[#708A74] selection:text-white"
    >
      <div id="website-canvas" className="w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
