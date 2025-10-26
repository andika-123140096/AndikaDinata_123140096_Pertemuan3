import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectTotalItems } from "../store/slices/cartSlice"
import logo from "../assets/logo.png"

const Navbar = () => {
  const totalItems = useSelector(selectTotalItems)
  const navigate = useNavigate()

  return (
    <nav className="bg-[#161b22] text-[#f0f6fc] shadow-lg border-b border-[#30363d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            >
              <img src={logo} alt="Toko Pak Edi" className="h-10 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-[#58a6ff] transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-[#21262d]"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-[#58a6ff] transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-[#21262d]"
            >
              Products
            </Link>
            <button
              onClick={() => navigate("/cart")}
              className="relative hover:text-[#58a6ff] transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-[#21262d] flex items-center space-x-1"
            >
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f85149] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
