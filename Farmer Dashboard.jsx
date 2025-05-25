import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import PriceAlerts from './PriceAlerts';
import { useAuth } from '../../context/AuthContext';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">
            Welcome, {user?.user_metadata?.full_name || 'Farmer'}
          </h1>
          <p className="text-gray-600">Manage your products and view market prices</p>
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'products' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('products')}
          >
            My Products
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'alerts' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('alerts')}
          >
            Price Alerts
          </button>
        </div>

        {activeTab === 'products' ? <ProductList /> : <PriceAlerts />}
      </div>
    </div>
  );
};

export default FarmerDashboard;
