import { Routes, Route } from 'react-router-dom'
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage.jsx"


function App() {
  return (
    <div className="app-shell">
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
         
        </Routes>
      </main>
     <Footer/>
    </div>
  )
}

export default App