import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Heart
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Join Our Recipe Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get weekly recipes, cooking tips, and more delivered to your inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <ChefHat className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white font-akronim">
                  Recipe Azry
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300">
                Discover and share delicious recipes from around the world.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    Recipe Categories
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    Food Blog
                  </Link>
                </li>
                <li>
                  <Link to="/submit-recipe" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    Submit Recipe
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Help & Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Info
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">
                    8833 Mataram Timur, Mataram, NTB
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600 dark:text-gray-300">
                    +62 (123) 123-4567
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600 dark:text-gray-300">
                    hello@recipeazry.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} Recipe Azry. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center mt-2 md:mt-0">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by OhMyAzry
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}