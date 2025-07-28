export const PageNotFound = () => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-8">
            <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h3>
            <p className="text-gray-600 mb-8">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold">
                Go to Home
            </button>   
        </div>
    )
}