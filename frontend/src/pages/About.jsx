import { Link } from "react-router-dom"
import { Recycle, Users, Heart, Award, ArrowRight } from "lucide-react"

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About <span className="text-green-600">ReWear</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're building a community-driven platform that promotes sustainable fashion through clothing exchange, 
          helping reduce textile waste while connecting fashion lovers worldwide.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            ReWear was born out of a passion for sustainable fashion and a desire to revolutionize the way people 
            think about clothing consumption. We believe that every piece of clothing deserves a second chance, 
            and every person deserves access to quality fashion without breaking the bank or harming the planet.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Our platform connects conscious consumers who want to refresh their wardrobes while making a positive 
            environmental impact. Through direct swaps and our innovative point-based system, we're making 
            sustainable fashion accessible, fun, and rewarding.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Sustainable Fashion"
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">50K+ Items</p>
                <p className="text-sm text-gray-600">Given new life</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything we do is guided by our core values that shape how we build our platform and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-gray-600">
              We're committed to reducing textile waste and promoting circular fashion through innovative 
              exchange mechanisms that give clothes multiple lives.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-600">
              We believe in the power of community. Our platform connects like-minded individuals who 
              share a passion for sustainable fashion and conscious consumption.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
            <p className="text-gray-600">
              Fashion should be accessible to everyone. Our point-based system and swap mechanisms 
              make quality clothing available regardless of budget constraints.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-green-50 rounded-2xl p-8 md:p-12 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together, our community is making a real difference in the fight against fast fashion and textile waste.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <div className="text-gray-600">Items Exchanged</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">25 Tons</div>
            <div className="text-gray-600">Waste Prevented</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How ReWear Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes sustainable fashion exchange simple, safe, and rewarding for everyone involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
              <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and descriptions of clothes you no longer wear. Our team reviews each listing 
                to ensure quality and authenticity.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Connect</h3>
              <p className="text-gray-600">
                Discover amazing pre-loved items from our community. Request swaps or use points to 
                redeem items you love.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Exchange</h3>
              <p className="text-gray-600">
                Coordinate with other members to complete your exchange. Earn points for successful 
                swaps and build your sustainable wardrobe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ReWear?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're more than just a clothing exchange platform - we're a movement towards sustainable fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <Award className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">
              Every item is carefully reviewed by our team to ensure it meets our quality standards 
              before being listed on the platform.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Safe Community</h3>
            <p className="text-gray-600">
              Our verified user system and community guidelines ensure a safe, respectful environment 
              for all members to exchange and connect.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <Heart className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Rewarding Experience</h3>
            <p className="text-gray-600">
              Earn points for every successful exchange, unlock special features, and enjoy the satisfaction 
              of making a positive environmental impact.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Join the Movement?</h2>
        <p className="text-xl mb-8 opacity-90">
          Start your sustainable fashion journey today and become part of our growing community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Join ReWear
          </Link>
          <Link
            to="/browse"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
          >
            Browse Items
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About