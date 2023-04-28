// Write your code here
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    productItemDetails: '',
    productCount: 1,
    similarProductsList: [],
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const similarProducts = fetchedData.similar_products
      const formattedData = {
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        title: fetchedData.title,
        price: fetchedData.price,
        rating: fetchedData.rating,
        totalReviews: fetchedData.total_reviews,
        description: fetchedData.description,
        availability: fetchedData.availability,
        brand: fetchedData.brand,
        style: fetchedData.style,
      }
      const updatedSimilarProducts = similarProducts.map(eachProduct => ({
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        title: eachProduct.title,
        price: eachProduct.price,
        rating: eachProduct.rating,
        totalReviews: eachProduct.total_reviews,
        description: eachProduct.description,
        availability: eachProduct.availability,
        brand: eachProduct.brand,
        style: eachProduct.style,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        productItemDetails: formattedData,
        similarProductsList: updatedSimilarProducts,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  decreaseProductCount = () => {
    const {productCount} = this.state
    if (productCount > 1) {
      this.setState(prevState => ({productCount: prevState.productCount - 1}))
    }
  }

  increaseProductCount = () =>
    this.setState(prevState => ({productCount: prevState.productCount + 1}))

  renderProductItemDetailsView = () => {
    const {productItemDetails, productCount, similarProductsList} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = productItemDetails
    const integerRating = parseInt(rating, 10)
    return (
      <>
        <div className="product-item-details-container2">
          <img
            className="product-item-details-image"
            alt="product"
            src={imageUrl}
          />
          <div className="product-item-details-container3">
            <h1 className="product-item-details-heading">{title}</h1>
            <p className="product-item-details-price">Rs {price}/-</p>
            <div className="product-item-details-rating-reviews-container">
              <p className="product-item-details-rating">
                {integerRating}{' '}
                <img
                  className="product-item-details-star-image"
                  alt="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                />
              </p>
              <p className="product-item-details-reviews">
                {totalReviews} Reviews
              </p>
            </div>
            <p className="product-item-details-description">{description}</p>
            <p className="product-item-details-available">
              <span className="span-element">Available: </span>
              {availability}
            </p>
            <p className="product-item-details-available">
              <span className="span-element">Brand: </span>
              {brand}
            </p>
            <hr className="horizontal-line" />
            <div className="product-item-details-increment-decrement-container">
              <button
                className="product-item-details-decrement-button"
                type="button"
                onClick={this.decreaseProductCount}
                data-testid="minus"
              >
                <BsDashSquare className="plus" />
              </button>
              <p className="product-item-details-product-count">
                {productCount}
              </p>
              <button
                className="product-item-details-increment-button"
                type="button"
                onClick={this.increaseProductCount}
                data-testid="plus"
              >
                <BsPlusSquare className="plus" />
              </button>
            </div>
            <button
              className="product-item-details-add-cart-button"
              type="button"
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <ul className="similar-products-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          {similarProductsList.map(eachProduct => (
            <SimilarProductItem
              productDetails={eachProduct}
              key={eachProduct.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="product-item-loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="product-item-details-failure-view-container">
      <img
        className="product-item-details-failure-view-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      />
      \
      <h1 className="product-item-details-failure-view-heading">
        Product Not Found
      </h1>
      <Link to="/products">
        <button
          className="product-item-details-failure-view-button"
          type="button"
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderProductItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductItemDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container1">
          {this.renderProductItemDetails()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
