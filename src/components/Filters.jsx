import React from 'react';

const dietPreferences = ['Vegetarian', 'Vegan', 'Keto', 'Paleo'];
const healthLabels = ['Gluten-Free', 'Dairy-Free', 'Low-Sugar', 'Low-Fat'];

export default function Filters({ onFilterChange }) {
  return (
    <div className="w-60 space-y-6 p-4 bg-white rounded-lg shadow dark:bg-gray-800 font-comfortaa">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Diet Preferences</h3>
        <div className="space-y-2">
          {dietPreferences.map((diet) => (
            <label key={diet} className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) => onFilterChange('diet', diet)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700 dark:text-gray-300">{diet}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Health Labels</h3>
        <div className="space-y-2">
          {healthLabels.map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) => onFilterChange('health', label)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700 dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}