import { Link } from "react-router-dom"

const ItemCard = ({ item }) => {
  return (
    <Link to={`/items/${item._id}`} className="text-gray-700 cursor-pointer hover:scale-105 transition-transform">
      <div className="overflow-hidden rounded-lg bg-gray-100">
        <img
          className="hover:scale-110 transition ease-in-out w-full aspect-square object-cover"
          src={item.images?.[0] || "/placeholder.svg?height=300&width=300"}
          alt={item.title}
        />
      </div>
      <div className="pt-3 pb-1">
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-sm text-gray-600">
          {item.condition} • Size {item.size}
        </p>
        <p className="text-sm font-medium text-green-600">{item.points_value} points</p>
        <p className="text-xs text-gray-500">by {item.uploader_name}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags?.slice(0, 2).map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default ItemCard
