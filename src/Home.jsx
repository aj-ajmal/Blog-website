import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
   
  const {data:blogs , isPending , error} = useFetch('http://localhost:8000/blogs')

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Aj Blog
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insightful articles, stories, and thoughts shared by our community
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-red-700 mb-2">Oops! Something went wrong</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg text-gray-600">Loading amazing content...</p>
        </div>
      )}

      {/* Blog Content */}
      {blogs && (
        <div className="space-y-12">
          {blogs.filter((blog) => blog.default === 'comman').length > 0 && (
            <div>
              <BlogList 
                blogs={blogs.filter((blog) => blog.default === 'comman')} 
                title="Featured Articles" 
              />
            </div>
          )}
          
          {blogs.filter((blog) => blog.default !== 'comman').length > 0 && (
            <div>
              <BlogList 
                blogs={blogs.filter((blog) => blog.default !== 'comman')} 
                title="Community Stories" 
              />
            </div>
          )}

          {blogs.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs yet</h3>
                <p className="text-gray-500">Be the first to share your story!</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;