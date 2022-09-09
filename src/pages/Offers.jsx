import { db } from '../firebase.config';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
import {
 collection,
 getDocs,
 query,
 where,
 orderBy,
 limit,
 startAfter,
} from 'firebase/firestore';

function Offers() {
 const [listings, setListings] = useState(null);
 const [loading, setLoading] = useState(true);
 const [lastFetchedListing, setLastFetchedListing] = useState(null);

 useEffect(() => {
  const fetchListings = async () => {
   try {
    // Reference collection
    const listingsRef = collection(db, 'listings');

    const queryModel = query(
     listingsRef,
     where('offer', '==', true),
     orderBy('timestamp', 'desc'),
     limit(2)
    );

    //  Execute query
    const docsSnap = await getDocs(queryModel);

    const lastVisible = docsSnap.docs[docsSnap.docs.length - 1];

    setLastFetchedListing(lastVisible);

    let listings = [];

    docsSnap.forEach((doc) => {
     return listings.push({
      id: doc.id,
      data: doc.data(),
     });
    });

    setListings(listings);
    setLoading(false);
   } catch (error) {
    toast.error('Could not fetch listings');
   }
  };
  fetchListings();
 }, []);

 //  Pagination / Load More
 const onFetchMoreListings = async () => {
  try {
   setLoading(true);
   // Get reference
   const listingsRef = collection(db, 'listings');

   //  create a query
   const queryModel = query(
    listingsRef,
    where('offer', '==', true),
    orderBy('timestamp', 'desc'),
    startAfter(lastFetchedListing),
    limit(2)
   );
   const docsSnap = await getDocs(queryModel);

   const lastVisible = docsSnap.docs[docsSnap.docs.length - 1];

   setLastFetchedListing(lastVisible);

   const listings = [];

   docsSnap.forEach((doc) => {
    return listings.push({
     id: doc.id,
     data: doc.data(),
    });
   });
   setListings((prevState) => [...prevState, ...listings]);
   setLoading(false);
  } catch (error) {
   //  toast.error(error);
   console.log(error);
  }
 };

 return (
  <div className='category'>
   <header>
    <p className='pageHeader'>Offers</p>
   </header>
   {loading ? (
    <Spinner />
   ) : listings && listings.length > 0 ? (
    <>
     <main>
      <ul className='categoryListings'>
       {listings.map((listing) => (
        <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
       ))}
      </ul>
     </main>

     <br />
     <br />

     {lastFetchedListing && (
      <p className='loadMore' onClick={onFetchMoreListings}>
       Load More
      </p>
     )}
    </>
   ) : (
    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
     There are no current offers
    </p>
   )}
  </div>
 );
}

export default Offers;
