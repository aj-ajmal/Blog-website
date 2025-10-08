import { useState } from "react";
import { data, useNavigate } from "react-router-dom";

const Create = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://aj-blog.onrender.com';
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()



  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.length <= 250) {
      setError("Blog content must be more than 250 characters.")
      return;
    }
    setError('')
    const publishdate = new Date()
    const blog = { title, body, author, publishdate }


    fetch(`${apiUrl}/blogs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      navigate('/')
    })
  }

  return (
    <div className="min-h-screen px-2 py-6 sm:px-4 lg:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Create New{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
              Blog Post
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-gray-600">
            Share your thoughts, stories, and insights with the world
          </p>
        </div>

        {/* Form Container */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-lg rounded-xl">
          {/* Form Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
            <h2 className="flex items-center text-xl font-bold text-white">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Write Your Story
            </h2>
          </div>

          {/* Form Content */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            {/* Blog Title */}
            <div>
              <label htmlFor="blog-title" className="block mb-2 text-base font-semibold text-gray-800">
                Blog Title
              </label>
              <input
                id="blog-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-3 text-base transition-all duration-300 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter an engaging title for your blog..."
              />
            </div>

            {/* Blog Author */}
            <div>
              <label htmlFor="blog-author" className="block mb-2 text-base font-semibold text-gray-800">
                Author Name
              </label>
              <input
                id="blog-author"
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-3 text-base transition-all duration-300 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Your name..."
              />
            </div>

            {/* Blog Body */}
            <div>
              <label htmlFor="blog-body" className="block mb-2 text-base font-semibold text-gray-800">
                Blog Content (more than 250 Characters)
              </label><p className={`ml-auto font-medium text-sm ${body.length > 250 ? 'text-green-600' : 'text-gray-500'}`}>
                {body.length} Characters
              </p>

              <textarea
                id="blog-body"
                rows="10"
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-3 py-3 text-base transition-all duration-300 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Start writing your amazing content here... Share your thoughts, experiences, and insights..."
              ></textarea>

              <div className="flex justify-between mt-2 text-sm">
                {/* Display Error Message */}
                {error && <p className="font-semibold text-red-500">{error}</p>}
              </div>

              <div className="mt-2 text-sm text-gray-500">
                Tip: Write from your heart and share what matters to you!
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 text-base font-semibold text-white transition-all duration-300 transform rounded-lg shadow-md sm:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-200 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Publish Blog
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="p-5 mt-8 border border-blue-100 rounded-lg bg-blue-50">
          <h3 className="mb-3 text-base font-semibold text-blue-900">Writing Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Use a compelling title that grabs attention
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Share personal experiences and insights
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Keep your content engaging and easy to read
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Create;
