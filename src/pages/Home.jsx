import { Link } from "react-router-dom"
import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import Spinner from "../components/Spinner"
import ErrorAlert from "../components/ErrorAlert"
import ProductCard from "../components/ProductCard"

const Home = () => {
  useEffect(() => {
    document.title = "Home"
  }, [])

  const {
    data: categories,
    loading: catLoading,
    error: catError,
  } = useFetch("https://fakestoreapi.com/products/categories")
  const {
    data: products,
    loading: prodLoading,
    error: prodError,
  } = useFetch("https://fakestoreapi.com/products?limit=6")

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] py-20 border-b border-[#30363d]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-[#f0f6fc] mb-6">
            Welcome to <span className="text-[#58a6ff]">Toko Pak Edi</span>
          </h1>
          <p className="text-xl text-[#c9d1d9] mb-8 max-w-2xl mx-auto">
            Temukan berbagai macam barang yang mungkin berguna untuk kamu.
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">
            Shop by Category
          </h2>
          {catLoading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {catError && <ErrorAlert message={catError} onRetry={handleRetry} />}
          {categories && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  className="bg-[#161b22] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-[#30363d] hover:border-[#58a6ff]"
                >
                  <h3 className="text-lg font-semibold text-[#f0f6fc] capitalize">
                    {category}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">
            Featured Products
          </h2>
          {prodLoading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {prodError && (
            <ErrorAlert message={prodError} onRetry={handleRetry} />
          )}
          {products && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
