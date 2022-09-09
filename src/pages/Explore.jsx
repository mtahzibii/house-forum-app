import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import saleCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
import Slider from '../components/Slider';

function Explore() {
 return (
  <>
   <div className='pageContainer'>
    <header className='pageHeader'>
     <p>Explore</p>
    </header>

    <main>
     <Slider />

     <p className='exploreCategoryHeading'>Categories</p>
     <div className='exploreCategories'>
      <Link to='/category/rent'>
       <img
        src={rentCategoryImage}
        alt='rent Category'
        className='exploreCategoryImg'
       />
       <p className='exploreCategoryName'>Places for rent</p>
      </Link>
      <Link to='/category/sale'>
       <img
        src={saleCategoryImage}
        alt='rent Category'
        className='exploreCategoryImg'
       />
       <p className='exploreCategoryName'>Places for sale</p>
      </Link>
     </div>
    </main>
   </div>
  </>
 );
}

export default Explore;
