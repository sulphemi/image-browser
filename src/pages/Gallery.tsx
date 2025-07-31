import { useEffect, useState, useContext } from 'react'
import Card from "../components/Card.tsx"
import FilelistContext from "../context/FilelistContext.tsx"

function Gallery() {
  const { files } = useContext(FilelistContext)
  const savedPage = sessionStorage.getItem("returnTo")
  const initialPage = savedPage ? parseInt(savedPage) : 1
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const itemsPerPage = 10

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentFiles = files ? files.slice(startIndex, startIndex + itemsPerPage) : []

  useEffect(() => {
    document.title = "Gallery"
  })

  useEffect(() => {
    sessionStorage.setItem("returnTo", String(currentPage))
  }, [currentPage])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">bleh bleh bleh bleh</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentFiles.map((file, idx) => (
          <Card key={idx} file={file} index={itemsPerPage * (currentPage - 1) + idx} />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-white rounded shadow disabled:opacity-50"
        >
          Prev
        </button>
        <p className="text-center text-sm m-1">Page {currentPage} of {Math.ceil(files.length / itemsPerPage)}</p>
        <button
          onClick={() =>
            setCurrentPage(p => (p * itemsPerPage < files.length ? p + 1 : p))
          }
          disabled={currentPage * itemsPerPage >= files.length}
          className="px-3 py-1 bg-white rounded shadow disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Gallery
