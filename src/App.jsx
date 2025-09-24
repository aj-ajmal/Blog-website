import Blogdetails from './Blogdetails';
import Create from './Create';
import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './notFound';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-["Poppins"]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/blogs/:id" element={<Blogdetails />} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
