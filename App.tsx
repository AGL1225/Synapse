import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { JiggleArea } from './components/JiggleArea';
import type { MoveInterval, OperationMode } from './types';
import { Header } from './components/Header';
import { StatusBar } from './components/StatusBar';

const FAKE_WINDOWS = [
    "Project_Phoenix.docx",
    "QuantumLeap_Spreadsheet.xlsx",
    "System_Monitor.exe",
    "dev_console.log",
    "Secure_VPN_Client",
];

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [interval, setInterval] = useState<MoveInterval>({
    hours: 0,
    minutes: 0,
    seconds: 1,
    milliseconds: 0,
  });
  const [moveCount, setMoveCount] = useState<number>(0);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // New state for modes
  const [operationMode, setOperationMode] = useState<OperationMode>('jiggle');
  const [activeWindow, setActiveWindow] = useState<string>(FAKE_WINDOWS[0]);

  // State for duration feature
  const [isDurationEnabled, setIsDurationEnabled] = useState<boolean>(false);
  const [runDuration, setRunDuration] = useState({ hours: 0, minutes: 5 });

  const jiggleAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const durationTimerRef = useRef<number | null>(null);

  const calculateTotalMilliseconds = useCallback(() => {
    const { hours, minutes, seconds, milliseconds } = interval;
    return (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds;
  }, [interval]);

  const performActivity = useCallback(() => {
    // Shared logic for all modes
    setMoveCount(prev => prev + 1);

    // Mode-specific logic
    if (operationMode === 'jiggle' || operationMode === 'hybrid') {
        if (jiggleAreaRef.current) {
            const rect = jiggleAreaRef.current.getBoundingClientRect();
            const newX = Math.random() * rect.width;
            const newY = Math.random() * rect.height;
            setCursorPosition({ x: newX, y: newY });
        }
    }
    if (operationMode === 'switch' || operationMode === 'hybrid') {
        const randomIndex = Math.floor(Math.random() * FAKE_WINDOWS.length);
        setActiveWindow(FAKE_WINDOWS[randomIndex]);
    }
  }, [operationMode]);
  
  const stopRunning = useCallback(() => {
    setIsRunning(false);
    setMoveCount(0);
    if (durationTimerRef.current) {
      clearTimeout(durationTimerRef.current);
      durationTimerRef.current = null;
    }
  }, []);

  const handleStartStop = useCallback(() => {
    if (isRunning) {
        stopRunning();
    } else {
        setIsRunning(true);
        // Perform one activity immediately on start
        performActivity();
    }
  }, [isRunning, stopRunning, performActivity]);

  useEffect(() => {
    if (isRunning) {
      const totalMs = calculateTotalMilliseconds();
      if (totalMs > 0) {
        timerRef.current = window.setInterval(performActivity, totalMs);
      }
      if (isDurationEnabled) {
          const durationMs = (runDuration.hours * 3600000) + (runDuration.minutes * 60000);
          if (durationMs > 0) {
              durationTimerRef.current = window.setTimeout(stopRunning, durationMs);
          }
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (durationTimerRef.current) {
          clearTimeout(durationTimerRef.current);
          durationTimerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (durationTimerRef.current) clearTimeout(durationTimerRef.current);
    };
  }, [isRunning, interval, calculateTotalMilliseconds, performActivity, isDurationEnabled, runDuration, stopRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'F3') {
        event.preventDefault();
        handleStartStop();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleStartStop]);

  const handleIntervalChange = (newInterval: Partial<MoveInterval>) => {
    setInterval(prev => ({ ...prev, ...newInterval }));
  };

  const handleDurationChange = (newDuration: Partial<{hours: number, minutes: number}>) => {
    setRunDuration(prev => ({ ...prev, ...newDuration }));
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-gray-700 rounded-xl shadow-2xl overflow-hidden border border-gray-600">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <SettingsPanel
            interval={interval}
            onIntervalChange={handleIntervalChange}
            isRunning={isRunning}
            onStartStop={handleStartStop}
            isDurationEnabled={isDurationEnabled}
            onIsDurationEnabledChange={setIsDurationEnabled}
            runDuration={runDuration}
            onRunDurationChange={handleDurationChange}
            operationMode={operationMode}
            onOperationModeChange={setOperationMode}
          />
          <JiggleArea 
            ref={jiggleAreaRef} 
            cursorPosition={cursorPosition}
            operationMode={operationMode}
            activeWindow={activeWindow}
            fakeWindows={FAKE_WINDOWS}
           />
        </main>
        <StatusBar isRunning={isRunning} moveCount={moveCount} />
      </div>
       <footer className="text-center mt-6 text-gray-500 text-sm">
        <p>This is a sandboxed simulation. It cannot control your actual system cursor or windows.</p>
      </footer>
    </div>
  );
};

export default App;