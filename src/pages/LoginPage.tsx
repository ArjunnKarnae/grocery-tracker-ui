export const LoginPage = ({handleLogin} : {handleLogin: () => void}) => {
    return( 
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to My Pantry</h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@example.com"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="********"
                        
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold">
                    Login
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{' '}
                <button  className="text-blue-600 hover:underline focus:outline-none">
                Sign Up
                </button>
            </p>
        </div>
    )
}