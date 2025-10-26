import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectCart, selectTotalPrice } from "../store/slices/cartSlice"
import useCurrencyConverter from "../hooks/useCurrencyConverter"

const Checkout = () => {
  const cart = useSelector(selectCart)
  const totalPrice = useSelector(selectTotalPrice)
  const navigate = useNavigate()
  const { convertToIdr } = useCurrencyConverter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/checkout-success")
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-[#c9d1d9] mb-6">Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#f0f6fc]">
        Checkout
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-[#161b22] p-8 rounded-2xl shadow-xl border border-[#30363d]">
          <h2 className="text-2xl font-bold mb-6 text-[#f0f6fc]">
            Order Summary
          </h2>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-[#f0f6fc] font-medium">{item.title}</p>
                  <p className="text-[#c9d1d9] text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#58a6ff] font-semibold">
                    Rp{" "}
                    {convertToIdr(item.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#30363d] pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-[#c9d1d9]">
                Total:
              </span>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#58a6ff]">
                  Rp{" "}
                  {convertToIdr(parseFloat(totalPrice)).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#161b22] p-8 rounded-2xl shadow-xl border border-[#30363d]">
          <h2 className="text-2xl font-bold mb-6 text-[#f0f6fc]">
            Shipping & Payment
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#f0f6fc]">
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#f0f6fc]">
                Payment Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                      className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Complete Order
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
