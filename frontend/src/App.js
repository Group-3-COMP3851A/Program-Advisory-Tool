import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Select from './pages/Select';
import Profile from './pages/Profile';
import ViewPlanner from './pages/ViewPlanner';
import Logout from './pages/Logout';
import Help from './pages/Help';
import AddElectives from './pages/AddElectives';
import Completed from './pages/Completed';
import GeneratePlan from './pages/GeneratePlan';
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
              <Route path="/view-planner" element={<ViewPlanner />} />
              <Route path="/help" element={<Help />} />
              <Route path="/completed" element={<Completed />} />
              <Route path="/add-electives" element={<AddElectives />} />
              <Route path="/generate-plan" element={<GeneratePlan />} />
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
