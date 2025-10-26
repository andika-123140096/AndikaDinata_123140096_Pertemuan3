import { Link } from "react-router-dom"
import { useEffect } from "react"

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found"
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117]">
      <div className="text-center">
        <div className="text-8xl mb-6"></div>
        <h1 className="text-6xl font-bold text-[#f0f6fc] mb-4">404</h1>
        <p className="text-2xl text-[#c9d1d9] mb-8">Oops! Page not found</p>
        <p className="text-lg text-[#8b949e] mb-12 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back to
          shopping!
        </p>
        <Link
          to="/"
          className="inline-block bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
