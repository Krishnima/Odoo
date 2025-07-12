"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchTerm.trim())}`)
      setShowSearch(false)
    }
  }

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center py-5 gap-3">
        <p className="text-gray-500">
          <span className="text-gray-700 font-medium">SEARCH</span> FOR ITEMS
        </p>
        <div className="border border-gray-400 px-5 py-2 rounded-full w-3/4 sm:w-1/2">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none bg-inherit text-sm"
              type="text"
              placeholder="Search for clothing items..."
            />
            <button type="submit">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
