// Unified data source for Party Menu Selection App
// Imports comprehensive JSON and normalizes fields expected by the app.

import rawData from './comprehensive_menu_data.json';

// Deterministic helper for stable fallback pricing (avoids re-render randomness)
const hashString = (str = '') => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0; // Convert to 32bit int
  }
  return Math.abs(h);
};
const stablePriceFor = (dish) => 50 + (hashString(dish?.name || String(dish?.id || '0')) % 301);

// Normalize to ensure filters work consistently
const normalizeType = (type) => (type === 'NON_VEG' ? 'NON-VEG' : type);

// Map of available cooked images in public folder to dish names
const cookedImageMap = {
  'chicken lababdar': '/imgs-cooked/chicken_lababdar.png',
  'chicken vindaloo': '/imgs-cooked/chicken_vindaloo.png',
  'malai kofta': '/imgs-cooked/malai_kofta.png',
  'mutton keema': '/imgs-cooked/mutton_keema.png',
  'paneer bhurji': '/imgs-cooked/paneer_bhurji.png',
  'paneer do pyaza': '/imgs-cooked/paneer_do_pyaza.png',
};

// External image URLs provided for specific dishes (prefer these)
const externalImageMap = {
  'paneer butter masala': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Paneer_Butter_Masala.jpg/1024px-Paneer_Butter_Masala.jpg',
  'dal makhani': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Dal_Makhani.jpg',
  'chicken tikka masala': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Chicken_tikka_masala.jpg/960px-Chicken_tikka_masala.jpg',
  'mutton rogan josh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Mutton_rogan_josh.jpg/1024px-Mutton_rogan_josh.jpg',
  'palak paneer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Palak_Paneer.JPG/1024px-Palak_Paneer.JPG',
  'kadhai paneer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Kadai_Paneer.JPG/1024px-Kadai_Paneer.JPG',
  'butter chicken': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/1024px-Chicken_makhani.jpg',
  'aloo gobi': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Aloo_gobi.jpg',
  'chicken curry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Chicken_curry.jpg/1024px-Chicken_curry.jpg',
  'rajma': 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Punjabi_Rajma.jpg',
  'chole': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Chole_Masala_India.jpg/960px-Chole_Masala_India.jpg',
  'fish curry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Fish_Curry_from_India.jpg/1024px-Fish_Curry_from_India.jpg',
  'keema curry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Keema_curry_%283781572762%29.jpg/1024px-Keema_curry_%283781572762%29.jpg',
  'paneer makhani': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Paneer_Makhani.jpg',
  'chicken korma': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Chicken_Korma.JPG/1024px-Chicken_Korma.JPG',
  'bhindi masala': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Bhindi_Masala.jpg/1024px-Bhindi_Masala.jpg',
  'egg curry': 'https://upload.wikimedia.org/wikipedia/commons/1/19/Egg_curry.jpg',
  'paneer tikka masala': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Paneer_Tikka_Masala.jpg',
  'mutton curry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Mutton_curry.jpg/1024px-Mutton_curry.jpg',
  'mixed dal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mixed_dal_with_vegetables.jpg/1146px-Mixed_dal_with_vegetables.jpg',
  // Continental (15)
  'mushroom risotto': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mushroom_Risotto_(4789415965).jpg/1024px-Mushroom_Risotto_(4789415965).jpg',
  'grilled chicken breast': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Grilled_Chicken_Breasts_(28905381261).jpg',
  'caesar salad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Caesar_salad_(1).jpg/1024px-Caesar_salad_(1).jpg',
  'beef steak': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Beef_steak_(11888070325).jpg/1024px-Beef_steak_(11888070325).jpg',
  'pasta alfredo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pasta_Alfredo_with_peas.jpg/1024px-Pasta_Alfredo_with_peas.jpg',
  'fish and chips': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Fish_and_Chips_2.jpg/1024px-Fish_and_Chips_2.jpg',
  'vegetable lasagna': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Vegetarian-lasagna.jpg/1024px-Vegetarian-lasagna.jpg',
  'chicken parmesan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Chicken_Parmesan_(30880787857).jpg/1024px-Chicken_Parmesan_(30880787857).jpg',
  'greek salad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Greek_salad.jpg/1024px-Greek_salad.jpg',
  'lamb chops': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Grilled_lamb_chops.jpg/1024px-Grilled_lamb_chops.jpg',
  'caprese salad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Caprese.jpg/1024px-Caprese.jpg',
  'salmon teriyaki': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Salmon_Teriyaki.jpg/1024px-Salmon_Teriyaki.jpg',
  'stuffed bell peppers': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Stuffed_bell_peppers_Karnataka_DSC0001.jpg/858px-Stuffed_bell_peppers_Karnataka_DSC0001.jpg',
  'chicken caesar wrap': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/2023-08-02_13_28_10_A_Wawa_Chicken_Caesar_Wrap_in_the_Quick_Serve_Center_in_Westampton_Township%2C_New_Jersey.jpg/1024px-2023-08-02_13_28_10_A_Wawa_Chicken_Caesar_Wrap_in_the_Quick_Serve_Center_in_Westampton_Township%2C_New_Jersey.jpg',
  'minestrone soup': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Minestrone_soup.jpg/1024px-Minestrone_soup.jpg',
  // Biryani & Rice (15)
  'chicken biryani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Chicken_biryani_(32451994655).jpg/1024px-Chicken_biryani_(32451994655).jpg',
  'vegetable biryani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Vegetable-biryani.jpg/1024px-Vegetable-biryani.jpg',
  'mutton biryani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mutton_Biryani.jpg/1024px-Mutton_Biryani.jpg',
  'fish biryani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Fish_Biryani_02.jpg/768px-Fish_Biryani_02.jpg',
  'paneer biryani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Jyostna_407.JPG/1024px-Jyostna_407.JPG',
  'prawn biryani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Prawn_Biryani.jpg/1024px-Prawn_Biryani.jpg',
  'egg biryani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hyderabadi_egg_biryani.jpg/1024px-Hyderabadi_egg_biryani.jpg',
  'mushroom biryani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Mushroom_Biryani.JPG/1024px-Mushroom_Biryani.JPG',
  'jeera rice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Jeera_Rice.jpg/1024px-Jeera_Rice.jpg',
  'lemon rice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/South_Indian_Lemon_rice.jpg/1024px-South_Indian_Lemon_rice.jpg',
  'coconut rice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Coconut_rice.jpg/1024px-Coconut_rice.jpg',
  'chicken pulao': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Chicken_Pulao.jpg/1024px-Chicken_Pulao.jpg',
  'vegetable pulao': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Vegetable_pulao.JPG/1024px-Vegetable_pulao.JPG',
  'ghee rice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ghee_Rice.jpg/1056px-Ghee_Rice.jpg',
  'curd rice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Curd_Rice_01.jpg/1024px-Curd_Rice_01.jpg',
  // Desserts (10)
  'gulab jamun': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Two_Gulab_Jamun_in_a_plate_01.jpg/1024px-Two_Gulab_Jamun_in_a_plate_01.jpg',
  'rasgulla': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rasgulla.jpg/1262px-Rasgulla.jpg',
  'kheer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Dessert_of_India_-_Kheer.jpg/960px-Dessert_of_India_-_Kheer.jpg',
  'kulfi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mango_Kulfi.jpg/1024px-Mango_Kulfi.jpg',
  'jalebi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Jalebi_-_Closeup_View_of_Jalebis.JPG/1024px-Jalebi_-_Closeup_View_of_Jalebis.JPG',
  'ras malai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Ras_Malaai.jpg/1024px-Ras_Malaai.jpg',
  'gajar halwa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Gajar_ka_halwa_topped_with_kaju.jpg/1024px-Gajar_ka_halwa_topped_with_kaju.jpg',
  'payasam': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Paal_payasam.JPG/1024px-Paal_payasam.JPG',
  'ice cream': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ice_Creams.jpg/960px-Ice_Creams.jpg',
  'chocolate cake': 'https://upload.wikimedia.org/wikipedia/commons/5/55/Chocolate_fudge_cake.jpg',
};

const normalizeName = (name = '') => name.trim().toLowerCase();

// Attach local cooked images when the dish name matches known keys.
export const dishes = rawData.map((dish) => {
  const nameKey = normalizeName(dish.name);
  let cookedPath = cookedImageMap[nameKey];

  // Fuzzy contains-based mapping when exact title isn't present
  if (!cookedPath) {
    if (nameKey.includes('keema')) cookedPath = cookedImageMap['mutton keema'];
    else if (nameKey.includes('kofta')) cookedPath = cookedImageMap['malai kofta'];
    else if (nameKey.includes('bhurji')) cookedPath = cookedImageMap['paneer bhurji'];
    else if (nameKey.includes('do pyaza') || nameKey.includes('dopyaza')) cookedPath = cookedImageMap['paneer do pyaza'];
    else if (nameKey.includes('vindaloo')) cookedPath = cookedImageMap['chicken vindaloo'];
    else if (nameKey.includes('lababdar')) cookedPath = cookedImageMap['chicken lababdar'];
  }

  // Prefer local cooked images for Vercel-friendly hosting; then external map; then original
  let image = cookedPath
    ? `${process.env.PUBLIC_URL || ''}${cookedPath}`
    : (externalImageMap[nameKey] || dish.image);

  return {
    ...dish,
    type: normalizeType(dish.type),
    image,
    // Ensure price is stable and present
    price: Number.isFinite(dish.price) ? dish.price : stablePriceFor(dish),
  };
});

// Named exports kept for potential future use/compat
export const getDishesbyMealType = (mealType) =>
  dishes.filter((dish) => dish.mealType === mealType);

export const getDishesByType = (type) =>
  dishes.filter((dish) => dish.type === type);

export const searchDishes = (searchTerm) =>
  dishes.filter((dish) =>
    dish.name.toLowerCase().includes((searchTerm || '').toLowerCase())
  );
