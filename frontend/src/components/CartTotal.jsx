import { useContext } from "react"
import Title from "./Title"
import { ShopContext } from "../context/ShopContext"

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext)

  return (
    <div className="w-full ">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount().toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>
            {currency} {getCartAmount() === 0 ? "0.00" : delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {currency} {getCartAmount() === 0 ? "0.00" : (getCartAmount() + delivery_fee).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
