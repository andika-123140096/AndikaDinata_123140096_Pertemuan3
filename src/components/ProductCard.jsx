import PropTypes from "prop-types"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { addItem } from "../store/slices/cartSlice"
import { useNavigate } from "react-router-dom"
import useCurrencyConverter from "../hooks/useCurrencyConverter"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { convertToIdr } = useCurrencyConverter()

  const handleAddToCart = useCallback(() => {
    dispatch(addItem(product))
  }, [dispatch, product])

  const handleViewDetails = useCallback(() => {
    navigate(`/products/${product.id}`)
  }, [navigate, product.id])

  return (
    <div className="bg-[#161b22] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#30363d]">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          onClick={handleViewDetails}
          style={{ cursor: "pointer" }}
        />
        <div className="absolute top-2 right-2"></div>
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <button
            onClick={handleViewDetails}
            className="bg-[#21262d] text-[#f0f6fc] px-4 py-2 rounded-lg font-medium hover:bg-[#30363d] transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3
          className="text-lg font-bold text-[#f0f6fc] mb-2 line-clamp-2 hover:text-[#58a6ff] transition-colors"
          onClick={handleViewDetails}
          style={{ cursor: "pointer" }}
        >
          {product.title}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#58a6ff]">
            Rp {convertToIdr(product.price).toLocaleString("id-ID")}
          </span>
          <div className="flex items-center bg-[#21262d] px-2 py-1 rounded-lg">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="text-sm font-medium text-[#f0f6fc]">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}

export default ProductCard
