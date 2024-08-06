import React from 'react'

import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import {AiFillCloseCircle} from 'react-icons/ai'

import AppContext from '../../Context/AppContext'

import './index.css' 

const CartItem = (props) => (

    <AppContext.Consumer>
        {value =>{
            const {removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity} = value

            const {cartItemDetails} = props
            const {images, title,price,category,quantity,id} = cartItemDetails

            const onDecrementQuantity = () =>{
                decrementCartItemQuantity(id)
            }

            const onIncrementQuantity = () =>{
                incrementCartItemQuantity(id)
            }

            const onRemoveCartItem = () =>{
                removeCartItem(id)
            }

            return(
                <li className='cart-item'>
                    <img src={images} alt={title} className='cart-product-image'/>
                    <div className='cart-item-details-container'>
                        <div className='cart-product-title-brand-container'>
                            <p className='cart-product-title'>{title}</p>
                            <p className='cart-product-brand'>by {category}</p>
                        </div>
                        <div className='cart-quantity-container'>
                            <button className='quantity-controller-button' type='button' onClick={onDecrementQuantity}>
                                <CiCircleMinus size={20}/>
                            </button>
                            <p className='cart-quantity'>{quantity}</p>
                            <button className='quantity-controller-button' type='button' onClick={onIncrementQuantity}>
                                <CiCirclePlus size={20}/>
                            </button>
                        </div>
                        <div className='total-price-remove-container'>
                            <p className='cart-total-price'>Rs {price} /-</p>
                            <button className='remove-button' type='button' onClick={onRemoveCartItem}>
                                Remove
                            </button>
                        </div>
                    </div>
                    <button className='delete-button' type='button' onClick={onRemoveCartItem}>
                    <AiFillCloseCircle  size={20} />
                    </button>
                </li>
            )
        }}
    </AppContext.Consumer>
)

export default CartItem