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
