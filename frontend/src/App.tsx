import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>
);

export default App;
