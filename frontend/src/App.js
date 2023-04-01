import './App.css';

import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './Pages/Home'
import Login from './Auth/Login'
import Register from './Auth/Register'
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Search from './Pages/Search';
import Friendlist from './Pages/Friendlist';
import ProfilePage from './Pages/Profile';
import Chat from './Pages/Chat';


function App() {
  return (
    <Routes>
      <Route path = "/" element={<Home/>}  />
      <Route path = "/login" element={<Login/>}  />
      <Route path="/register" element={<Register />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/search/:name" element={<Search />} />
      <Route path="/friendlist" element={<Friendlist />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chat/:chatID" element={<Chat />} />
    </Routes>
  );
}

export default App;
