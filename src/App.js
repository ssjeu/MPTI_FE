import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserInfo from './pages/UserInfo';
import './css/font.css';
import Main from './pages/Main';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/join' element={<SignUp />} />
        <Route path='/info' element={<UserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
