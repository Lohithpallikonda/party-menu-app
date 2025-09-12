import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Star, ShoppingCart, Filter, Heart, Plus, Minus } from 'lucide-react';
import { dishes } from './data/mockData';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'All', name: 'All', emoji: '🍽️', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'NORTH_INDIAN', name: 'North Indian', emoji: '🍛', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'SOUTH_INDIAN', name: 'South Indian', emoji: '🥥', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 'CONTINENTAL', name: 'Continental', emoji: '🍝', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 'BIRYANI_RICE', name: 'Biryani & Rice', emoji: '🍚', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { id: 'DESSERTS', name: 'Desserts', emoji: '🍰', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  ];

  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => {
      const dishCategory = dish.category?.name || dish.category || '';
      const matchesCategory = selectedCategory === 'All' || dishCategory.toUpperCase().replace(/\s+/g, '_') === selectedCategory;
      const matchesType = selectedType === 'ALL' || dish.type === selectedType;
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [selectedCategory, selectedType, searchTerm]);

  const addToCart = (dish) => {
    setCart(prev => ({
      ...prev,
      [dish.id]: (prev[dish.id] || 0) + 1
    }));
  };

  const removeFromCart = (dish) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[dish.id] > 1) {
        newCart[dish.id]--;
      } else {
        delete newCart[dish.id];
      }
      return newCart;
    });
  };

  const toggleFavorite = (dishId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dishId)) {
        newFavorites.delete(dishId);
      } else {
        newFavorites.add(dishId);
      }
      return newFavorites;
    });
  };

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [dishId, count]) => {
    const dish = dishes.find(d => d.id === parseInt(dishId));
    const price = dish?.price || 0;
    return sum + (dish ? price * count : 0);
  }, 0);

  return (
    <div className="app">
      {/* Header */}
      <motion.header 
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="header-content">
          <div className="location-info">
            <MapPin className="location-icon" />
            <div>
              <h2>FoodieDelight</h2>
              <p>Deliver to Home • 25-30 mins</p>
            </div>
          </div>
          
          <motion.button 
            className="cart-btn"
            onClick={() => setShowCart(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Craving something delicious?
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Order from your favorite restaurants and get it delivered fresh to your doorstep
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="search-container"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for dishes, cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Category Tabs */}
      <motion.section 
        className="categories"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
      >
        <div className="categories-scroll">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="category-emoji">{category.emoji}</span>
              <span className="category-name">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section 
        className="filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="filter-group">
          <Filter className="filter-icon" />
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">All Types</option>
            <option value="VEG">Vegetarian</option>
            <option value="NON-VEG">Non-Vegetarian</option>
          </select>
        </div>
      </motion.section>

      {/* Dishes Grid */}
      <motion.section 
        className="dishes"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="dishes-grid">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                className="dish-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <div className="dish-image-container">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="dish-image"
                    loading="lazy"
                    onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/imgs-cooked/paneer_bhurji.png';}}
                  />
                  <motion.button
                    className={`favorite-btn ${favorites.has(dish.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(dish.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart fill={favorites.has(dish.id) ? '#ff4757' : 'none'} />
                  </motion.button>
                  <div className={`dish-type ${dish.type.toLowerCase()}`}>
                    <div className={`type-indicator ${dish.type.toLowerCase()}`}></div>
                  </div>
                </div>
                
                <div className="dish-info">
                  <h3 className="dish-name">{dish.name}</h3>
                  <div className="dish-meta">
                    <div className="rating">
                      <Star fill="#ffa502" stroke="#ffa502" size={16} />
                      <span>4.{Math.floor(Math.random() * 5) + 2}</span>
                    </div>
                    <div className="cook-time">
                      <Clock size={16} />
                      <span>{15 + Math.floor(Math.random() * 20)} mins</span>
                    </div>
                  </div>
                  <p className="dish-description">
                    {dish.description || 'Delicious and freshly prepared dish'}
                  </p>
                  <div className="dish-footer">
                    <span className="dish-price">₹{dish.price || Math.floor(Math.random() * 300) + 50}</span>
                    {cart[dish.id] ? (
                      <div className="quantity-controls">
                        <motion.button
                          className="quantity-btn"
                          onClick={() => removeFromCart(dish)}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={16} />
                        </motion.button>
                        <span className="quantity">{cart[dish.id]}</span>
                        <motion.button
                          className="quantity-btn"
                          onClick={() => addToCart(dish)}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        className="add-btn"
                        onClick={() => addToCart(dish)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={16} />
                        Add
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            />
            <motion.div
              className="cart-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="cart-header">
                <h3>Your Order</h3>
                <button onClick={() => setShowCart(false)}>×</button>
              </div>
              <div className="cart-items">
                {Object.entries(cart).map(([dishId, count]) => {
                  const dish = dishes.find(d => d.id === parseInt(dishId));
                  if (!dish) return null;
                  return (
                    <div key={dishId} className="cart-item">
                      <img src={dish.image} alt={dish.name} loading="lazy" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/imgs-cooked/paneer_bhurji.png';}} />
                      <div className="cart-item-info">
                        <h4>{dish.name}</h4>
                        <span>₹{dish.price || Math.floor(Math.random() * 300) + 50} × {count}</span>
                      </div>
                      <div className="cart-item-controls">
                        <button onClick={() => removeFromCart(dish)}>-</button>
                        <span>{count}</span>
                        <button onClick={() => addToCart(dish)}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {cartCount > 0 && (
                <div className="cart-footer">
                  <div className="cart-total">
                    <strong>Total: ₹{cartTotal}</strong>
                  </div>
                  <button className="checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
