"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ItemCard from "../components/ItemCard"
import { toast } from "sonner"

const Browse = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: [],
    type: [],
    size: [],
    condition: [],
    search: "",
  })
  const [searchParams] = useSearchParams()

  const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Footwear", "Accessories"]
  const types = ["T-Shirt", "Shirt", "Sweater", "Jeans", "Pants", "Dress", "Jacket", "Shoes", "Boots"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10", "11", "12"]
  const conditions = ["Excellent", "Good", "Fair"]

  useEffect(() => {
    const searchQuery = searchParams.get("search")
    if (searchQuery) {
      setFilters((prev) => ({ ...prev, search: searchQuery }))
    }
  }, [searchParams])

  useEffect(() => {
    fetchItems()
  }, [filters])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()

      if (filters.search) queryParams.append("search", filters.search)
      filters.category.forEach((cat) => queryParams.append("category", cat))
      filters.type.forEach((type) => queryParams.append("type", type))
      filters.size.forEach((size) => queryParams.append("size", size))
      filters.condition.forEach((cond) => queryParams.append("condition", cond))

      const response = await fetch(`http://localhost:5328/api/items?${queryParams}`)
      const data = await response.json()

      if (data.success) {
        setItems(data.items)
      } else {
        toast.error("Failed to load items")
      }
    } catch (error) {
      console.error("Error fetching items:", error)
      toast.error("Failed to load items")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: [],
      type: [],
      size: [],
      condition: [],
      search: "",
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <div className="flex justify-between items-center mb-4">
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS</p>
          <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-700">
            Clear All
          </button>
        </div>

        {/* Search */}
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">SEARCH</p>
          <input
            type="text"
            placeholder="Search items..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full text-sm border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* Category Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((category) => (
              <label key={category} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => handleFilterChange("category", category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {types.map((type) => (
              <label key={type} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={() => handleFilterChange("type", type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">SIZE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {sizes.map((size) => (
              <label key={size} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  checked={filters.size.includes(size)}
                  onChange={() => handleFilterChange("size", size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Condition Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">CONDITION</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {conditions.map((condition) => (
              <label key={condition} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  checked={filters.condition.includes(condition)}
                  onChange={() => handleFilterChange("condition", condition)}
                />
                {condition}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">ALL</p>
            <p className="text-gray-700 font-medium">ITEMS</p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          <p className="text-sm text-gray-500">{items.length} items found</p>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg"></div>
                <div className="mt-2 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No items found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse
