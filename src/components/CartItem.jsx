import PropTypes from "prop-types"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { updateQuantity, removeItem } from "../store/slices/cartSlice"

const CartItem = ({ item, convertToIdr }) => {
  const dispatch = useDispatch()

  const handleQuantityChange = useCallback(
    (e) => {
      const quantity = parseInt(e.target.value, 10)
      dispatch(updateQuantity({ id: item.id, quantity }))
    },
    [dispatch, item.id]
  )

  const handleRemove = useCallback(() => {
    dispatch(removeItem(item.id))
  }, [dispatch, item.id])

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 bg-[#161b22] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#30363d]">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-lg shadow-md"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-[#f0f6fc] mb-1">{item.title}</h3>
        <p className="text-[#c9d1d9] mb-2">
          Rp {convertToIdr(item.price).toLocaleString("id-ID")} each
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor={`quantity-${item.id}`}
              className="text-sm font-medium text-[#f0f6fc]"
            >
              Qty:
            </label>
            <input
              id={`quantity-${item.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="w-20 px-3 py-2 border border-[#30363d] rounded-lg text-center bg-[#0d1117] text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent"
            />
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#58a6ff]">
              Rp{" "}
              {convertToIdr(item.price * item.quantity).toLocaleString("id-ID")}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="bg-[#f85149] hover:bg-[#da3633] text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        Remove
      </button>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  convertToIdr: PropTypes.func.isRequired,
}

export default CartItem
