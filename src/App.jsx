import React, { useState } from 'react';
// Make sure to import Outlet from react-router-dom
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'; 

import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './pages/Signin';
import HomePage from './pages/HomePage';
import ProfessionalsListPage from './pages/ProfessionalsListPage';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';
import ContactPage from './pages/ContactPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import CustomerSupportPage from './pages/CustomerSupportPage';
import './App.css';

// This is the new layout component for your main application.
// It contains the Header, Footer, and a placeholder for the page content.
const MainAppLayout = ({ onSearch }) => (
  <div className="app-container">
    <Header onSearch={onSearch} />
    <main>
      {/* The Outlet component renders the current page (e.g., HomePage, DashboardPage) */}
      <Outlet /> 
    </main>
    <Footer />
  </div>
);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${query}`);
  };

  // The main App component now just returns the Routes.
  return (
    <Routes>
      {/* Route 1: This is a standalone route for the SignIn page.
          Because it's not inside MainAppLayout, it has no Header or Footer. */}
      <Route path="/signin" element={<SignIn />} />

      {/* Route 1.5: Admin Dashboard - standalone route without Header/Footer */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* Route 2: This is the layout route. All pages nested inside it
          will automatically get the Header and Footer from MainAppLayout. */}
      <Route element={<MainAppLayout onSearch={handleSearch} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:categoryName" element={<ProfessionalsListPage />} />
        <Route path="/support" element={<CustomerSupportPage />} />
        <Route path="/professional/:id" element={<ProfessionalDetailPage />} />
        <Route path="/contact/:id" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}


export default App;
