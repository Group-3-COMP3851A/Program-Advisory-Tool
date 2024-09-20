import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Select from './pages/Select';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Completed from './pages/Completed';
import Plan from './pages/Plan';
import { AppProvider } from './AppContext';
import Menu from './components/Menu';  
import './styles/style.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <Menu /> {/* Fixed sidebar menu */}
          <main className="main-content"  >
            {/* Main content area */}
            <Routes>
              <Route path="/" element={<Select />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/completed" element={<Completed />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/select" element={<Select />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
