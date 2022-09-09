import { useState } from 'react';
import { toast } from 'react-toastify';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../components/OAuth';

function SignIn() {
 const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({ email: '', password: '' });

 const { email, password } = formData;

 const navigate = useNavigate();

 const onChange = (e) => {
  setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
 };

 const onSubmit = async (e) => {
  e.preventDefault();

  try {
   const auth = getAuth();

   const userCredential = await signInWithEmailAndPassword(auth, email, password);

   if (userCredential.user) {
    navigate('/profile');
   }
  } catch (error) {
   toast.error('Bad User Credential');
  }
 };
 return (
  <>
   <div className='pageContainer'>
    <header className='pageHeader'>
     <p>Welcome Back!</p>
    </header>
    <form onSubmit={onSubmit}>
     <input
      type='email'
      className='emailInput'
      placeholder='Email'
      id='email'
      value={email}
      onChange={onChange}
     />
     <div className='passwordInputDiv'>
      <input
       type={showPassword ? 'text' : 'password'}
       className='passwordInput'
       placeholder='Password'
       id='password'
       value={password}
       onChange={onChange}
      />

      <img
       src={visibilityIcon}
       alt='show password'
       className='showPassword'
       onClick={() => setShowPassword((prevState) => !prevState)}
      />
     </div>
     <Link to='/forgot-password' className='forgotPasswordLink'>
      Forgot Password
     </Link>
     <div className='signInBar'>
      <p className='signInText'>Sign In</p>
      <button type='Submit' className='signInButton'>
       <ArrowRightIcon width='36px' height='36px' fill='#fff' />
      </button>
     </div>
    </form>

    <OAuth />

    <Link className='registerLink' to='/sign-up'>
     Sign Up Instead
    </Link>
   </div>
  </>
 );
}

export default SignIn;
