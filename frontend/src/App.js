import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';  // Ensure this path is correct
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import MyProfile from './components/MyProfile';
import PasswordChange from './components/PasswordChange';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
