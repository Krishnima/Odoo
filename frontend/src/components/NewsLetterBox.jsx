import { useState } from "react"
import { toast, Toaster } from "sonner"

const NewsLetterBox = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email")
      return
    }

    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Thank you for subscribing!")
      setEmail("")
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-center">
      {/* Sonner’s toaster; you can lift this into your root layout if you prefer */}
      

      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 10% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter your email"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-800 text-white py-2 px-4 disabled:opacity-50"
        >
          {loading ? "..." : "Subscribe"}
        </button>
      </form>
    </div>
  )
}

export default NewsLetterBox
