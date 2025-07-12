const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5328/api"

// Helper function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem("token")
}

// Helper function to make authenticated requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getAuthToken()

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: "include",
    ...options,
  }

  try {
    console.log(`Making request to: ${url}`)
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error: ${response.status} - ${errorText}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.access_token) {
      localStorage.setItem("token", response.access_token)
    }

    return response
  },

  register: async (userData) => {
    const response = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    if (response.access_token) {
      localStorage.setItem("token", response.access_token)
    }

    return response
  },

  logout: async () => {
    localStorage.removeItem("token")
    return { success: true }
  },

  getProfile: async () => {
    return apiRequest("/auth/profile")
  },
}

// Products API
export const productAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams()

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((value) => queryParams.append(key, value))
        } else {
          queryParams.append(key, filters[key])
        }
      }
    })

    const queryString = queryParams.toString()
    return await apiRequest(`/products${queryString ? `?${queryString}` : ""}`)
  },

  getById: async (id) => {
    return await apiRequest(`/products/${id}`)
  },

  getBestsellers: async (limit = 5) => {
    return await apiRequest(`/products/bestsellers?limit=${limit}`)
  },

  getLatest: async (limit = 10) => {
    return await apiRequest(`/products/latest?limit=${limit}`)
  },

  getRelated: async (id, limit = 5) => {
    return await apiRequest(`/products/related/${id}?limit=${limit}`)
  },
}

// Cart API
export const cartAPI = {
  get: async () => {
    return apiRequest("/cart")
  },

  add: async (productId, size, quantity = 1) => {
    return apiRequest("/cart/add", {
      method: "POST",
      body: JSON.stringify({
        product_id: productId,
        size,
        quantity,
      }),
    })
  },

  update: async (productId, size, quantity) => {
    return apiRequest("/cart/update", {
      method: "PUT",
      body: JSON.stringify({
        product_id: productId,
        size,
        quantity,
      }),
    })
  },

  remove: async (productId, size) => {
    return apiRequest("/cart/remove", {
      method: "DELETE",
      body: JSON.stringify({
        product_id: productId,
        size,
      }),
    })
  },

  clear: async () => {
    return apiRequest("/cart/clear", {
      method: "DELETE",
    })
  },
}

// Orders API
export const orderAPI = {
  get: async () => {
    return apiRequest("/orders")
  },

  getById: async (orderId) => {
    return apiRequest(`/orders/${orderId}`)
  },

  create: async (orderData) => {
    return apiRequest("/orders/create", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  },

  updateStatus: async (orderId, status) => {
    return apiRequest(`/orders/${orderId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  },
}
