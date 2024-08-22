
import './App.css';
import Menu from './components/Menu';
import Navigation from './components/Navigation';
import View from './pages/View';
import Profile from './pages/Profile';
import LogOut from './pages/Profile';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <>

        <Router>
          <Menu />
          <Routes>
            <Route path="/home" exact component={<Navigation />} />
            <Route path="/view" exact component={<View />} />
            <Route path="/profile" exact component={<Profile />} />
            <Route path="/log-out" exact component={<LogOut />} />
          </Routes>


        </Router>


        <Navigation />
      </>


    </div>
  )
}
export default App;