import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useConfig } from './hooks/useConfig';
import { Loading } from './components/common/Loading';
import Layout from './components/Layout';
import { Home } from './pages/Home';
import Utils from './pages/Utils';
import { CV } from './pages/CV';

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
      <Layout>
        <Routes>
          <Route path="/" element={<Home config={config} />} />
          <Route path="/utils" element={<Utils />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
