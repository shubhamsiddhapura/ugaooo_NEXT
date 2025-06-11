import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Plants from './Pages/Plants';
import AdminProfile from './Pages/AdminProfile';

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin-panel' element={<AdminProfile />} />
          <Route path='/plants' element={<Plants/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
