import React from 'react'

const AppContext = React.createContext({
    cartList: [],
    removeAllCartItems: () =>{},
    addCartItems: () =>{},
    removeCartItem: () =>{},
    incrementCartItemQuantity: () =>{},
    decrementCartItemQuantity: () =>{},

    favouriteList:[],
    removeFavouriteItem: () =>{},
    addFavouriteItem: () =>{},
})

export default AppContext