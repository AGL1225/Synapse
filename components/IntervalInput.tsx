
import React from 'react';

interface IntervalInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export const IntervalInput: React.FC<IntervalInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) newValue = min;
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;
    onChange(newValue);
  };

  const handleStep = (direction: 'up' | 'down') => {
    const newValue = direction === 'up' ? value + step : value - step;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-sm font-medium text-gray-400 mb-1">{label}</label>
      <div className="relative w-full">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          disabled={disabled}
          className="w-full bg-gray-900 border border-gray-600 rounded-md text-center text-lg py-2 px-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 transition"
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
          <button
            onClick={() => handleStep('up')}
            disabled={disabled || value >= max}
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:bg-gray-600 rounded-t-sm disabled:opacity-30"
          >
            ▲
          </button>
          <button
            onClick={() => handleStep('down')}
            disabled={disabled || value <= min}
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:bg-gray-600 rounded-b-sm disabled:opacity-30"
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};
