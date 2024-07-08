import { Component } from "react";
import Loader from "react-loader-spinner";
import Navbar from "../Navbar"
import ProductCard from "../ProductCard";
import PriceFilter from "../PriceFilter"

import "./index.css"

const sortbyOptions = [
    {
        optionId: 'desc',
        displayText: 'Price (High-Low)',
    },
    {
        optionId: 'asc',
        displayText: 'Price (Low-High)',
    },
]

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
  }


class ProductCategoryItems extends Component {
    state = { productCategoryItemsList: [], activeOptionId: sortbyOptions[0].optionId, apiStatus: apiStatusConstant.initial}

    componentDidMount() {
        this.getCategoryItems()
    }

    getCategoryItems = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const { match } = this.props
        const { params } = match
        const { slug } = params

        const { activeOptionId } = this.state

        const apiUrl = `https://dummyjson.com/products/category/${slug}?sortBy=price&order=${activeOptionId}`
        const options = {
            method: "GET"
        }

        const categoryItemsResponse = await fetch(apiUrl, options)

        if (categoryItemsResponse.ok === true) {
            const fetchedData = await categoryItemsResponse.json()

            const updatedData = fetchedData.products.map(eachItem => ({
                id: eachItem.id,
                title: eachItem.title,
                category: eachItem.category,
                price: eachItem.price,
                rating: eachItem.rating,
                images: eachItem.images[0],
                discountPercentage: eachItem.discountPercentage,
                stock: eachItem.stock
            }))
            this.setState({ productCategoryItemsList: updatedData, apiStatus: apiStatusConstant.success })
        }else {
            this.setState({ apiStatus: apiStatusConstant.failure })
          }
    }

    changeSortby = activeOptionId => {
        this.setState({ activeOptionId }, this.getCategoryItems)
    }



    renderCategoryItems = () => {
        const { productCategoryItemsList } = this.state

        return (
            <ul className="categoryItems-container">
                {productCategoryItemsList.map(eachItem => (
                    <ProductCard key={eachItem.id} productData={eachItem} />
                ))}
            </ul>
        )
    }

    renderLoadingView = () => (
        <div className="productLoader-container">
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={50}
            width={50}
          />
        </div>
      )
    
      renderFailureView = () => (
        <div className="no-products-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="no-jobs-image"
          />
          <h1 className="failureHeading">Oops! Something Went Wrong</h1>
          <p className="failureDescription">
            We cannot seem to find the page you are looking for
          </p>
          <button type="button" className="failureButton" onClick={this.getCategoryItems}>
            Retry
          </button>
        </div>
      )

      renderCategoryItemsView = () => {
        const { apiStatus } = this.state
    
        switch (apiStatus) {
          case apiStatusConstant.success:
            return this.renderCategoryItems();
          case apiStatusConstant.inProgress:
            return this.renderLoadingView();
          case apiStatusConstant.failure:
            return this.renderFailureView()
          default:
            return null;
        }
      }

    render() {
        const { activeOptionId } = this.state
        return (
            <>
                <Navbar />
                <div className="productCategoryItems-container">
                    <PriceFilter
                        activeOptionId={activeOptionId}
                        sortbyOptions={sortbyOptions}
                        changeSortby={this.changeSortby}
                    />
                    {this.renderCategoryItemsView()}
                </div>
            </>
        )
    }
}


export default ProductCategoryItems