
import './App.css';
import Menu from './components/Menu';
import Navigation from './components/Navigation';
import View from './pages/View';
import Profile from './pages/Profile';
import Continue from './components/Continue';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <>

        <Router>
          <Menu />
          <Routes>
            <Route path="/create-new-planner" exact component={<Navigation />} />
            <Route path="/view-planner" exact component={<View />} />
            <Route path="/profile" exact component={<Profile />} />
          </Routes>


        </Router>


        <Navigation />
        <Continue />
      </>


    </div>
  )
}
export default App;