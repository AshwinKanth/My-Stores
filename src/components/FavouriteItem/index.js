import { Link } from "react-router-dom"
import { IoCloseCircleSharp } from "react-icons/io5";

import AppContext from "../../Context/AppContext";

import './index.css'


const FavouriteItem = (props) =>{
    const { productData } = props
    const { title, category, price, rating, images, discountPercentage, stock, id } = productData

    const productRating = String(rating).slice(0, 3);
    const stockAvailability = stock > 10 ? "" : "Only few Left"
     return(
        <AppContext.Consumer>
            {value =>{
                const {removeFavouriteItem } = value

                const  onRemoveFavItem= () =>{
                    removeFavouriteItem(id)
                }

                return(
                    <li className='productItem'>
                            <div className="favIcon-container">
                                <button onClick={onRemoveFavItem} className="removeFavButton">
                                    <IoCloseCircleSharp size={20} />
                                </button>
                            </div>
                            <Link className="productLink" to={`/products/${id}`}>
                                <img src={images} alt={title} className='productimage' />
                                <h1 className='productTitle'>{title}</h1>
                                <p className='productCategory'><span className='category'>Category:</span> {category}</p>
                                <div className='price-rating-container'>
                                    <div className="price-container">
                                        <p className='price'>₹{price} <span className="productPrice">₹{discountPercentage}</span></p>
                                    </div>
                                    <div className='rating-container'>
                                        <p className='product-rating'>{productRating}</p>
                                        <img
                                            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                            alt="star"
                                            className="star"
                                        />
                                    </div>
                                </div>
                                <p className='freeDelivery'>Free delivery</p>
                                <p className='stock'>{stockAvailability}</p>
                            </Link>
                        </li>
                )
            }}
        </AppContext.Consumer>
     )
}


export default FavouriteItem