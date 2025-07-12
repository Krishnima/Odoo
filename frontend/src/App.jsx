import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ItemDetail from "./pages/ItemDetail"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AddItem from "./pages/AddItem"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"

// Admin components
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminItems from "./pages/admin/AdminItems"
// import AdminUsers from "./pages/admin/AdminUsers"
// import AdminSwaps from "./pages/admin/AdminSwaps"
// import AdminLayout from "./components/AdminLayout"

// Sonner toaster
import { Toaster } from "sonner"

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Sonner toast container */}
      <Toaster position="bottom-right" richColors />

      <Routes>
        {/* Admin Routes */}
        

        {/* Regular Routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <SearchBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/items/:itemId" element={<ItemDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-item" element={<AddItem />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
