import React from 'react';
import type { MoveInterval, OperationMode } from '../types';
import { IntervalInput } from './IntervalInput';
import { PlayIcon } from './icons/PlayIcon';
import { StopIcon } from './icons/StopIcon';

interface SettingsPanelProps {
  interval: MoveInterval;
  onIntervalChange: (newInterval: Partial<MoveInterval>) => void;
  isRunning: boolean;
  onStartStop: () => void;
  isDurationEnabled: boolean;
  onIsDurationEnabledChange: (enabled: boolean) => void;
  runDuration: { hours: number; minutes: number; };
  onRunDurationChange: (newDuration: Partial<{ hours: number; minutes: number; }>) => void;
  operationMode: OperationMode;
  onOperationModeChange: (mode: OperationMode) => void;
}

const MODE_DESCRIPTIONS: Record<OperationMode, { title: string; description: string }> = {
  jiggle: {
    title: 'Cursor Jiggle',
    description: 'Simulates random mouse cursor movement within the activity area to mimic user presence.',
  },
  switch: {
    title: 'Window Switch',
    description: 'Simulates switching between different application windows to show ongoing, active work.',
  },
  hybrid: {
    title: 'Hybrid',
    description: 'Performs both cursor movement and window switching for the most realistic activity simulation.',
  },
};

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  interval, 
  onIntervalChange, 
  isRunning, 
  onStartStop,
  isDurationEnabled,
  onIsDurationEnabledChange,
  runDuration,
  onRunDurationChange,
  operationMode,
  onOperationModeChange,
}) => {
  const handleIntervalValueChange = (name: keyof MoveInterval, value: number) => {
    onIntervalChange({ [name]: value });
  };

  const handleDurationValueChange = (name: 'hours' | 'minutes', value: number) => {
    onRunDurationChange({ [name]: value });
  };

  const ModeButton: React.FC<{mode: OperationMode, label: string}> = ({mode, label}) => (
      <button 
        onClick={() => onOperationModeChange(mode)}
        disabled={isRunning}
        className={`flex-1 py-2 px-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500
        ${operationMode === mode ? 'bg-blue-600 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'}
        disabled:opacity-50 disabled:cursor-not-allowed`}
      >
          {label}
      </button>
  );

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-800/50 rounded-lg border border-gray-600">
       <div>
        <h2 className="text-lg font-bold text-gray-100 mb-2 border-b border-gray-600 pb-2">Operation Mode</h2>
        <div className="flex gap-2 mt-2">
            <ModeButton mode="jiggle" label="Cursor Jiggle" />
            <ModeButton mode="switch" label="Window Switch" />
            <ModeButton mode="hybrid" label="Hybrid" />
        </div>
        <div className="mt-3 p-3 bg-gray-900/50 rounded-md border border-gray-600 min-h-[70px]">
          <p className="text-sm text-gray-200 font-semibold">{MODE_DESCRIPTIONS[operationMode].title}</p>
          <p className="text-xs text-gray-400 mt-1">{MODE_DESCRIPTIONS[operationMode].description}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-100">Activity Interval</h2>
        <p className="text-xs text-gray-400 mb-4 border-b border-gray-600 pb-2">Define how often the simulated activity (cursor jiggle, window switch, or both) should occur.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <IntervalInput
            label="Hours"
            value={interval.hours}
            onChange={(val) => handleIntervalValueChange('hours', val)}
            min={0}
            max={23}
            disabled={isRunning}
          />
          <IntervalInput
            label="Minutes"
            value={interval.minutes}
            onChange={(val) => handleIntervalValueChange('minutes', val)}
            min={0}
            max={59}
            disabled={isRunning}
          />
          <IntervalInput
            label="Seconds"
            value={interval.seconds}
            onChange={(val) => handleIntervalValueChange('seconds', val)}
            min={0}
            max={59}
            disabled={isRunning}
          />
          <IntervalInput
            label="Milliseconds"
            value={interval.milliseconds}
            onChange={(val) => handleIntervalValueChange('milliseconds', val)}
            min={0}
            max={999}
            step={10}
            disabled={isRunning}
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-2">
            <h2 className="text-lg font-bold text-gray-100">Run Duration</h2>
            <div className="flex items-center">
                <label htmlFor="duration-toggle" className="text-sm text-gray-400 mr-2">Stop after</label>
                <input
                    type="checkbox"
                    id="duration-toggle"
                    checked={isDurationEnabled}
                    onChange={(e) => onIsDurationEnabledChange(e.target.checked)}
                    disabled={isRunning}
                    className="h-5 w-5 text-blue-500 bg-gray-900 border-gray-600 rounded focus:ring-blue-500 disabled:opacity-50"
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="">
                 <IntervalInput
                    label="Hours"
                    value={runDuration.hours}
                    onChange={(val) => handleDurationValueChange('hours', val)}
                    min={0}
                    max={99}
                    disabled={!isDurationEnabled || isRunning}
                />
            </div>
            <div className="">
                <IntervalInput
                    label="Minutes"
                    value={runDuration.minutes}
                    onChange={(val) => handleDurationValueChange('minutes', val)}
                    min={0}
                    max={59}
                    disabled={!isDurationEnabled || isRunning}
                />
            </div>
        </div>
      </div>

      <button
        onClick={onStartStop}
        className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-bold text-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 ${
          isRunning 
            ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500' 
            : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
        }`}
      >
        {isRunning ? <StopIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
        <span>{isRunning ? 'Stop (Ctrl+F3)' : 'Start (Ctrl+F3)'}</span>
      </button>
    </div>
  );
};