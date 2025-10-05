import Blogdetails from './components/Blogdetails';
import Create from './components/Create';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/notFound';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
      font-["Poppins"]'>
        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/blogs/:id" element={<Blogdetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
