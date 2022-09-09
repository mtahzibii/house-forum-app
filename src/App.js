import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import SignIn from './pages/SignIn';
import Category from './pages/Category';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import CreareListing from './pages/CreareListing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Listing from './pages/Listing';
import Contacts from './pages/Contacts';
import EditListing from './pages/EditListing';

function App() {
 return (
  <>
   <Router>
    <Routes>
     <Route path='/' element={<Explore />} />
     <Route path='/offers' element={<Offers />} />
     <Route path='/profile' element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
     </Route>
     <Route path='/sign-in' element={<SignIn />} />
     <Route path='/sign-up' element={<Signup />} />
     <Route path='/edit-listing/:listingId' element={<EditListing />} />
     <Route path='/category/:categoryName' element={<Category />} />
     <Route path='/category/:categoryName/:listingId' element={<Listing />} />
     <Route path='/forgot-password' element={<ForgotPassword />} />
     <Route path='/contact/:landlordId' element={<Contacts />} />
     <Route path='/create-listing' element={<CreareListing />} />
    </Routes>
    <Navbar />
   </Router>
   <ToastContainer />
  </>
 );
}

export default App;
