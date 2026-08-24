
import { Routes, Route } from 'react-router'
import Home from './routes/Home'
import About from './routes/About'
import Navbar from './components/Navbar' 

function App() {
  return (
    <>
     <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App