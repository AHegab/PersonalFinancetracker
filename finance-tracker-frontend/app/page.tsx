export default function HomePage() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-blue-500 text-white">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to the Personal Finance Tracker</h1>
              <p className="text-lg text-gray-600 mb-6">
                  Track your expenses, analyze your spending, and stay financially healthy!
              </p>
              <div className="flex justify-center space-x-4">
                  <a href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                      Login
                  </a>
                  <a href="/auth/register" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                      Register
                  </a>
              </div>
          </div>
      </div>
  );
}