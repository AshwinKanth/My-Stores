import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import FavouriteListView from '../FavouriteListView'
import AppContext from '../../Context/AppContext'
import "./index.css"

const Favourites = () => (
  <AppContext.Consumer>
    {value =>{
      const {favouriteList} = value

      const showEmptyView = favouriteList.length === 0

      return(
        <>
        <Navbar/>
        <div className='fav-container'>
           {showEmptyView ? (
              <div className="fav-empty-view-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                className="fav-empty-img"
                alt="cart empty"
              />
              <h1 className="cart-empty-heading">Your Favourites Is Empty</h1>
          
              <Link to="/">
                <button type="button" className="shop-now-btn">
                  Shop Now
                </button>
              </Link>
            </div>
           ):(
            <div className="fav-content-container">
                <h1 className="cart-heading">My Favourites</h1>
                <FavouriteListView/>
              </div>
           )}
        </div>
    </>
      )
    }}
  </AppContext.Consumer>
)

export default Favourites