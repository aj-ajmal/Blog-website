import Blogdetails from './components/Blogdetails';
import Create from './components/Create';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import EditBlog from './components/EditBlog';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
      font-["Poppins"]'>
        <div className='px-3 mx-auto max-w-6xl sm:px-4 lg:px-6'>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/blogs/:id" element={<Blogdetails />} />
              <Route path="/edit/:id" element={<EditBlog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
