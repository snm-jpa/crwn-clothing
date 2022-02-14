import React from 'react';
import { connect } from 'react-redux'; //HOC
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assests/crown.svg';

import './header.styles.scss';

//currentUser is coming from reducer
const Header = ({ currentUser }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
)

//@param state is the root reducer
//Any time the store is updated, mapStateToProps will be called. 
//Must be plain obj, which will be merged into the wrapped component's props
//If don't want to subscribe to store updates, pass NULL or UNDEFINED in place of mapStateToProps
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

//The connect() function connects a React component to a Redux store.  
//1) get {currentUser = null} as initial state and 2) pass {currentUser = null} to the Header Component above, instead of passing it as a prop from App.js
export default connect(mapStateToProps)(Header); 
