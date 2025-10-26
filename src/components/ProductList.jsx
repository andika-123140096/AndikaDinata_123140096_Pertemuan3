import PropTypes from "prop-types"
import { useState, useMemo } from "react"
import ProductCard from "./ProductCard"
import Spinner from "./Spinner"
import ErrorAlert from "./ErrorAlert"

const ProductList = ({ products, loading, error, onRetry }) => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(products.map((p) => p.category))]
    return cats
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (sortBy !== "default") {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "name-asc":
            return a.title.localeCompare(b.title)
          case "name-desc":
            return b.title.localeCompare(a.title)
          case "price-asc":
            return a.price - b.price
          case "price-desc":
            return b.price - a.price
          default:
            return 0
        }
      })
    }

    return filtered
  }, [products, selectedCategory, sortBy])

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    )
  if (error) return <ErrorAlert message={error} onRetry={onRetry} />

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="md:w-48">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-[#c9d1d9] mb-2"
          >
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-[#30363d] rounded-md shadow-sm bg-[#161b22] text-[#f0f6fc] focus:outline-none focus:ring-[#58a6ff] focus:border-[#58a6ff]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all"
                  ? "All Categories"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-48">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-[#c9d1d9] mb-2"
          >
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-[#30363d] rounded-md shadow-sm bg-[#161b22] text-[#f0f6fc] focus:outline-none focus:ring-[#58a6ff] focus:border-[#58a6ff]"
          >
            <option value="default">Default Order</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-[#8b949e] py-8">
          No products found in this category.
        </p>
      )}
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onRetry: PropTypes.func,
}

export default ProductList
