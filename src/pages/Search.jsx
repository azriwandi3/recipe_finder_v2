import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';
import { Loader2 } from 'lucide-react';

const APP_ID = import.meta.env.VITE_ID_AZRI;
const APP_KEY = import.meta.env.VITE_KEY_WANDI;

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchRecipes = async () => {
    const query = searchParams.get('q');
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
          query
        )}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          headers: {
            'Edamam-Account-User': 'azri'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.hits.map((hit) => hit.recipe));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRecipes();
  }, [searchParams]);

  const handleSearch = (query) => {
    setSearchParams({ q: query });
  };

  const handleFilterChange = (type, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.append(type, value);
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSearch={handleSearch} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <Filters onFilterChange={handleFilterChange} />
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : error ? (
              <div className="text-red-600 text-center">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.uri} recipe={recipe} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}