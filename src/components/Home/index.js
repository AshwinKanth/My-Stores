
import { Component } from "react"
import Loader from "react-loader-spinner"
import Filters from '../Filters'
import Carousel from '../Carousel'
import ProductCard from "../ProductCard"
import Navbar from "../Navbar"

import './index.css'

const apiStatusConstant = {
  success: "SUCCESS",
  inProgress: "INPROGRESS",
  failure: "FAILURE",
  initial: "INITIAL"
}


class Home extends Component {
  state = { productsList: [], apiStatus: apiStatusConstant.initial ,searchInput:''}

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    this.setState({ apiStatus: apiStatusConstant.inProgress })
    const {searchInput} = this.state
    const apiUrl = `https://dummyjson.com/products/search?q=${searchInput}&limit=0`
    console.log(apiUrl)
    const options = {
      method: "GET"
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json();
      const updatedData = data.products.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        category: eachItem.category,
        price: eachItem.price,
        rating: eachItem.rating,
        images: eachItem.images[0],
        discountPercentage: eachItem.discountPercentage,
        stock: eachItem.stock
      }))
      this.setState({ productsList: updatedData, apiStatus: apiStatusConstant.success })
    } else {
      this.setState({ apiStatus: apiStatusConstant.failure })
    }
  }

  renderProducts = () => {
    const { productsList } = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ?(
      <ul className="productsList-container">
        {productsList.map(eachItem => (
          <ProductCard productData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ):(
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="homeLoader-container" data-testid="loader">
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
      <button type="button" className="failureButton" onClick={this.getProducts}>
        Retry
      </button>
    </div>
  )

  renderProductsView = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderProducts();
      case apiStatusConstant.inProgress:
        return this.renderLoadingView();
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null;
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Navbar searchInput={searchInput} changeSearchInput={this.changeSearchInput} enterSearchInput={this.enterSearchInput}/>
        <Carousel />
        <Filters />
        <div className="home-container">
          {this.renderProductsView()}
        </div>
      </>
    )
  }
}

export default Home