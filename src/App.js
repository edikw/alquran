import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../src/pages/Home/home'
import Ayat from './pages/reading/ayat';
import Juz from './pages/reading/juz';
import Jadwal from './pages/jadwal/jadwal-sholat';
import NotFound from './404';

function App() {
  return (
    <div className='md:w-[640px] mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route exact path='ayat/:id' element={<Ayat />} />
          <Route exact path='juz/:id' element={<Juz />} />
          <Route exact path='jadwal-sholat' element={<Jadwal />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
