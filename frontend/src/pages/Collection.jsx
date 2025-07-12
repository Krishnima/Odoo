import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"
import { productAPI } from "../utils/api"

const Collection = () => {
  const { search, showSearch, loading } = useContext(ShopContext)

  const [showFilters, setShowFilters] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relevant")
  const [isLoading, setIsLoading] = useState(false)

  const toggleCategory = (e) => {
    const val = e.target.value
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    )
  }

  const toggleSubCategory = (e) => {
    const val = e.target.value
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
    )
  }

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const filters = {}
      if (showSearch && search) filters.search = search
      if (category.length) filters.category = category.join(",")
      if (subCategory.length) filters.subCategory = subCategory.join(",")
      if (sortType !== "relevant") {
        filters.sortBy = "price"
        filters.order = sortType === "low-high" ? "asc" : "desc"
      }

      const res = await productAPI.getAll(filters)
      setFilterProducts(res.products || [])
    } catch (err) {
      console.error(err)
      setFilterProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  // coalesce rapid changes into one fetch by waiting 300ms after last change
  useEffect(() => {
    const timer = setTimeout(loadProducts, 300)
    return () => clearTimeout(timer)
  }, [category, subCategory, search, showSearch, sortType])

  if (loading || isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        <div className="flex justify-center items-center py-20 w-full">
          <div className="text-gray-500">Loading products...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters((f) => !f)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon || "/placeholder.svg"}
            alt=""
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
          />
        </p>

        {/* CATEGORIES */}
        <div className={`${showFilters ? "" : "hidden"} sm:block border border-gray-300 pl-5 py-3 mt-6`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* TYPE */}
        <div className={`${showFilters ? "" : "hidden"} sm:block border border-gray-300 pl-5 py-3 my-5`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={sub}
                  checked={subCategory.includes(sub)}
                  onChange={toggleSubCategory}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="OUR" text2="COLLECTIONS" />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
