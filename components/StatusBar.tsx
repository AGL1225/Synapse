import React from 'react';

interface StatusBarProps {
    isRunning: boolean;
    moveCount: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({ isRunning, moveCount }) => {
    const statusText = isRunning ? "SYSTEM STATUS: ACTIVE" : "SYSTEM STATUS: IDLE";
    const statusColor = isRunning ? "text-green-400" : "text-yellow-400";

    return (
        <footer className="bg-gray-900/70 px-6 py-3 border-t border-gray-600 flex justify-between items-center">
            <p className={`font-mono font-bold text-lg tracking-wider ${statusColor}`}>
                {statusText}
            </p>
            <div className="text-right">
                <p className="text-sm text-gray-400">Events Logged</p>
                <p className="text-xl font-bold text-white">{moveCount}</p>
            </div>
        </footer>
    );
};