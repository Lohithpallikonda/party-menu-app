import React, { useEffect, useState } from 'react';

const DishCard = ({ 
  dish, 
  isSelected, 
  onAddDish, 
  onRemoveDish, 
  onViewIngredients 
}) => {
  // Build fallback chain: dish image -> category image -> deterministic placeholder
  const fallbacks = [
    dish.image,
    dish.category && dish.category.image,
    `https://picsum.photos/seed/${dish.id}/600/400`,
    `${process.env.PUBLIC_URL || ''}/logo512.png`,
  ].filter(Boolean);

  const [srcIndex, setSrcIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    // Reset when dish changes
    setSrcIndex(0);
    setImgFailed(false);
  }, [dish.id]);

  const currentSrc = !imgFailed && fallbacks.length > 0 ? fallbacks[Math.min(srcIndex, fallbacks.length - 1)] : null;

  return (
    <div className={`dish-card ${isSelected ? 'selected' : ''}`}>
      <div className="dish-image">
        {currentSrc ? (
          <img
            src={currentSrc}
            alt={dish.name}
            onError={() => {
              if (srcIndex + 1 < fallbacks.length) {
                setSrcIndex((i) => i + 1);
              } else {
                setImgFailed(true);
              }
            }}
          />
        ) : (
          <div className="placeholder-image">
            <span>{dish.name.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="dish-content">
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-description">{dish.description}</p>
        <div className="dish-type">
          <span className={`type-badge ${dish.type.toLowerCase()}`}>
            {dish.type}
          </span>
        </div>
      </div>
      
      <div className="dish-actions">
        <button
          className="ingredient-button"
          onClick={() => onViewIngredients(dish)}
        >
          Ingredients
        </button>
        {isSelected ? (
          <button
            className="remove-button"
            onClick={() => onRemoveDish(dish.id)}
          >
            Remove
          </button>
        ) : (
          <button
            className="add-button"
            onClick={() => onAddDish(dish.id)}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default DishCard;
