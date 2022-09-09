import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
 // Initializing
 const [loading, setLoading] = useState(true);
 const [listings, setListings] = useState(null);

 const navigate = useNavigate();

 // Load data by loading page (async/await)
 useEffect(() => {
  const fetchListings = async () => {
   // Specify collection spec need to be accessed
   const listingsRef = collection(db, 'listings');
   // Make a query
   const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
   // Get specified documents from firestore
   const querySnap = await getDocs(q);

   let listings = [];

   // update the listings by loop through query snapshot
   querySnap.forEach((doc) => {
    return listings.push({
     id: doc.id,
     data: doc.data(),
    });
   });

   // Set listings
   setListings(listings);
   // Turn off spinner as data loaded
   setLoading(false);
  };
  // Call asynchronous function
  fetchListings();
 }, []);

 if (loading) {
  return <Spinner />;
 }

 if (listings.length === 0) {
  return <></>;
 }

 if (listings.length === 0) {
  return <></>;
 }

 return (
  listings && (
   <>
    <p className='exploreHeading'>Recommended</p>

    <Swiper slidesPerView={1} pagination={{ clickable: true }}>
     {listings.map(({ data, id }) => (
      <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
       <div
        style={{
         background: `url(${data.imageUrls[0]}) center no-repeat`,
         backgroundSize: 'cover',
        }}
        className='swiperSlideDiv'
       >
        <p className='swiperSlideText'>{data.name}</p>
        <p className='swiperSlidePrice'>
         ${data.discuntedPrice ?? data.regularPrice}{' '}
         {data.type === 'rent' && '/ month'}
        </p>
       </div>
      </SwiperSlide>
     ))}
    </Swiper>
   </>
  )
 );
}

export default Slider;
