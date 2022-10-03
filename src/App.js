import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../src/pages/Home/home'
import Ayat from './pages/reading/ayat';
import NotFound from './404';

function App() {
  return (
    <div className='md:w-[640px] mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route exact path='ayat/:id' element={<Ayat />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
