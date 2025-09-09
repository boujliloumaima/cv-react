import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ percentage }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const clamped = Math.max(0, Math.min(percentage, 100));
    const timeout = setTimeout(() => setAnimatedWidth(clamped), 100); // Delay for smooth entry
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${animatedWidth}%` }} />
      <span className="progress-label">{animatedWidth}%</span>
    </div>
  );
};

export default ProgressBar;
