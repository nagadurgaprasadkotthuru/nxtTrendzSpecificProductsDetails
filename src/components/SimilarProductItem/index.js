// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {imageUrl, title, price, rating, brand} = productDetails
  return (
    <li className="list-item">
      <img
        className="similar-products-image"
        alt={`similar product ${title}`}
        src={imageUrl}
      />
      <h3 className="similar-products-title">{title}</h3>
      <p className="similar-products-brand">by {brand}</p>
      <div className="similar-products-price-rating-container">
        <h2 className="similar-products-price">Rs {price}/-</h2>
        <p className="similar-products-reting">
          {rating}
          <img
            className="similar-products-star-image"
            alt="star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          />
        </p>
      </div>
    </li>
  )
}

export default SimilarProductItem
