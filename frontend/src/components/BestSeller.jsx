import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"
import { productAPI } from "../utils/api"

const BestSeller = () => {
  const { loading } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadBestsellers()
  }, [])

  const loadBestsellers = async () => {
    try {
      setIsLoading(true)
      const response = await productAPI.getBestsellers(5)
      setBestSeller(response.products || [])
    } catch (error) {
      console.error("Error loading bestsellers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || loading) {
    return (
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Title text1="BEST" text2="SELLERS" />
        </div>
        <div className="flex justify-center items-center py-10">
          <div className="text-gray-500">Loading bestsellers...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((product, index) => (
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

export default BestSeller
