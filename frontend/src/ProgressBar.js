import React from 'react';
import './ProgressBar.css';

export function ProgressBar({ progress }) { 
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function GameCountBar({ progress }) { 
  return (
    <div className="gameCount-bar">
      <div
        className="gameCount-bar-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

