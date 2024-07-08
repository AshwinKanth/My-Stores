import React from 'react'

import FavouriteItem from "../FavouriteItem"
import AppContext from '../../Context/AppContext'
import "./index.css"

const FavouriteListView = () => (
    <AppContext.Consumer>
        {value =>{
            const {favouriteList} = value

            return(
                <ul className='fav-list'>
                    {favouriteList.map(eachCartItem =>(
                        <FavouriteItem  key={eachCartItem.id} productData={eachCartItem} />
                    ))}
                </ul>
            )
        }}
    </AppContext.Consumer>
  )

export default FavouriteListView