import { Component } from "react"
import ProductCategory from "../ProductCategory"
import './index.css'

class Filters extends Component{
  state = {productCategoryList: []}

componentDidMount(){
  this.getProductCategory()
}

getProductCategory = async() =>{
  const url = "https://dummyjson.com/products/categories"
  const options = {
    method: "GET"
  }

  const categoryResponse = await fetch(url,options)

  if (categoryResponse.ok === true){
    const categoryData = await categoryResponse.json()

    const updateCategoryData = categoryData.map(eachCategory =>({
      id: eachCategory.id,
      name: eachCategory.name,
      slug: eachCategory.slug
    }))
    this.setState({productCategoryList: updateCategoryData})
  }
}


  render(){
    const {productCategoryList} =this.state
    return(
      <div className='filters-container'>
         <ul className="productCategoryList">
          {productCategoryList.map(eachCategory =>(
            <ProductCategory  key={eachCategory.id} productCategory={eachCategory}/>
          ))}
         </ul>
    </div>
    )
  }
}

export default Filters