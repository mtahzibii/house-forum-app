import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Contacts() {
 const [loading, setLoading] = useState(true);
 const [message, setMessage] = useState('');
 const [landlord, setLandlord] = useState(false);
 const [searchParams, setSearchParams] = useState();

 const params = useParams();

 useEffect(() => {
  const getLandlord = async () => {
   const docRef = doc(db, 'users', params.landlordId);
   const docSnap = await getDoc(docRef);

   if (docSnap.exists()) {
    setLoading(false);
    setLandlord(docSnap.data());
   } else {
    toast.error('Could not get lanlord data');
   }
  };
  getLandlord();
 }, [params.landlordId]);

 if (loading) {
  return <Spinner />;
 }

 const onChange = (e) => {
  setMessage(e.target.value);
 };

 return (
  <div className='pageContainer'>
   <header>
    <p className='pageHeader'>Contact Lanlord</p>
   </header>
   {landlord !== null && (
    <main>
     <div className='contactLandLord'>
      <p className='landlordName'>Contact {landlord?.name}</p>
     </div>

     <form className='messageForm'>
      <div className='messageDiv'>
       <label htmlFor='messageLabel' className='messageLabel'>
        Message
       </label>
       <textarea
        name='message'
        id='message'
        className='textarea'
        value={message}
        onChange={onChange}
       ></textarea>
      </div>
      <a
       href={`mailto:${landlord.email}?Subject=${searchParams.get(
        'listingName'
       )}&body=${message}`}
      >
       <button className='primaryButton' type='button'>
        Send Message
       </button>
      </a>
     </form>
    </main>
   )}
  </div>
 );
}

export default Contacts;
