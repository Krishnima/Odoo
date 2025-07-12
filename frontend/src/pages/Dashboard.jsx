"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Plus, Eye, Clock, CheckCircle, XCircle, Package, ArrowUpDown, User, Star } from "lucide-react"

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [myItems, setMyItems] = useState([])
  const [mySwaps, setMySwaps] = useState([])
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Mock data for demonstration
  const mockUser = {
    _id: "user123",
    name: "John Doe",
    email: "john@example.com",
    points: 150,
    created_at: "2024-01-15"
  }

  const mockItems = [
    {
      _id: "item1",
      title: "Vintage Denim Jacket",
      condition: "Excellent",
      size: "M",
      points_value: 75,
      status: "approved",
      availability: "available",
      images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"],
      created_at: "2024-01-20"
    },
    {
      _id: "item2",
      title: "Summer Dress",
      condition: "Good",
      size: "S",
      points_value: 60,
      status: "pending",
      availability: "pending",
      images: ["https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300"],
      created_at: "2024-01-22"
    }
  ]

  const mockSwaps = [
    {
      _id: "swap1",
      status: "pending",
      requester_id: "user123",
      owner_id: "user456",
      requested_item: { title: "Designer Handbag" },
      offered_item: { title: "Vintage Denim Jacket" },
      other_user: { name: "Sarah M." },
      message: "I love this handbag! Would you like to swap?",
      created_at: "2024-01-21"
    },
    {
      _id: "swap2",
      status: "accepted",
      requester_id: "user789",
      owner_id: "user123",
      requested_item: { title: "Summer Dress" },
      offered_item: null,
      other_user: { name: "Emma K." },
      message: "Perfect for summer events!",
      created_at: "2024-01-19"
    }
  ]

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      navigate("/login")
      return
    }

    // Simulate API calls with mock data
    setTimeout(() => {
      setUser(mockUser)
      setMyItems(mockItems)
      setMySwaps(mockSwaps)
      setLoading(false)
    }, 1000)
  }, [navigate])

  const handleSwapResponse = async (swapId, action) => {
    toast.success(`Swap ${action}ed successfully`)
    // In real app, make API call here
  }

  const handleCompleteSwap = async (swapId) => {
    toast.success("Swap completed successfully!")
    // In real app, make API call here
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const pendingItems = myItems.filter((item) => item.status === "pending")
  const approvedItems = myItems.filter((item) => item.status === "approved")
  const pendingSwaps = mySwaps.filter((swap) => swap.status === "pending")
  const activeSwaps = mySwaps.filter((swap) => swap.status === "accepted")

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Points Balance</p>
              <p className="text-3xl font-bold">{user.points}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">My Items</p>
              <p className="text-3xl font-bold">{myItems.length}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Active Swaps</p>
              <p className="text-3xl font-bold">{activeSwaps.length}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <ArrowUpDown className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Pending Items</p>
              <p className="text-3xl font-bold">{pendingItems.length}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", label: "Overview", icon: Eye },
            { id: "items", label: "My Items", icon: Package },
            { id: "swaps", label: "Swaps", icon: ArrowUpDown },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/add-item"
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                List New Item
              </Link>
              <Link
                to="/browse"
                className="flex items-center gap-2 border border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Browse Items
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            {mySwaps.length > 0 ? (
              <div className="space-y-4">
                {mySwaps.slice(0, 3).map((swap) => (
                  <div key={swap._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <ArrowUpDown className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {swap.requester_id === user._id ? "You requested" : "Request for"}: {swap.requested_item?.title}
                        </p>
                        <p className="text-sm text-gray-600">with {swap.other_user?.name}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        swap.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : swap.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : swap.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {swap.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "items" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">My Items</h3>
            <Link
              to="/add-item"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Item
            </Link>
          </div>

          {myItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={item.images?.[0] || "/placeholder.svg?height=200&width=300"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.condition} • Size {item.size}
                    </p>
                    <p className="text-sm font-medium text-green-600 mb-3">{item.points_value} points</p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.availability === "available"
                            ? "bg-blue-100 text-blue-800"
                            : item.availability === "reserved"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.availability}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">You haven't listed any items yet</p>
              <Link
                to="/add-item"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                List Your First Item
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === "swaps" && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">My Swaps</h3>

          {mySwaps.length > 0 ? (
            <div className="space-y-4">
              {mySwaps.map((swap) => (
                <div key={swap._id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <ArrowUpDown className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">
                            {swap.requester_id === user._id ? "You requested" : "Request from"}: {swap.other_user?.name}
                          </h4>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              swap.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : swap.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : swap.status === "completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {swap.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Requested Item:</p>
                          <p className="font-medium">{swap.requested_item?.title}</p>
                        </div>
                        {swap.offered_item && (
                          <div>
                            <p className="text-sm font-medium text-gray-600">Offered Item:</p>
                            <p className="font-medium">{swap.offered_item?.title}</p>
                          </div>
                        )}
                      </div>

                      {swap.message && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600">Message:</p>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{swap.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      {swap.status === "pending" && swap.owner_id === user._id && (
                        <>
                          <button
                            onClick={() => handleSwapResponse(swap._id, "accept")}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleSwapResponse(swap._id, "reject")}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}

                      {swap.status === "accepted" && (
                        <button
                          onClick={() => handleCompleteSwap(swap._id)}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
              <ArrowUpDown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No swaps yet</p>
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Browse Items to Swap
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard