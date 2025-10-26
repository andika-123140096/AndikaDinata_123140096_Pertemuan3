import PropTypes from "prop-types"

const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-[#8b949e] border-t-[#58a6ff]`}
      ></div>
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
}

export default Spinner
