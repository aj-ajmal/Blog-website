import BlogList from "../components/BlogList";
import useFetch from "../components/useFetch";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://aj-blog.onrender.com';
  const {data:blogs , isPending , error} = useFetch(`${apiUrl}/blogs`)

  return (
    <div className="min-h-screen px-2 py-6 sm:px-4 lg:px-6">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          Welcome to{' '}
          <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
            Aj Blog
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-600">
          Discover insightful articles, stories, and thoughts shared by our community
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="max-w-md p-6 text-center border border-red-200 rounded-lg bg-red-50">
            <svg className="w-12 h-12 mx-auto mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mb-2 text-xl font-bold text-red-700">Oops! Something went wrong</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-3 text-base text-gray-600">Loading amazing content...</p>
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
            <div className="py-20 text-center">
              <div className="max-w-md p-8 mx-auto rounded-lg bg-gray-50">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mb-2 text-xl font-semibold text-gray-700">No blogs yet</h3>
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