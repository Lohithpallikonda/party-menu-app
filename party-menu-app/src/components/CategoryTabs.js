import React from 'react';

const CategoryTabs = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  getDishCountByCategory 
}) => {
  return (
    <div className="category-tabs">
      {categories.map(category => (
        <button
          key={category}
          className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
          {getDishCountByCategory(category) > 0 && (
            <span className="count-badge">{getDishCountByCategory(category)}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;