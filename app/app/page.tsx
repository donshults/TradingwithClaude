import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-6xl">🔬</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Don's Trading Lab
          </h1>
          <p className="text-lg font-medium text-blue-400 mb-4">
            Real Trader. Real AI. Real Results.
          </p>
          <p className="text-gray-400 mb-8">
            Where I experiment with AI-assisted trading strategies using Claude Desktop Projects to enhance my trading edge.
          </p>
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors block text-center"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors block text-center"
            >
              Register with Invite Code
            </Link>
          </div>
          <div className="mt-8 p-4 bg-gray-800 rounded-lg text-sm text-gray-300">
            <p className="font-semibold mb-2">About Don's Trading Lab:</p>
            <p>
              My personal laboratory where I share the exact AI methodologies I use in my trading. 
              Learn from real experience, not theory.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}