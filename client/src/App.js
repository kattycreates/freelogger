import './App.css';
import {useContext} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Routes,Route} from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/Login/Login'
import Register from './pages/register/Register';
import Contact from './pages/contact/Contact';
import Footer from './components/footer/Footer';
import { Context } from './contexts/Context';
function App() {
const {user}=useContext(Context);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>

          <Route exact path='/' element={<Home />} />
          <Route exact path='/posts' element={<Home />} />
          <Route exact path='/post/:postId' element={<Single />} />
          <Route exact path='/register' element={user?<Home />:<Register />} />
          <Route exact path='/login' element={user?<Home />:<Login/>} />
          <Route exact path='/write' element={user?<Write/>:<Login/>} />
          <Route exact path='/settings' element={user?<Settings />:<Login/>} />
          <Route exact path='/contact' element={<Contact />} />
          
        </Routes>
        <Footer />
        
      </BrowserRouter>
      
 
    </div>
  );
}

export default App;
