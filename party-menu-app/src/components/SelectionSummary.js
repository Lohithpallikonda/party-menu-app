import React from 'react';
import '../styles/SelectionSummary.css';

const SelectionSummary = ({ totalSelectedDishes, onContinue }) => {
  if (totalSelectedDishes === 0) {
    return null;
  }

  return (
    <div className="selection-summary">
      <div className="total-count">
        Total Selected: {totalSelectedDishes} dish{totalSelectedDishes !== 1 ? 'es' : ''}
      </div>
      <button className="continue-button" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
};

export default SelectionSummary;