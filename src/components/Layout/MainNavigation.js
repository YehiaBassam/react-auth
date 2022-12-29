import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  }
  const isLogedIn = useSelector(state => state.reducer.isLogedIn);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          { !isLogedIn &&
          (<li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
          
          { isLogedIn &&
          (
            <div className={classes.links}>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              
              <li>
                <button onClick={logout}>
                  Logout
                </button>
              </li>
            </div>
          )}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
