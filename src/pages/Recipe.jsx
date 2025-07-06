import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Timer, Flame, Users, ChefHat, ExternalLink } from 'lucide-react';
import { addToViewHistory } from '../utils/history';

const APP_ID = import.meta.env.VITE_ID_AZRI;
const APP_KEY = import.meta.env.VITE_KEY_WANDI;

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleSearch = (query) => {
    setSearchParams({ q: query });
  };

  React.useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`,
          {
            headers: {
              'Edamam-Account-User': 'azri'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Recipe not found');
        }

        const data = await response.json();
        setRecipe(data.recipe);
        addToViewHistory(data.recipe);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !recipe) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSearch={handleSearch} />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
          <div className="relative h-96">
            <img
              src={recipe.image}
              alt={recipe.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
              {recipe.label}
            </h1>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <Timer className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  {recipe.totalTime > 0 ? `${recipe.totalTime} min` : 'N/A'}
                </span>
              </div>
              <div className="flex items-center">
                <Flame className="h-6 w-6 text-orange-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  {Math.round(recipe.calories)} calories
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  {recipe.yield} servings
                </span>
              </div>
            </div>

            {recipe.url && (
              <button
                className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-8"
                onClick={() => window.open(recipe.url, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                View Original Recipe
              </button>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredientLines.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-green-600">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Nutrition Facts
                </h2>
                <div className="space-y-2">
                  {Object.entries(recipe.totalNutrients).map(([key, nutrient]) => (
                    <div
                      key={key}
                      className="flex justify-between text-gray-700 dark:text-gray-300"
                    >
                      <span>{nutrient.label}</span>
                      <span>
                        {Math.round(nutrient.quantity)}
                        {nutrient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}