import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import { assets } from "../assets/assets"
import CartTotal from "../components/CartTotal"

const Cart = () => {
  const { cartItems, currency, updateQuantity, navigate, isAuthenticated, loading } = useContext(ShopContext)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="border-t pt-14">
        <div className="text-2xl mb-3">
          <Title text1="YOUR" text2="CART" />
        </div>
        <div className="flex justify-center py-10">
          <div className="text-gray-500">Loading cart...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return null // Will redirect to login
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            if (!item.product) return null

            return (
              <div
                key={`${item.product_id}-${item.size}-${index}`}
                className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-center gap-6">
                  <img className="w-16 sm:w-20" src={item.product.image[0] || "/placeholder.svg"} alt="" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{item.product.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {item.product.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border-0 bg-slate-50 ">Size: {item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => updateQuantity(item.product_id, item.size, Number(e.target.value))}
                  type="number"
                  min={1}
                  value={item.quantity}
                  className="border border-gray-400 px-1 sm:px-2 py-1 max-w-10 sm:max-w-20"
                />
                <img
                  onClick={() => updateQuantity(item.product_id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon || "/placeholder.svg"}
                  alt=""
                />
              </div>
            )
          })
        ) : (
          <div className="text-center py-10 text-gray-500">Your cart is empty</div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button onClick={() => navigate("/place-order")} className="bg-black text-white text-sm my-8 px-8 py-3">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
