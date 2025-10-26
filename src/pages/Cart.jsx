import { useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectCart,
  selectTotalItems,
  selectTotalPrice,
  clearCart,
} from "../store/slices/cartSlice"
import { useNavigate } from "react-router-dom"
import CartItem from "../components/CartItem"
import useCurrencyConverter from "../hooks/useCurrencyConverter"

const Cart = () => {
  useEffect(() => {
    document.title = "Shopping Cart"
  }, [])

  const cart = useSelector(selectCart)
  const totalItems = useSelector(selectTotalItems)
  const totalPrice = useSelector(selectTotalPrice)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { convertToIdr } = useCurrencyConverter()

  const handleClearCart = useCallback(() => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart())
    }
  }, [dispatch])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#f0f6fc]">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-[#161b22] rounded-2xl shadow-lg border border-[#30363d]">
          <div className="text-6xl mb-6"></div>
          <p className="text-2xl text-[#c9d1d9] mb-6">Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="inline-block bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6 mb-12">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} convertToIdr={convertToIdr} />
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#161b22] to-[#21262d] p-8 rounded-2xl shadow-xl border border-[#30363d]">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <span className="text-lg font-semibold text-[#c9d1d9]">
                  Total Items:
                </span>
                <div className="text-2xl font-bold text-[#58a6ff]">
                  {totalItems}
                </div>
              </div>
              <div className="text-center md:text-right">
                <span className="text-lg font-semibold text-[#c9d1d9]">
                  Total Price:{" "}
                </span>
                <div className="text-2xl font-bold text-[#58a6ff]">
                  Rp{" "}
                  {convertToIdr(parseFloat(totalPrice)).toLocaleString("id-ID")}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={handleClearCart}
                className="flex-1 bg-[#f85149] hover:bg-[#da3633] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Clear Cart
              </button>
              <button
                className="w-full bg-[#58a6ff] text-[#0d1117] font-semibold py-3 px-6 rounded-lg hover:bg-[#388bfd] transition-colors duration-200"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
