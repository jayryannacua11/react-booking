import { useState } from 'react'
import './App.css';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage';
import SpecificCourse from './pages/SpecificCourse';
import { UserProvider } from './UserContext';

import { Container } from 'react-bootstrap'

//react-router
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//<> .. </> (Fragment) in your return to add multiple lines inside html tags
function App() {

  //State hook for the user state that defined here for global scope
  //This will be used to store the user information and will be used for validating if a user is logged in in the app or not
  const [user, setUser] = useState({
    accessToken: localStorage.getItem('accessToken'),
    isAdmin: localStorage.getItem('isAdmin') === 'true'

    //email: localStorage.getItem('email')
  })

  //Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  return (
    <UserProvider value = { {user, setUser, unsetUser} }>
      <BrowserRouter>
        <AppNavbar />
        <Container>
          <Routes>
              <Route path="/" element = { <Home /> } />
              <Route path="/courses" element = { <CoursePage /> } />
              <Route path="/register" element = { <Register /> } />
              <Route path="/login" element = { <Login /> } />
              <Route path="/logout" element = { <Logout /> } />
              <Route path="/courses/:courseId" element = { <SpecificCourse /> } />
              <Route path="*" element = { <ErrorPage /> } />
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
