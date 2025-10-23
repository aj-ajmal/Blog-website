import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return ( 
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-lg rounded-b-2xl">
            <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
                        Aj Blog
                    </h1>
                    
                    {/* Desktop Menu */}
                    <div className="hidden space-x-2 md:flex">
                        <Link 
                            className="px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 rounded-xl hover:text-blue-600 hover:bg-blue-50 hover:shadow-md" 
                            to="/"
                        >
                            Home
                        </Link>
                        <Link 
                            className="px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 rounded-xl hover:text-blue-600 hover:bg-blue-50 hover:shadow-md" 
                            to="/Create"
                        >
                            New Blog
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-3 text-gray-700 transition-all duration-300 rounded-xl hover:text-blue-600 hover:bg-blue-50"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="py-4 border-t border-gray-100 md:hidden">
                        <Link 
                            className="block px-6 py-4 mx-2 text-lg font-semibold text-gray-700 transition-all duration-300 rounded-xl hover:text-blue-600 hover:bg-blue-50" 
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            className="block px-6 py-4 mx-2 mt-2 text-lg font-semibold text-gray-700 transition-all duration-300 rounded-xl hover:text-blue-600 hover:bg-blue-50" 
                            to="/Create"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            New Blog
                        </Link>
                    </div>
                )}
            </div>
        </nav>
     );
}
 
export default Navbar;