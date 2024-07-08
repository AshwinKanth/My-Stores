import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

const ProductCategory = (props) => {
  const { productCategory } = props
  const { name,slug} = productCategory

  return (
    <Link to={`/products/category/${slug}`} className='categoryItem'>
      <li className='categoryItem'>
        <p className='categoryName'>{name}</p>
      </li>
    </Link>
  )
}

export default ProductCategory

