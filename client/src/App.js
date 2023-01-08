import Navbar from './ui/Navbar';
import LoginForm from './pages/LoginPage';
import { useState, useEffect } from 'react';
import ProfessorPage from './pages/ProfessorPage';
import StudentPage from './pages/StudentPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import Profile from './pages/Profile';
import ProfProfile from './pages/ProfProfile';
import InfoProf from './pages/InfoProf';
import Info from './pages/Info';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfessor, setIsProfessor] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isProfessorProfileVisible, setIsProfessorProfileVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isProfessorInfoVisible, setIsProfessorInfoVisible] = useState(false);

  const callbackLogin = (provider) => {
    if (provider !== 'stud.ase.ro') setIsProfessor(true);
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsProfessor(false);
    setIsProfileVisible(false);
    setIsProfessorProfileVisible(false);
    setIsInfoVisible(false);
    setIsProfessorInfoVisible(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = jwt_decode(token);
        // verifica daca token-ul nu a expirat
        const numarMinute = (Date.now() / 1000 - data.iat) / 60;
        console.log(`${numarMinute} minute`);
        if (!data || numarMinute >= 30) {
          return localStorage.removeItem('token');
        }

        console.log(data);
        setIsLoggedIn(true);
        setIsProfessor(data.email.split('@')[1] !== 'stud.ase.ro');
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <>
      <Navbar
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        isStudent={!isProfessor}
        setIsProfileVisible={setIsProfileVisible}
        setIsProfessorProfileVisible={setIsProfessorProfileVisible}
        setIsProfessorInfoVisible={setIsProfessorInfoVisible}
        setIsInfoVisible={setIsInfoVisible}
      />
        <ToastContainer
        position='top-right'
        style={{ marginTop: '5vh' }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      {!isLoggedIn && <LoginForm onLogin={callbackLogin} />}
      {isLoggedIn && isProfessor && !isProfessorProfileVisible && !isProfessorInfoVisible &&<ProfessorPage />}
      {isLoggedIn && !isProfessor && !isProfileVisible && !isInfoVisible && <StudentPage />}
      {isProfileVisible && (
        <Profile setIsProfileVisible={setIsProfileVisible} />
      )}
      {isProfessorProfileVisible && (
        <ProfProfile setIsProfessorProfileVisible={setIsProfessorProfileVisible} />
      )}
      { isProfessorInfoVisible && ( <InfoProf setIsProfessorInfoVisible={setIsProfessorInfoVisible}/>)}
      { isInfoVisible && ( <Info setIsInfoVisible={setIsInfoVisible}/>)}
    </>
  );
}

export default App;
