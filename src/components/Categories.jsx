import React from 'react';
import { Coffee, Sun, Moon, Cookie, History } from 'lucide-react';
import { motion } from 'framer-motion';
import RecipeCard from './RecipeCard';
import { getViewHistory } from '../utils/history';

const categories = [
  { name: 'Breakfast', icon: Coffee, color: 'text-yellow-500' },
  { name: 'Lunch', icon: Sun, color: 'text-orange-500' },
  { name: 'Dinner', icon: Moon, color: 'text-blue-500' },
  { name: 'Snacks', icon: Cookie, color: 'text-purple-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Categories({ onCategoryClick }) {
  const viewHistory = getViewHistory();

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          Popular Categories
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryClick(category.name)}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800"
              >
                <Icon className={`h-12 w-12 ${category.color} mb-4`} />
                <span className="text-lg font-medium text-gray-800 dark:text-white">
                  {category.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {viewHistory.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center mb-8"
            >
              <History className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                Recently Viewed Recipes
              </h2>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {viewHistory.map((recipe, index) => (
                <RecipeCard key={recipe.uri} recipe={recipe} index={index} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}