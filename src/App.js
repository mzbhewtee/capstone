import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import Landing from './Pages/Landing';
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Education from './Pages/Education';
import Community from './Pages/Community';
import Notification from './Pages/Notification';
import { AuthProvider } from './context/authContext'; // Update the path to authContext
import Settings from './Pages/Settings';

function App() {
  return (
    <Router> {/* Changed to Router instead of BrowserRouter */}
      <AuthProvider> {/* Wrap your Routes with AuthProvider */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/education' element={<Education />} />
          <Route path='/community' element={<Community />} />
          <Route path='/notifications' element={<Notification />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
