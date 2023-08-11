import React, { useState } from 'react';
import './index.css';
import Layouts from './Layouts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coach from './routes/Coach';
import Coachee from './routes/Coachee';
import About from './routes/About';
import Logins from './routes/Login';
import Register from './routes/Register';
import UserContext from './routes/Contexts';
import CoacheeEdit from './routes/CoacheeEdit';
import CoachEdit from './routes/CoachEdit';
import Activities from './routes/Activities';
import ActivitiesEdit from './routes/ActivitiesEdit';

const App: React.FC = () => {
  const [userState, setUserState] = useState({
    isLogged: false, username: ''
  });

  const login = (username: string) => {
    setUserState({
      isLogged: true,
      username,
    });
  };

  const logout = () => {
    setUserState({
      isLogged: false,
      username: ''
    });
  };

  return (
    <UserContext.Provider
      value={{
        username: userState.username,
        isLogged: userState.isLogged,
        login,
        logout,
      }}
    >
      <BrowserRouter>
        <Layouts>
          <Routes>
            <Route path="/" element={<Coach />} />
            <Route path="activities" element={<Activities />} />
            <Route path="coachee" element={<Coachee />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Logins />} />
            <Route path="register" element={<Register />} />
            <Route path="ecoachee" element={<CoacheeEdit />} />
            <Route path="ecoach" element={<CoachEdit />} />
            <Route path="eactivities" element={<ActivitiesEdit />} />
          </Routes>
        </Layouts>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
