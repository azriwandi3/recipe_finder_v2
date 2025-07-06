import React from 'react';
import { Timer, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RecipeCard({ recipe, index }) {
  const id = encodeURIComponent(recipe.uri.split('#recipe_')[1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={`/recipe/${id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl dark:bg-gray-800">
          <motion.img
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{recipe.label}</h3>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1 text-orange-500" />
                {Math.round(recipe.calories)} cal
              </div>
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-1 text-blue-500" />
                {recipe.totalTime > 0 ? `${recipe.totalTime} min` : 'N/A'}
              </div>
            </div>

            <motion.div 
              className="mt-2 flex flex-wrap gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {recipe.dietLabels.map((label, index) => (
                <motion.span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}