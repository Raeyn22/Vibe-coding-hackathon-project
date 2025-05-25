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
