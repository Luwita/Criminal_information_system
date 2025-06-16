import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import CasesList from './components/Cases/CasesList';
import StationsList from './components/Stations/StationsList';
import CriminalRecordsList from './components/CriminalRecords/CriminalRecordsList';
import SearchQuery from './components/Search/SearchQuery';
import ReportsList from './components/Reports/ReportsList';
import UserManagement from './components/Users/UserManagement';
import CrimeAnalytics from './components/Analytics/CrimeAnalytics';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'cases':
        return <CasesList />;
      case 'stations':
        return <StationsList />;
      case 'criminals':
        return <CriminalRecordsList />;
      case 'search':
        return <SearchQuery />;
      case 'reports':
        return <ReportsList />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <CrimeAnalytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Router>
  );
}

export default App;