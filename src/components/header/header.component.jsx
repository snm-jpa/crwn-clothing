import React from 'react';
import { connect } from 'react-redux'; //HOC
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assests/crown.svg';

import './header.styles.scss';

//currentUser is coming from reducer
const Header = ({ currentUser, hidden }) => (
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
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
    </div>
)

//@param state is the root reducer. It is the entire Redux store state(same value returned by store.getState())
//mapStateToProps is used for selecting the part of the data from the store that the connected component needs.
//mapStateToProps function is called every time the store state changes. If don't want to subscriber pass null or undefined to connect
//It receives the entire store state, and should return an object of data this component needs.
/* eg, state = {
    "user": {
        "currentUser": null
    },
    "cart": {
        "hidden": true
    }
}*/
/*
    should return plain object that contains the data the component needs
    function mapStateToProps(state) {
            return {
                currentUser: null,
                hidden: true
            }
    }
    -Each field in the object will become a prop for your actual component
    -the values in the fields will be used to determine if your component needs to re-render
*/
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({         //destructuing nested object
    currentUser,
    hidden
})

//The connect() function connects a React component to a Redux store.  
//1) get {currentUser = null} as initial state and 2) pass {currentUser = null} to the Header Component above, instead of passing it as a prop from App.js
export default connect(mapStateToProps)(Header); 
