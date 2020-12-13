import { Link } from "react-router-dom";
import React from 'react';
// import styles from './CSS/Navbar.module.css'
import './NavBar.scss';
import CurrentUser from './auth/CurrentUser';
import Button from '@material-ui/core/Button';

function Navbar () {
  // const [state, setState] = useState({
  //   prevScrollPos: window.pageYOffset,
  //   visible: true
  // })

  // useEffect(()=>{
  //   window.addEventListener("scroll", handleScroll)

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // })

  // const handleScroll = () => {
  //   const prevScrollPos = state.prevScrollPos;
  //   const currentScrollPos = window.pageYOffset;
  //   console.log(prevScrollPos)
  //   console.log(currentScrollPos)
  //   console.log(state)
  //   const visible = prevScrollPos > currentScrollPos;

  //   setState({
  //     prevScrollPos: currentScrollPos,
  //     visible
  //   });
  // };

  const [hasSignedOut, setHasSignedOut] = React.useState(true);

  const signOut = () => {
    CurrentUser.revokeCurrentUser();
    setHasSignedOut(true);
  }

  React.useEffect(() => {
    console.log('user has signed out');
  }, [hasSignedOut]);


  return (
    <div className='container'>
      {/* <div className='logo-wrapper'>
       <Link className='logo' to="/homePage"><p></p></Link>
      </div> */}
      <div className='nav-title'>Leaf Loyalty<span className='nav-title-sub'> a Tom Nook Scheme</span></div>
      <div></div>
      <div></div>
      <div className='logo'></div>
      <Link to='/signup' className='link'>Sign Up</Link>
      <Link to='/signin' className='link'>Sign In</Link>
      { CurrentUser.getCurrentUser() ?
        <Button onClick={signOut} className='link'>Sign Out</Button>
        : <></>
      }
    </div>
  )
}

export default Navbar;