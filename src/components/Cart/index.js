import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import AppContext from '../../Context/AppContext'
import "./index.css"

const Cart = () => (
  <AppContext.Consumer>
    {value =>{
      const {cartList,removeAllCartItems} = value

      const onClickRemoveCartItems = () =>{
        removeAllCartItems()
      }

      const showEmptyView = cartList.length === 0

      return(
        <>
        <Navbar />
        <div className='cart-container'>
           {showEmptyView ? (
              <div className="cart-empty-view-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                className="cart-empty-img"
                alt="cart empty"
              />
              <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
          
              <Link to="/">
                <button type="button" className="shop-now-btn">
                  Shop Now
                </button>
              </Link>
            </div>
           ):(
            <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="removeAll-button"
                  type="button"
                  onClick={onClickRemoveCartItems}
                >
                  Remove all
                </button>
                <CartListView />
                <hr className='hrBreak' />
                <CartSummary />
              </div>
           )}
        </div>
    </>
      )
    }}
  </AppContext.Consumer>
)

export default Cart