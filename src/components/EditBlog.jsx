// src/components/EditBlog.jsx

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const EditBlog = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://aj-blog.onrender.com';
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. Fetch the existing blog data
    const { data: blog, isPending: isLoadingBlog, error } = useFetch(`${apiUrl}/blogs/${id}`);

    // 2. Set up state for form fields
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [about, setAbout] = useState('');

    // State for the update operation
    const [isUpdating, setIsUpdating] = useState(false);

    // 3. Populate form fields when blog data loads
    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
            setAbout(blog.about || ''); // Set to empty string if 'about' is null/undefined
        }
    }, [blog]); // This effect runs whenever 'blog' data changes

    // 4. Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the updated blog object
        // We only send the fields that can be edited
        const updatedBlog = { title, body, author, about };

        setIsUpdating(true); // Show loading state on button

        fetch(`${apiUrl}/blogs/${id}`, {
            method: 'PATCH', // Use PATCH for partial updates
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBlog)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update blog');
            }
            return res.json();
        })
        .then(() => {
            setIsUpdating(false);
            // 5. Navigate back to the blog details page on success
            navigate(`/blogs/${id}`);
        })
        .catch(err => {
            setIsUpdating(false);
            alert(err.message);
        });
    };

    // Show loading spinner while fetching blog data
    if (isLoadingBlog) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-lg text-gray-600">Loading blog post to edit...</p>
            </div>
        );
    }

    // Show error if fetching failed
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    // 6. Render the form
    // (This form is based on your Create.jsx, assuming its structure)
    return (
        <div className="max-w-3xl p-6 mx-auto my-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
                Edit Blog Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Blog Title
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Blog "About" (Short Summary)
                    </label>
                    <input
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Blog Body
                    </label>
                    <textarea
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Blog Author
                    </label>
                    <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="w-full px-6 py-3 font-medium text-white transition-all duration-30Both bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                    >
                        {isUpdating ? 'Updating...' : 'Update Blog Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;