import { Link } from "react-router-dom"
import { Component } from "react";

import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

import AppContext from "../../Context/AppContext";

import './index.css'


class ProductCard extends Component {
    state = { isFavourite: false }

    onClickFavourite = () => {
        this.setState(prevState => ({ isFavourite: !prevState.isFavourite }))
    }

    render() {
        const { isFavourite } = this.state
        const { productData } = this.props
        const { title, category, price, rating, images, discountPercentage, stock, id } = productData

        const productRating = String(rating).slice(0, 3);
        const stockAvailability = stock > 10 ? "" : "Only few Left"

        return (
            <AppContext.Consumer>
                {value => {
                    const { addFavouriteItem } = value

                    const onClickAddFav = () => {
                        addFavouriteItem({ ...productData })
                    }
                    return (
                        <li className='productItem'>
                            <div className="favIcon-container">
                                {isFavourite ? (
                                    <button type="button" className="favButton">
                                        <MdOutlineFavorite size={20} color="#e31310" className="favIcon" onClick={this.onClickFavourite} />
                                    </button>
                                ) : (
                                    <button type="button" className="favButton"  onClick={onClickAddFav}>
                                        <MdOutlineFavoriteBorder size={20} className="favIcon" onClick={this.onClickFavourite} />
                                    </button>
                                )}
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
}


export default ProductCard