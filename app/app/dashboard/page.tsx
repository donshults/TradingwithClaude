import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🔬</span>
              <h1 className="text-xl font-bold text-white">Don's Trading Lab</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {session.user?.name}</span>
              <form
                action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/' })
                }}
              >
                <button 
                  type="submit"
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg p-8 mb-8 text-center">
            <div className="mb-4">
              <span className="text-6xl">🔬</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to Don's Trading Lab
            </h2>
            <p className="text-xl text-blue-200 mb-2">
              Real Trader. Real AI. Real Results.
            </p>
            <p className="text-blue-100 max-w-2xl mx-auto">
              This is where I experiment with AI-assisted trading strategies. Learn the exact methodologies 
              I use with Claude Desktop Projects to enhance my technical analysis and improve my trading edge.
            </p>
          </div>

          {/* Global Messages */}
          <div className="bg-gray-800 border border-yellow-600 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 text-xl mr-2">📢</span>
              <h3 className="text-yellow-400 font-semibold">Lab Updates</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Current Focus: MP Diamonds Strategy + Claude Projects Integration</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <span>New workshop materials uploaded weekly based on live trading sessions</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Workshop Card */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🎬</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">MP Diamonds + Claude Workshop</h3>
                    <p className="text-gray-400">My complete methodology for using Claude Projects with the MP Diamonds strategy</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/workshop/trading-with-claude"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Start Workshop
                  </Link>
                </div>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">💬</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Future Workshops</h3>
                    <p className="text-gray-400">Day trading, options strategies, and more AI-enhanced methodologies</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-400 bg-gray-700">
                    Coming in Phase 2
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* About the Lab */}
          <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <h4 className="text-white font-semibold mb-2">About Don's Trading Lab</h4>
            <p className="text-gray-300 text-sm">
              This is my personal laboratory where I experiment with AI-assisted trading methodologies and share 
              what actually works in live markets. All content reflects my real trading experience using 
              Claude Desktop Projects to enhance technical analysis and strategy development.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}