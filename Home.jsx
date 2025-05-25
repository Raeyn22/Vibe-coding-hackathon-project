import React from 'react';
import { Link } from 'react-router-dom';
import farmerImage from '../assets/farmer.jpg';
import marketImage from '../assets/market.jpg';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-green-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Connecting Farmers to Markets
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Supasoko bridges the gap between local farmers and buyers, ensuring fair prices and 
              fresh produce for everyone.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/farmer" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                I'm a Farmer
              </Link>
              <Link 
                to="/buyer" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium"
              >
                I'm a Buyer
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src={farmerImage} 
              alt="African farmer" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            How Supasoko Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-green-600 text-4xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Farmers and buyers create profiles to join our trusted network.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-green-600 text-4xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Discover</h3>
              <p className="text-gray-600">
                Find nearby markets or farmers based on your location and needs.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-green-600 text-4xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Trade</h3>
              <p className="text-gray-600">
                Negotiate fair prices and arrange logistics through our platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Prices Section */}
      <div className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Real-Time Market Prices</h2>
              <p className="text-lg mb-6">
                Get instant alerts about price changes in your local markets to make informed selling decisions.
              </p>
              <button className="bg-white text-green-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src={marketImage} 
                alt="African market" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
