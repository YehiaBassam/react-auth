import { useRef } from 'react';
import { useSelector } from 'react-redux';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const passwordRef = useRef();
  const token = useSelector(state => state.reducer.token);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const API_KEY = "AIzaSyCsZgGu8NZcK7-ckCKfHHFloxO6waPXmG8";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

    if (password){
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: password,
          returnSecureToken: true
        }),
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("Change Password", res.json())
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
