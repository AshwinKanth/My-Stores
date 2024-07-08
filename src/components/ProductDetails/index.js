import { Component } from "react"
import {Link} from "react-router-dom"
import Loader from "react-loader-spinner";
import Navbar from "../Navbar"
import Reviews from "../Reviews";

import { BsCart3 } from "react-icons/bs";
import { MdElectricBolt } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

import "./index.css"
import AppContext from "../../Context/AppContext";

const apiStatusConstant ={
  success: "SUCCESS",
  inProgress: "INPROGRESS",
  failure: "FAILURE",
  initial: "INITIAL"
}


class ProductDetails extends Component {
  state = { productData: [], reviewsData: []  , apiStatus: apiStatusConstant.initial,quantity:1}

  componentDidMount() {
    this.getProductDetails()
  }


  getFormattedData = (data) => ({
    images: data.images[0],
    title: data.title,
    price: data.price,
    stock: data.stock,
    category: data.category,
    rating: data.rating,
    id: data.id,
    discountPercentage: data.discountPercentage,
    reviews: data.reviews,
    returnPolicy: data.returnPolicy,
    description: data.description,
    brand: data.brand,
    warrantyInformation: data.warrantyInformation,
    shippingInformation: data.shippingInformation,
    availabilityStatus: data.availabilityStatus,
  })

  getReviewsData = (data) => ({
    rating: data.rating,
    comment: data.comment,
    date: data.date,
    reviewerName: data.reviewerName
  })

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const { match } = this.props
    const { params } = match
    const { id } = params


    const url = `https://dummyjson.com/products/${id}`
    const options = {
      method: "GET"
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json();
      const updatedData = this.getFormattedData(fetchedData)
      const updateReviewsData = fetchedData.reviews.map(
        eachReview => this.getReviewsData(eachReview)
      )

      this.setState({ productData: updatedData, reviewsData: updateReviewsData , apiStatus: apiStatusConstant.success})
    }else{
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickIncreaseQuantity = () =>{
    this.setState(prevState => ({quantity: prevState.quantity+1}))
  }

  onClickDecreaseQuantity = () =>{
    const {quantity} = this.state
    if (quantity > 1){
      this.setState(prevState => ({quantity: prevState.quantity-1}))
    }
  }

  renderProductDetails = () =>(
    <AppContext.Consumer>
      {value =>{
        const {addCartItems} = value
        const { productData, reviewsData ,quantity} = this.state
        const { images, price, stock, title, category, discountPercentage, rating, returnPolicy, description, brand, warrantyInformation, shippingInformation, availabilityStatus } = productData
    
        const productRating = String(rating).slice(0, 3);
        const stockAvailability = stock > 10 ? "" : "Only few Left";

        const onClickAddCart =() =>{
          addCartItems({...productData,quantity})
        }

        return(
      <div className="productDetails">
        <div className="image-buttons-container">
          <img src={images} alt={title} className="image" />
          <div className="buttons-container">
            <button type="button" className="buttons addCart" onClick={onClickAddCart}><BsCart3 size={14} /> ADD TO CART</button>
            <Link to="/login">
            <button type="button" className="buttons buyNow"> <MdElectricBolt size={14} /> BUY NOW</button>
            </Link>
          </div>
        </div>
        <div className="productInformation-container">
          <h1 className="title">{title}</h1>
          <p className="productDescription">{description}</p>
          <p className="productCategory"> <span className='category'>Category:</span> {category}</p>
          <p className="productCategory"> <span className='category'>brand:</span> {brand}</p>
          <div className="rating-review-container">
            <div className='productRating-container'>
              <p className='product-rating'>{productRating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="review">111 Ratings & 3 Rewiews</p>
          </div>
          <div className="priceDetails-container">
            <p className="productDetailsPrice">₹{price} <span className="productDiscountPrice">₹{discountPercentage}</span></p>
          </div>
          <div className="quantity-container">
            <button className="quantityButton" type="button" onClick={this.onClickDecreaseQuantity}>
            <CiCircleMinus size={20} />
            </button>
            <p>{quantity}</p>
            <button className="quantityButton" type="button" onClick={this.onClickIncreaseQuantity}>
              <CiCirclePlus size={20}/>
            </button>
          </div>
          <p className="productStock">{stockAvailability}</p>
          <p className="returnPolicy"><span className="span">Return policy:</span> {returnPolicy}</p>
          <hr className="break" />
          <div className="smButtons-container">
            <button type="button" className="buttons addCart" onClick={onClickAddCart}><BsCart3 size={14} /> ADD TO CART</button>
            <Link to="/login">
            <button type="button" className="buttons buyNow"> <MdElectricBolt size={14} /> BUY NOW</button>
            </Link>
          </div>
          <div className="additionalInformation">
            <h1 className="informationHeading">Additional Information</h1>
            <p className="information"><span className="span">Warranty:</span> {warrantyInformation}</p>
            <p className="information"><span className="span">Shipping:</span> {shippingInformation}</p>
            <p className="information"><span className="span">Stock Availability:</span> {availabilityStatus}</p>
          </div>
          <hr className="break" />
          <div className="reviews-rating-container">
            <h1 className="informationHeading">Rating & Reviews</h1>
            <ul className="reviewsList-container">
              {reviewsData.map(eachProduct => (
                <Reviews
                  reviewDetails={eachProduct}
                  key={eachProduct.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
        )
      }}
    </AppContext.Consumer>
  )

  
  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
         <Loader
        type="TailSpin"
        color="#00BFFF"
        height={50}
        width={50}
      />
    </div>
  )

  renderFailureView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-image"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failureDescription">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="failureButton" onClick={this.getProductDetails}>
        Retry
      </button>
    </div>
  )


  renderProductsDetailView = () =>{
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderProductDetails();
      case apiStatusConstant.inProgress:
        return this.renderLoadingView();
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null;
    }
  }



  render() {
    return (
      <>
        <Navbar />
        <div className="productDetials-container">
          {this.renderProductsDetailView()}
          
        </div>
      </>
    )
  }
}

export default ProductDetails