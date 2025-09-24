import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Blogdetails = () => {

    const { id } = useParams()
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id)
    const navigate = useNavigate();


   const handleclick = () => {
   
    const permanentIds = ['1', '2', '3'];

 
    if (permanentIds.includes(blog.id.toString())) {
        alert("This is a default blog and cannot be deleted.");
        return;
    }
    fetch('http://localhost:8000/blogs/' + blog.id, {
        method: "DELETE",
    }).then(() => {
        navigate('/');
    });
}

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Loading State */}
                {isPending && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-lg text-gray-600">Loading blog post...</p>
                    </div>
                )}

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

                {/* Blog Content */}
                {blog && (
                    <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 px-8 py-12 text-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {blog.title}
                            </h1>
                            
                            {/* Author and Date Info */}
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-blue-100">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-lg font-medium">By {blog.author}</span>
                                </div>
                                
                                {blog.publishdate && (
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span>Published on {new Date(blog.publishdate).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Blog Content */}
                        <div className="px-8 py-12">
                            {/* Blog About Section */}
                            {blog.about && (
                                <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                                    <h2 className="text-xl font-semibold text-blue-900 mb-2">About this article</h2>
                                    <p className="text-blue-800 leading-relaxed">{blog.about}</p>
                                </div>
                            )}

                            {/* Main Blog Body */}
                            <div className="prose prose-lg max-w-none">
                                <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                                    {blog.body}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                {/* Back to Home Button */}
                                <button 
                                    onClick={() => navigate('/')}
                                    className="inline-flex items-center px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </button>

                                {/* Delete Button */}
                                <button 
                                    className="inline-flex items-center px-6 py-3 text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                                    onClick={handleclick}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete Blog
                                </button>
                            </div>
                        </div>
                    </article>
                )}
            </div>
        </div>
    );
}

export default Blogdetails;