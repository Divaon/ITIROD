
import { useState } from 'react';
import './App.css';
import logo from '../src/images/DQBBAtuUEAIcZuL.jpg';


import prev from '../src/images/previous.png';
import next from '../src/images/fast-forward.png';
import pause from '../src/images/play.png';
import circle from '../src/images/replay.png';
import logolist from '../src/images/playlist.png';

// import logo from './logo.svg';

import { userDataProvider } from './context/usercontext';
import LoginHeader from './components/login-header';
import MainBody from './components/main-body';

function App() {
  const [userData, setUserData] = useState({
    useruid: null, databaseref: null, userenter: false,
  });


  return (
    <userDataProvider value={{ userData, setUserData: (payload) => setUserData((prevState) => ({ ...prevState, ...payload })) }} >
      <div className='body'>
        <div className="wrapper">

          <LoginHeader />


          <MainBody />



        </div>
      </div>
    </userDataProvider>
  );
}

export default App;
