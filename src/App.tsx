import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from "./pages/Gallery.tsx"
import ImagePage from "./pages/ImagePage.tsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/image/:filename" element={<ImagePage />} />
      </Routes>
    </Router>
  )
}

export default App
