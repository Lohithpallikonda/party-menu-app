import React from 'react';

const VegFilter = ({ 
  vegOnly, 
  nonVegOnly, 
  onVegOnlyChange, 
  onNonVegOnlyChange 
}) => {
  return (
    <div className="filter-container">
      <label className="filter-label">
        <input
          type="checkbox"
          checked={vegOnly}
          onChange={(e) => onVegOnlyChange(e.target.checked)}
        />
        Veg
      </label>
      <label className="filter-label">
        <input
          type="checkbox"
          checked={nonVegOnly}
          onChange={(e) => onNonVegOnlyChange(e.target.checked)}
        />
        Non-Veg
      </label>
    </div>
  );
};

export default VegFilter;