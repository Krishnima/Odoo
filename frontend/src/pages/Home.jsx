import Hero from "../components/Hero"
import FeaturedItems from "../components/FeaturedItems"
import { Link } from "react-router-dom"
import { ArrowRight, Users, Recycle, Heart, Star } from "lucide-react"

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedItems />

      {/* How it works section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of fashion lovers in creating a more sustainable future through clothing exchange
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">📷</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Upload Your Items</h3>
              <p className="text-gray-600 mb-6">
                Take photos of clothes you no longer wear and list them on our platform with detailed descriptions.
              </p>
              <Link
                to="/add-item"
                className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700"
              >
                Start Listing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">🔄</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Browse & Swap</h3>
              <p className="text-gray-600 mb-6">
                Find items you love and request swaps or use points to redeem them. Connect with other fashion lovers.
              </p>
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
              >
                Browse Items <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                  <span className="text-3xl">🌱</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Reduce Waste</h3>
              <p className="text-gray-600 mb-6">
                Give clothes a second life and contribute to a more sustainable future while refreshing your wardrobe.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-green-100" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-green-100">Active Users</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Recycle className="w-8 h-8 text-green-100" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-green-100">Items Swapped</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-8 h-8 text-green-100" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">25K+</div>
              <div className="text-green-100">Happy Swaps</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-green-100" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">4.9</div>
              <div className="text-green-100">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community today and discover the joy of giving clothes a second life while finding amazing new pieces for your wardrobe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Join ReWear Today
            </Link>
            <Link
              to="/browse"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              Explore Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home