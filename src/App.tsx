import { useEffect, useState } from 'react'

function App() {
  const [files, setFiles] = useState([])

  useEffect(() => {
    fetch('/api/files/')
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(err => console.error("Error: Fetch failed", err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">bleh bleh bleh bleh</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer">
        {files.map((file, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl shadow-md bg-white p-2">
            <img src={`/api/files/${encodeURIComponent(file)}`} alt={file}
              className="w-full h-80 object-cover rounded-lg transition-transform duration-200 hover:brightness-110"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
