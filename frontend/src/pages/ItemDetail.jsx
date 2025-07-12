"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Heart, Share2, Star, User, MapPin, Calendar, Tag, ArrowLeft } from "lucide-react"

const ItemDetail = () => {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [userItems, setUserItems] = useState([])
  const [selectedItem, setSelectedItem] = useState("")
  const [swapMessage, setSwapMessage] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Mock data for demonstration
  const mockItem = {
    _id: itemId,
    title: "Vintage Denim Jacket",
    description: "Beautiful vintage denim jacket in excellent condition. Perfect for casual outings and layering. This classic piece has been well-maintained and shows minimal signs of wear. Features original buttons and classic fit.",
    category: "Outerwear",
    type: "Jacket",
    size: "M",
    condition: "Excellent",
    points_value: 75,
    uploader_name: "Sarah M.",
    uploader_email: "sarah@example.com",
    uploader_id: "user456",
    availability: "available",
    status: "approved",
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    tags: ["vintage", "denim", "casual", "classic"],
    created_at: "2024-01-20",
    location: "New York, NY"
  }

  const mockUserItems = [
    {
      _id: "useritem1",
      title: "Summer Dress",
      condition: "Good",
      availability: "available",
      status: "approved"
    },
    {
      _id: "useritem2", 
      title: "Leather Boots",
      condition: "Excellent",
      availability: "available",
      status: "approved"
    }
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    // Simulate API call
    setTimeout(() => {
      setItem(mockItem)
      setLoading(false)
    }, 1000)
  }, [itemId])

  const fetchUserItems = async () => {
    setUserItems(mockUserItems)
  }

  const handleRedeemWithPoints = async () => {
    if (!user) {
      toast.error("Please login to redeem items")
      navigate("/login")
      return
    }

    if (user.points < item.points_value) {
      toast.error(`You need ${item.points_value} points to redeem this item`)
      return
    }

    toast.success("Item redeemed successfully!")
    navigate("/dashboard")
  }

  const handleSwapRequest = async () => {
    if (!user) {
      toast.error("Please login to request swaps")
      navigate("/login")
      return
    }

    toast.success("Swap request sent successfully!")
    setShowSwapModal(false)
    setSelectedItem("")
    setSwapMessage("")
  }

  const openSwapModal = () => {
    if (!user) {
      toast.error("Please login to request swaps")
      navigate("/login")
      return
    }
    setShowSwapModal(true)
    fetchUserItems()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Item not found</p>
      </div>
    )
  }

  const isOwner = user && user._id === item.uploader_id

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Browse
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={item.images?.[selectedImageIndex] || "/placeholder.svg?height=500&width=500"}
              alt={item.title}
              className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
            />
            <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="absolute top-4 right-16 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {item.images && item.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-green-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-green-600">{item.points_value} points</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 ml-1">(4.8)</span>
              </div>
            </div>
          </div>

          {/* Item Info Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-semibold">{item.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-semibold">{item.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Size</p>
              <p className="font-semibold">{item.size}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Condition</p>
              <p className="font-semibold">{item.condition}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Uploader Info */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-3">Listed by</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">{item.uploader_name}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {!isOwner && item.availability === "available" && (
            <div className="space-y-3 pt-6">
              <button
                onClick={handleRedeemWithPoints}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!user || user.points < item.points_value}
              >
                {user && user.points < item.points_value
                  ? `Need ${item.points_value - user.points} more points`
                  : `Redeem for ${item.points_value} points`}
              </button>

              <button
                onClick={openSwapModal}
                className="w-full border-2 border-green-600 text-green-600 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors"
              >
                Request Swap
              </button>
            </div>
          )}

          {isOwner && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 font-semibold">This is your item</p>
              <p className="text-blue-600 text-sm">Status: {item.status}</p>
              <p className="text-blue-600 text-sm">Availability: {item.availability}</p>
            </div>
          )}

          {item.availability !== "available" && !isOwner && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-gray-800 font-semibold">This item is no longer available</p>
            </div>
          )}
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Request Swap</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Offer an item (optional):</label>
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select an item to offer</option>
                {userItems.map((userItem) => (
                  <option key={userItem._id} value={userItem._id}>
                    {userItem.title} - {userItem.condition}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Message to owner:</label>
              <textarea
                value={swapMessage}
                onChange={(e) => setSwapMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
                placeholder="Tell the owner why you'd like this item..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSwapRequest}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Send Request
              </button>
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemDetail