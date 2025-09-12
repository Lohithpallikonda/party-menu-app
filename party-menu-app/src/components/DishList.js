import React from 'react';
import DishCard from './DishCard';

const DishList = ({ 
  dishes, 
  selectedDishes, 
  onAddDish, 
  onRemoveDish, 
  onViewIngredients 
}) => {
  if (dishes.length === 0) {
    return (
      <div className="dish-list">
        <div className="no-dishes">No dishes found</div>
      </div>
    );
  }

  return (
    <div className="dish-list">
      {dishes.map(dish => {
        const isSelected = selectedDishes.includes(dish.id);
        return (
          <DishCard
            key={dish.id}
            dish={dish}
            isSelected={isSelected}
            onAddDish={onAddDish}
            onRemoveDish={onRemoveDish}
            onViewIngredients={onViewIngredients}
          />
        );
      })}
    </div>
  );
};

export default DishList;