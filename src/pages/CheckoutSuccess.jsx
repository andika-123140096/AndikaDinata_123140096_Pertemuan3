import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { clearCart } from "../store/slices/cartSlice"

const CheckoutSuccess = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Checkout Success"
  }, [])

  const handleContinueShopping = () => {
    dispatch(clearCart())
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center bg-[#161b22] rounded-2xl shadow-2xl p-12 border border-[#30363d]">
        <div className="text-6xl mb-6"></div>
        <h1 className="text-4xl font-bold text-[#f0f6fc] mb-6">
          Pesanan Berhasil Dibuat!
        </h1>
        <p className="text-xl text-[#c9d1d9] mb-8">
          Terima kasih atas pembelian Anda. Pesanan Anda telah berhasil
          diproses.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            onClick={handleContinueShopping}
            className="inline-block bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Lanjut Belanja
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
