import { useState } from 'react';
import { useRef } from 'react';
import { authActions } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const API_KEY = "AIzaSyCsZgGu8NZcK7-ckCKfHHFloxO6waPXmG8";
  const handleSubmit = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let url = "";

    if (isLogin){
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }

    if ( email && password ){
      fetch(url,{
        method: "POST",
        body:JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        res.json().then(data => {
          if (res.ok){ //success
            emailRef.current.value = passwordRef.current.value = "";
            
            if (isLogin){ // login case
              dispatch(authActions.login(data));
              navigate('/profile');
            } else { // register case
              setIsLogin(true)
            }
          } else { //fail
            if (data?.error?.message)
              alert(data.error.message);
            }
          });
        });
      } else {
      alert('please enter email & password');
    }
  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
