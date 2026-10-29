import { Routes, Route } from 'react-router-dom'
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage.jsx"
import Navbar from './components/Navbar.jsx';
import SignUp from './pages/SignUp.jsx';
import { useState } from 'react';




function App() {

  return (
    <div className="app-shell">
      <main className="app-main">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </main>
      <Footer />

    </div>
  )
}

export default App;

