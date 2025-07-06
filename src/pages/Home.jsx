import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/search?q=${encodeURIComponent(category)}`);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Hero onSearch={handleSearch} />
      <Categories onCategoryClick={handleCategoryClick} />
    </div>
  );
}