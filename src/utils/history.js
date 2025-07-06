const MAX_HISTORY_ITEMS = 9;

export const addToViewHistory = (recipe) => {
  const history = JSON.parse(localStorage.getItem('viewHistory') || '[]');
  const exists = history.find(item => item.uri === recipe.uri);
  
  if (!exists) {
    history.unshift(recipe);
    if (history.length > MAX_HISTORY_ITEMS) {
      history.pop();
    }
    localStorage.setItem('viewHistory', JSON.stringify(history));
  }
};

export const getViewHistory = () => {
  return JSON.parse(localStorage.getItem('viewHistory') || '[]');
};

export const addToSearchHistory = (query) => {
  const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > MAX_HISTORY_ITEMS) {
      history.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }
};

export const getSearchHistory = () => {
  return JSON.parse(localStorage.getItem('searchHistory') || '[]');
};


const commonKeywords = [
  'chicken', 'pasta', 'vegetarian', 'soup', 'salad', 
  'breakfast', 'dinner', 'dessert', 'healthy', 'quick',
  'italian', 'mexican', 'asian', 'mediterranean', 'nasi goreng',
  'nasi', 'nakso','soto','sate','rendang','ayam','mie','goreng',
  'kacang','terasi','mangga','bawang','sambal','makaroni','rujak',
];

export const getSearchSuggestions = (query) => {
  if (!query) return [];
  
  const searchHistory = getSearchHistory();
  const allSuggestions = [...searchHistory, ...commonKeywords];
  
  return allSuggestions
    .filter(keyword => 
      keyword.toLowerCase().includes(query.toLowerCase()) &&
      keyword.toLowerCase() !== query.toLowerCase()
    )
    .slice(0, 5);
};