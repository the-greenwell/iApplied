import { Navbar } from './components/Navbar';
import { JobsContainer } from './components/JobsContainer';
import { JobForm } from './components/JobForm';
import { AuthContainer } from './components/AuthContainer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './context/auth.context';
import { Welcome } from './components/Welcome';
import './app.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path='/' element={user ? <JobsContainer /> : <Welcome />}/>
        <Route path='/new' element={user ? <JobForm /> : <Welcome />}/>
        <Route path='/auth' element={user ? <Navigate to='/' /> : <AuthContainer />} />
      </Routes>
    </div>
  );
}

export default App;
