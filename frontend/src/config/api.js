const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5328/api"

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  PROFILE: `${API_BASE_URL}/auth/profile`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,

  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
  LATEST_PRODUCTS: `${API_BASE_URL}/products/latest`,
  BESTSELLERS: `${API_BASE_URL}/products/bestsellers`,
  RELATED_PRODUCTS: (id) => `${API_BASE_URL}/products/related/${id}`,
  CATEGORIES: `${API_BASE_URL}/products/categories`,
  SUBCATEGORIES: `${API_BASE_URL}/products/subcategories`,

  // Cart endpoints
  CART: `${API_BASE_URL}/cart`,
  ADD_TO_CART: `${API_BASE_URL}/cart/add`,
  UPDATE_CART: `${API_BASE_URL}/cart/update`,
  REMOVE_FROM_CART: `${API_BASE_URL}/cart/remove`,
  CLEAR_CART: `${API_BASE_URL}/cart/clear`,

  // Order endpoints
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_BY_ID: (id) => `${API_BASE_URL}/orders/${id}`,
  CREATE_ORDER: `${API_BASE_URL}/orders/create`,
  UPDATE_ORDER_STATUS: (id) => `${API_BASE_URL}/orders/${id}/status`,
}

export default API_BASE_URL
