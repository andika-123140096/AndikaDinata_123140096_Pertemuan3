import PropTypes from "prop-types"

const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div
      className="bg-[#f85149] border-l-4 border-[#f85149] text-[#0d1117] px-6 py-4 rounded-lg shadow-lg"
      role="alert"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl"></span>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onRetry && (
          <div className="ml-4">
            <button
              onClick={onRetry}
              className="bg-[#f85149] hover:bg-[#da3633] text-[#0d1117] font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
}

export default ErrorAlert
