import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"
import { productAPI } from "../utils/api"

const LatestCollection = () => {
  const { loading } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadLatestProducts()
  }, [])

  const loadLatestProducts = async () => {
    try {
      setIsLoading(true)
      const response = await productAPI.getLatest(10)
      setLatestProducts(response.products || [])
    } catch (error) {
      console.error("Error loading latest products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || loading) {
    return (
      <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <Title text1="LATEST" text2="COLLECTION" />
        </div>
        <div className="flex justify-center items-center py-10">
          <div className="text-gray-500">Loading latest collection...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product, index) => (
          <ProductItem
            key={product._id || index}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
