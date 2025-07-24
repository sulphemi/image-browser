import { useEffect, useState } from 'react'
import Card from "./components/Card.tsx"

function App() {
  const [files, setFiles] = useState([])

  useEffect(() => {
    fetch("/api/files/")
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(err => console.error("Error: Fetch failed", err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">bleh bleh bleh bleh</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer">
        {files.map((file, idx) => (
          <Card key={idx} file={file} />
       ))}
      </div>
    </div>
  )
}

export default App
