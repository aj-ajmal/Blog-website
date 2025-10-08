import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {

  return (
    <div className="mb-8">
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          {title}
        </h2>
        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 rounded-lg shadow-md group hover:shadow-lg hover:border-blue-200 hover:-translate-y-1"
          >
            <Link to={`/blogs/${blog._id}`} className="block">
              {/* Card Header with Gradient */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

              {/* Card Content */}
              <div className="p-4">
                {/* Blog Title */}
                <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-300 sm:text-xl group-hover:text-blue-600 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Blog About/Preview */}
                {blog.about && (
                  <p className="mb-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {blog.about}
                  </p>
                )}

                {/* Author Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{blog.author}</span>
                  </div>

                  {/* Publish Date */}
                  {blog.publishdate && (
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{new Date(blog.publishdate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Read More Indicator */}
                <div className="flex items-center mt-3 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  <span className="mr-2">Read more</span>
                  <svg className="w-3 h-3 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="py-8 text-center">
          <div className="max-w-sm p-6 mx-auto rounded-lg bg-gray-50">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">No blogs in this section</h3>
            <p className="text-sm text-gray-500">Check back later for new content!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogList;