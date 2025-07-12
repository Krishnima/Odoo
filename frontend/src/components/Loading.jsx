const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  )
}

export default Loading
