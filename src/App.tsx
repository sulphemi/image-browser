import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"
import Gallery from "./pages/Gallery.tsx"
import ImagePage from "./pages/ImagePage.tsx"
import FilelistContext from "./context/FilelistContext.tsx"

function App() {
  const [ files, setFiles ] = useState([])

  useEffect(() => {
    fetch("/api/files/")
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(err => console.error("Error: Fetch failed", err))
  }, [])

  return (
    <FilelistContext.Provider value={{ files, setFiles }}>
      <Router>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/image/:filename" element={<ImagePage />} />
        </Routes>
      </Router>
    </FilelistContext.Provider>
  )
}

export default App
