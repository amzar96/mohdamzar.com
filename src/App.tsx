import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Terminal from './components/Terminal';
import Utils from './pages/Utils';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Terminal />} />
          <Route path="/utils" element={<Utils />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;