import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useConfig } from './hooks/useConfig';
import { Loading } from './components/common/Loading';
import Terminal from './components/Terminal';
import { Home } from './pages/Home';
import Utils from './pages/Utils';

const App: React.FC = () => {
  const { config, loading, error } = useConfig();

  if (loading) {
    return <Loading />;
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>Error loading configuration. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Terminal />} />
        <Route path="/home" element={<Home config={config} />} />
        <Route path="/utils" element={<Utils />} />
      </Routes>
    </Router>
  );
};

export default App;
