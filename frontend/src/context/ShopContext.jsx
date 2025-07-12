import { createContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { productAPI, cartAPI, authAPI, getAuthToken } from "../utils/api"
import { products as staticProducts } from "../assets/assets"  // fallback static

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const currency = "₹"
  const delivery_fee = 10

  // GLOBAL STATE
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // AUTH HELPERS
  const isAuthenticated = () => !!getAuthToken()

  const login = async (credentials) => {
    try {
      setLoading(true)
      const res = await authAPI.login(credentials)
      setUser(res.user)
      await loadCart()
      toast.success("Login successful")
      return res
    } catch (err) {
      toast.error(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (data) => {
    try {
      setLoading(true)
      const res = await authAPI.register(data)
      setUser(res.user)
      toast.success("Registration successful")
      return res
    } catch (err) {
      toast.error(err.message || "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setUser(null)
      setCartItems([])
      toast.success("Logged out")
      navigate("/login")
    }
  }

  const clearCart = async () => {
    if (isAuthenticated()) {
      try {
        await cartAPI.clear()
      } catch (err) {
        console.error("Error clearing cart:", err)
      }
    }
    setCartItems([])
  }

  // PRODUCT LOADING
  const loadProducts = async () => {
    try {
      setLoading(true)
      const res = await productAPI.getAll()
      setProducts(res.products || staticProducts)
    } catch (err) {
      console.error("Error loading products:", err)
      toast.error("Failed to load products")
      setProducts(staticProducts)
    } finally {
      setLoading(false)
    }
  }

  // CART LOADING
  const loadCart = async () => {
    if (!isAuthenticated()) return
    try {
      const res = await cartAPI.get()
      if (res.success) {
        setCartItems(res.cart_items)
      }
    } catch (err) {
      console.error("Error fetching cart:", err)
    }
  }

  // USER PROFILE LOADING
  const loadUserProfile = async () => {
    if (!isAuthenticated()) return
    try {
      const res = await authAPI.getProfile()
      setUser(res.user)
    } catch (err) {
      console.error("Error fetching profile:", err)
      if (err.message.includes("401")) logout()
    }
  }

  // LIFECYCLE HOOKS
  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (isAuthenticated()) {
      loadUserProfile()
      loadCart()
    }
  }, [])

  // CART OPERATIONS
  const addToCart = async (product_id, size) => {
    if (!size) {
      toast.error("Please select a size")
      return
    }
    if (!isAuthenticated()) {
      toast.error("Please login to add to cart")
      navigate("/login")
      return
    }
    try {
      const res = await cartAPI.add(product_id, size, 1)
      if (res.success) {
        await loadCart()
        toast.success("Added to cart")
      }
    } catch (err) {
      console.error("Add cart error:", err)
      toast.error("Failed to add to cart")
    }
  }

  const updateQuantity = async (product_id, size, quantity) => {
    if (!isAuthenticated()) {
      toast.error("Login required")
      navigate("/login")
      return
    }
    try {
      if (quantity <= 0) {
        await cartAPI.remove(product_id, size)
      } else {
        await cartAPI.update(product_id, size, quantity)
      }
      await loadCart()
    } catch (err) {
      console.error("Update cart error:", err)
      toast.error("Failed to update cart")
    }
  }

  const getCartCount = () =>
    Array.isArray(cartItems)
      ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
      : 0

  const getCartAmount = () =>
    Array.isArray(cartItems)
      ? cartItems.reduce(
          (sum, item) => sum + (item.product?.price || 0) * item.quantity,
          0
        )
      : 0

  // CONTEXT VALUE
  const value = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    currency,
    delivery_fee,
    products,
    loading,
    user,
    isAuthenticated,
    login,
    register,
    logout,
    clearCart,
    loadProducts,
    loadUserProfile,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    loadCart,
    navigate
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
