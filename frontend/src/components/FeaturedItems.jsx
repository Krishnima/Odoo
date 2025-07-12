"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight } from "lucide-react"

const FeaturedItems = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mock data for demonstration
  const mockItems = [
    {
      _id: "1",
      title: "Vintage Denim Jacket",
      condition: "Excellent",
      size: "M",
      points_value: 75,
      uploader_name: "Sarah M.",
      images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400"],
      tags: ["vintage", "denim", "casual"]
    },
    {
      _id: "2", 
      title: "Designer Summer Dress",
      condition: "Good",
      size: "S",
      points_value: 90,
      uploader_name: "Emma K.",
      images: ["https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400"],
      tags: ["designer", "summer", "dress"]
    },
    {
      _id: "3",
      title: "Cozy Winter Sweater",
      condition: "Excellent", 
      size: "L",
      points_value: 60,
      uploader_name: "Mike R.",
      images: ["https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400"],
      tags: ["winter", "cozy", "sweater"]
    },
    {
      _id: "4",
      title: "Classic White Sneakers",
      condition: "Good",
      size: "9",
      points_value: 45,
      uploader_name: "Alex T.",
      images: ["https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400"],
      tags: ["sneakers", "classic", "white"]
    },
    {
      _id: "5",
      title: "Leather Handbag",
      condition: "Excellent",
      size: "One Size",
      points_value: 120,
      uploader_name: "Lisa P.",
      images: ["https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400"],
      tags: ["leather", "handbag", "accessories"]
    },
    {
      _id: "6",
      title: "Formal Blazer",
      condition: "Good",
      size: "M",
      points_value: 85,
      uploader_name: "David L.",
      images: ["https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400"],
      tags: ["formal", "blazer", "business"]
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItems(mockItems)
      setLoading(false)
    }, 1000)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, items.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, items.length - 2)) % Math.max(1, items.length - 2))
  }

  if (loading) {
    return (
      <div className="my-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Items
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing pre-loved items from our community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="my-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Items
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover amazing pre-loved items from our community members
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-6xl mx-auto">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {items.map((item) => (
              <div key={item._id} className="w-1/3 flex-shrink-0 px-3">
                <Link
                  to={`/items/${item._id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.images?.[0] || "/placeholder.svg?height=300&width=300"}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-green-600 font-semibold text-sm">
                          {item.points_value} pts
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">
                          {item.condition} • Size {item.size}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          by {item.uploader_name}
                        </span>
                        <div className="flex gap-1">
                          {item.tags?.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
          disabled={items.length <= 3}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
          disabled={items.length <= 3}
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        {items.length > 3 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.max(1, items.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Browse All Items
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}

export default FeaturedItems