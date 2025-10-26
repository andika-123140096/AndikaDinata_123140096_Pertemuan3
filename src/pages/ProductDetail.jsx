import { useParams, useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addItem } from "../store/slices/cartSlice"
import useFetch from "../hooks/useFetch"
import useCurrencyConverter from "../hooks/useCurrencyConverter"
import Spinner from "../components/Spinner"
import ErrorAlert from "../components/ErrorAlert"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { convertToIdr } = useCurrencyConverter()

  const {
    data: product,
    loading,
    error,
    refetch,
  } = useFetch(`https://fakestoreapi.com/products/${id}`)

  useEffect(() => {
    if (product) {
      document.title = `${product.title}`
    }
  }, [product])

  const handleAddToCart = useCallback(() => {
    if (product) {
      dispatch(addItem(product))
      navigate("/cart")
    }
  }, [dispatch, product, navigate])

  const handleRetry = () => {
    refetch()
  }

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    )
  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorAlert message={error} onRetry={handleRetry} />
      </div>
    )
  if (!product)
    return (
      <div className="text-center py-16 text-xl text-[#8b949e]">
        Product not found.
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto bg-[#161b22] rounded-2xl shadow-2xl overflow-hidden border border-[#30363d]">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-[#f0f6fc] mb-4">
              {product.title}
            </h1>
            <p className="text-[#c9d1d9] text-lg mb-6 leading-relaxed">
              {product.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
              <span className="text-3xl font-bold text-[#58a6ff]">
                Rp {convertToIdr(product.price).toLocaleString("id-ID")}
              </span>
              <div className="flex items-center bg-[#21262d] px-4 py-2 rounded-lg w-fit">
                <span className="text-yellow-500 text-xl mr-2">⭐</span>
                <span className="text-lg font-semibold text-[#f0f6fc]">
                  {product.rating.rate}
                </span>
                <span className="text-[#8b949e] ml-1">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            <span className="inline-block bg-[#56d364] text-[#0d1117] text-sm px-4 py-2 rounded-full mb-8 font-semibold shadow-md">
              {product.category}
            </span>
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
