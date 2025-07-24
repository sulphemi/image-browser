import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from "./pages/Gallery.tsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default App
