import { useSearchParams } from "react-router-dom"
import { useEffect, useState, useMemo } from "react"
import useFetch from "../hooks/useFetch"
import ProductList from "../components/ProductList"

const Products = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const title = category
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
      : "All Products"
    document.title = title
  }, [category])

  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products"

  const { data: products, loading, error, refetch } = useFetch(url)

  const filteredProducts = useMemo(() => {
    if (!products) return []
    if (!searchTerm) return products
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  const handleRetry = () => {
    refetch()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#f0f6fc]">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
          : "All Products"}
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
        />
      </div>

      <ProductList
        products={filteredProducts}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </div>
  )
}

export default Products
