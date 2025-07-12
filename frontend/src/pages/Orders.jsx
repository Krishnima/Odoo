import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import { orderAPI } from "../utils/api"
import { toast } from "sonner"

const Orders = () => {
  const { currency, isAuthenticated, navigate } = useContext(ShopContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login")
      return
    }
    loadOrders()
  }, [isAuthenticated, navigate])

  const loadOrders = async () => {
    try {
      setLoading(true)
      console.log("Loading orders...")

      const response = await orderAPI.get()
      console.log("Orders API response:", response)

      if (response.orders) {
        setOrders(response.orders)
        console.log("Orders loaded:", response.orders.length)
      } else {
        setOrders([])
        console.log("No orders found in response")
      }
    } catch (error) {
      console.error("Error loading orders:", error)
      toast.error("Failed to load orders")
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "Order Placed"
      case "processing":
        return "Processing"
      case "shipped":
        return "Shipped"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (error) {
      return "N/A"
    }
  }

  if (loading) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>
        <div className="flex justify-center py-10">
          <div className="text-gray-500">Loading orders...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return null // Will redirect to login
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order._id || index} className="py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start text-sm">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                    <span className="text-gray-500 text-xs">Order</span>
                  </div>
                  <div>
                    <p className="text-base font-medium">Order #{order._id?.slice(-8) || "N/A"}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}
                        {((order.total_amount || 0) + (order.delivery_fee || 0)).toFixed(2)}
                      </p>
                      <p>Items: {order.items?.length || 0}</p>
                    </div>
                    <p className="mt-2">
                      Date: <span className="text-gray-400">{formatDate(order.created_at)}</span>
                    </p>
                    <p className="mt-1">
                      Payment: <span className="text-gray-600 capitalize">{order.payment_method || "N/A"}</span>
                    </p>
                  </div>
                </div>

                <div className="sm:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className={`min-w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></p>
                    <p className="text-sm md:text-base">{getStatusText(order.status)}</p>
                  </div>
                  <button
                    onClick={() => toast.info("Order tracking coming soon!")}
                    className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50"
                  >
                    Track Order
                  </button>
                </div>
              </div>

              {/* Order Items */}
              {order.items && order.items.length > 0 && (
                <div className="mt-4 pl-20">
                  <p className="text-sm font-medium text-gray-600 mb-2">Order Items:</p>
                  <div className="space-y-2">
                    {order.items.slice(0, 3).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-3 text-sm text-gray-600">
                        <span>•</span>
                        <span>{item.product_name || "Product"}</span>
                        <span>Size: {item.size}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>
                          {currency}
                          {(item.product_price || item.price || 0).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-500">+{order.items.length - 3} more items</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No orders found</p>
            <button
              onClick={() => navigate("/collection")}
              className="mt-4 bg-black text-white px-6 py-2 text-sm rounded"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
