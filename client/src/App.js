import Header from './components/Header/Header';
import Menubar from './components/Menu/Menubar';
import React, { Suspense, lazy } from "react";
import Trash from "./Pages/Trash";
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Spinner from './components/Spinner/Spinner';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Landing from './Pages/Landing';
import Myimages from './Pages/Myimages';
import Favourites from './Pages/Favourites';


// Component to conditionally render the layout
const Layout = ({ children }) => {
  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';
  const isLanding=location.pathname==='/'


  return (
    <>
      {!isSignupPage && !isLoginPage && !isLanding && <Menubar />}
      {!isSignupPage && !isLoginPage && !isLanding && <Header />}
      {children}
    </>
  );
};

function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Toaster position="top-right" reverseOrder={false} />
          <Layout>
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/myimages" element={<Myimages />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/trash" element={<Trash />} />
            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
