import React from 'react';
import {connect} from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { ReactComponent as ShoppingIcon } from '../../assests/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({toggleCartHidden}) => (
    //{ toggleCartHidden : () => dispatch(toggleCartHidden() } this was destructure in the fn arg
    //onClick calls dispatch Fn, () => dispatch(toggleCartHidden() 
    //dispatch(action)---> dispatch({type: 'TOGGLE_CART_HIDDEN'})--->updates the cartReducer
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>0</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(null, mapDispatchToProps)(CartIcon);