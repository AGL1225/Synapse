import React, { forwardRef } from 'react';
import { CursorIcon } from './icons/CursorIcon';
import { OperationMode } from '../types';

interface JiggleAreaProps {
  cursorPosition: { x: number; y: number };
  operationMode: OperationMode;
  activeWindow: string;
  fakeWindows: string[];
}

const FakeWindowList: React.FC<{windows: string[], active: string}> = ({windows, active}) => (
    <div className="absolute inset-0 p-4 flex flex-col justify-center items-center bg-black/20 font-mono text-sm">
        <div className="w-full max-w-xs bg-gray-900/80 rounded-md p-2 border border-gray-600 shadow-lg">
            <p className="text-center text-gray-400 mb-2 text-xs">ACTIVE PROCESSES</p>
            {windows.map(win => (
                <div 
                    key={win} 
                    className={`px-3 py-1 my-1 rounded-sm text-left truncate transition-colors duration-200 ${
                        win === active ? 'bg-blue-600/80 text-white' : 'text-gray-300'
                    }`}
                >
                    {'>'} {win}
                </div>
            ))}
        </div>
    </div>
);

export const JiggleArea = forwardRef<HTMLDivElement, JiggleAreaProps>((
    { cursorPosition, operationMode, activeWindow, fakeWindows }, ref
) => {
  const showCursor = operationMode === 'jiggle' || operationMode === 'hybrid';
  const showWindows = operationMode === 'switch' || operationMode === 'hybrid';

  return (
    <div
      ref={ref}
      className="relative w-full h-64 lg:h-full bg-gray-800 rounded-lg overflow-hidden border border-gray-600"
      style={{
        background: 'repeating-conic-gradient(#2d3748 0% 25%, #4a5568 0% 50%) 50% / 20px 20px',
      }}
    >
      {showWindows && <FakeWindowList windows={fakeWindows} active={activeWindow} />}
      
      {showCursor && (
        <CursorIcon
          className="absolute w-6 h-6 text-white drop-shadow-lg transition-transform duration-200 ease-linear"
          style={{
            transform: `translate(${cursorPosition.x - 8}px, ${cursorPosition.y - 4}px)`,
          }}
        />
      )}
    </div>
  );
});