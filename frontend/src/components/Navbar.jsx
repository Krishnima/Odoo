"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Menu, X, User, LogOut, Plus, LayoutDashboard } from "lucide-react"
import VoiceAssistance from "../VoiceAssistant/VoiceAssi"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    setShowUserMenu(false)
    toast.success("Logged out successfully")
    navigate("/")
  }

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">ReWear</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/browse"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Browse Items
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Voice Assistant Button */}
              <button
                onClick={() => setShowVoiceAssistant(true)}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Voice Assistant"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>

              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  {/* Points Display */}
                  <div className="hidden sm:flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                    <span className="text-green-600 font-semibold text-sm">
                      {user?.points || 0} pts
                    </span>
                  </div>

                  {/* List Item Button */}
                  <Link
                    to="/add-item"
                    className="hidden sm:flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    List Item
                  </Link>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="hidden sm:block text-gray-700 font-medium">
                        {user?.name}
                      </span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          to="/add-item"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 sm:hidden"
                        >
                          <Plus className="w-4 h-4" />
                          List Item
                        </Link>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Login
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-700 hover:text-green-600 font-medium"
              >
                Home
              </Link>
              <Link
                to="/browse"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-700 hover:text-green-600 font-medium"
              >
                Browse Items
              </Link>
              <Link
                to="/about"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-700 hover:text-green-600 font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-700 hover:text-green-600 font-medium"
              >
                Contact
              </Link>
              {isLoggedIn && (
                <>
                  <hr />
                  <Link
                    to="/dashboard"
                    onClick={() => setShowMobileMenu(false)}
                    className="block text-gray-700 hover:text-green-600 font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-item"
                    onClick={() => setShowMobileMenu(false)}
                    className="block text-gray-700 hover:text-green-600 font-medium"
                  >
                    List Item
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Points: {user?.points || 0}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Voice Assistant Modal */}
      {showVoiceAssistant && (
        <VoiceAssistance
          popUp={showVoiceAssistant}
          closePopUp={() => setShowVoiceAssistant(false)}
        />
      )}
    </>
  )
}

export default Navbar