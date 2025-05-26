import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FarmerDashboard from './components/Farmer/Dashboard';
import BuyerDashboard from './components/Buyer/Dashboard';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import AuthModal from './components/Auth/AuthModal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AuthModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/buyer" element={<BuyerDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
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
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');

  useEffect(() => {
    fetchPriceAlerts();
  }, []);

  const fetchPriceAlerts = async () => {
    try {
      setLoading(true);
      // In a real app, we would filter by the farmer's location
      const { data, error } = await supabase
        .from('market_prices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('market_prices')
        .select('*')
        .ilike('location', `%${location}%`)
        .ilike('crop', `%${crop}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data);
    } catch (error) {
      console.error('Error filtering alerts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Market Price Alerts</h2>
        <p className="text-gray-600 mb-4">
          Get notified about price changes in your area to maximize your profits.
        </p>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Nairobi"
              />
            </div>
            <div>
              <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
                Crop
              </label>
              <input
                type="text"
                id="crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Maize"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Filter Prices
              </button>
            </div>
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price (per kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <tr key={alert.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{alert.crop}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KSh {alert.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{alert.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(alert.created_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Set Up Price Alerts</h2>
        <p className="text-gray-600 mb-4">
          Receive notifications when prices for your crops change significantly in your area.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          Configure Alerts
        </button>
      </div>
    </div>
  );
};

export default PriceAlerts;
