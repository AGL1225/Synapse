import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';

export const Header: React.FC = () => (
  <header className="bg-gray-800/50 px-4 py-2 flex items-center justify-between border-b border-gray-600">
    <div className="flex items-center gap-2">
      <LightbulbIcon className="w-5 h-5 text-yellow-400" />
      <h1 className="text-md font-semibold text-gray-200">Synapse Notes</h1>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
    </div>
  </header>
);