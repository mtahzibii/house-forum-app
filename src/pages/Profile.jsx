import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import {
 updateDoc,
 doc,
 where,
 collection,
 getDocs,
 query,
 orderBy,
 deleteDoc,
} from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import homeIcon from '../assets/svg/homeIcon.svg';
import React from 'react';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

function Profile() {
 const auth = getAuth();
 const navigate = useNavigate();

 //  Initializing states
 const [loading, setLoading] = useState(true);
 const [changeDetails, setChangeDetails] = useState(false);
 const [listings, setListings] = useState(null);
 const [formData, setFormData] = useState({
  name: auth.currentUser.displayName,
  email: auth.currentUser.email,
 });

 const { name, email } = formData;
 const userId = auth.currentUser.uid;

 useEffect(() => {
  // Make Query
  const fetchUserListings = async () => {
   try {
    const listingsRef = collection(db, 'listings');
    const queryModel = query(
     listingsRef,
     where('userRef', '==', userId),
     orderBy('timestamp', 'desc')
    );
    // Get Data from firestore
    const querySnap = await getDocs(queryModel);

    let listings = [];

    querySnap.forEach((doc) => {
     listings.push({
      id: doc.id,
      data: doc.data(),
     });
    });

    setListings(listings);
    setLoading(false);
   } catch (error) {
    toast.error('something went wring!');
   }
  };

  fetchUserListings();
 }, [userId]);

 const onDelete = async (listingId) => {
  if (window.confirm('Are you sure you want to delete?')) {
   await deleteDoc(doc(db, 'listings', listingId));
   const updatedListings = listings.filter((listing) => listing.id !== listingId);
   setListings(updatedListings);
   toast.success('Successfully deleted listing');
  }
 };

 const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

 const onChange = (e) => {
  setFormData((prevState) => ({
   ...prevState,
   [e.target.id]: e.target.value,
  }));
 };

 const onSubmit = async () => {
  try {
   if (auth.currentUser.displayName !== name) {
    // Update display name in firebase
    await updateProfile(auth.currentUser, {
     displayName: name,
    });
    // Update in firestore
    updateDoc(doc(db, 'users', auth.currentUser.uid), { name });
   }
  } catch (error) {
   toast.error('Could not update profile details');
  }
 };

 const onLogout = () => {
  auth.signOut();
  navigate('/');
 };

 if (loading) {
  return <Spinner />;
 }

 return (
  <>
   <div className='profile'>
    <header className='profileHeader'>
     <h1 className='pageHeader'>My Profile</h1>
     <button className='logOut' onClick={onLogout}>
      Logout
     </button>
    </header>
    <main>
     <div className='profileDetailsHeader'>
      <p className='personalDetailsText'>Personal Details</p>
      <p
       className='changePersonalDetails'
       onClick={() => {
        changeDetails && onSubmit();
        setChangeDetails((prevState) => !prevState);
       }}
      >
       {changeDetails ? 'Done' : 'Change'}
      </p>
     </div>
     <div className='profileCard'>
      <form>
       <input
        type='text'
        onChange={onChange}
        id='name'
        value={name}
        className={changeDetails ? 'profileNameActive' : 'profileName'}
        disabled={!changeDetails}
       />
       <input
        type='text'
        value={email}
        id='email'
        className='profileEmail'
        onChange={onChange}
        disabled={true}
       />
      </form>
     </div>
     <Link to='/create-listing' className='createListing'>
      <img src={homeIcon} alt='create Listing' />
      <p>Sell or rent home</p>
      <img src={arrowRight} alt='arrow right' />
     </Link>
     {!loading && listings?.length > 0 && (
      <>
       <p className='listingText'>Your Listings</p>
       <ul>
        {listings.map((listing) => {
         return (
          <ListingItem
           key={listing.id}
           id={listing.id}
           listing={listing.data}
           onDelete={() => onDelete(listing.id)}
           onEdit={() => onEdit(listing.id)}
          />
         );
        })}
       </ul>
      </>
     )}
    </main>
   </div>
  </>
 );
}

export default Profile;
