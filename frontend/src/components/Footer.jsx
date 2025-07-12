import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <div className="text-2xl font-bold text-green-600 mb-5">ReWear</div>
          <p className="w-full md:w-2/3 text-gray-600">
            ReWear is a community-driven platform that promotes sustainable fashion through clothing exchange. Join us
            in reducing textile waste while refreshing your wardrobe with pre-loved items.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/browse">Browse Items</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@rewear.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024@ rewear.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
