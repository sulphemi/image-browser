import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import FilelistContext from "../context/FilelistContext.tsx"

function ImagePage() {
  const { files, setFiles } = useContext(FilelistContext)
  const { filename } = useParams()
  const [ metadata, setMetadata ] = useState(null);
  const sanitizedFilename = filename ? encodeURIComponent(filename) : "unknown";
  const imageIndex = parseInt(localStorage.getItem("imageIndex")) || 0

  useEffect(() => {
    fetch(`/api/files/${sanitizedFilename}/metadata`)
      .then(res => res.json())
      .then(data => setMetadata(data))
      .catch(err => console.error("Error: fetch failed", err))
  }, [ sanitizedFilename ])

  useEffect(() => {
    document.title = sanitizedFilename
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute">
        <Link to="/">
          <p className="text-white p-4 text-xl">Back</p>
        </Link>
      </div>
    
      <div className="flex w-[100%] h-screen">
        <div className="bg-gray-800 w-[80%]">
          <img src={`/api/files/${sanitizedFilename}`} alt={filename}
            className="mx-auto max-h-[100%]"/>
        </div>
        <div className="rounded-m p-8 bg-white w-[20%] break-words min-w-100 overflow-scroll">
          {metadata ? (Object.entries(metadata).map(([key, value]) => (
            <div key={key}>
              <h2 className="font-bold uppercase">{key}</h2>
              {Array.isArray(value) ? (
                <ul className="overflow-scroll max-h-100">
                  {value.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{String(value)}</p>
              )}
              <br />
            </div>
          ))) : (
            <p>No metadata available</p>
          )}

          <Link to={`../image/${files[imageIndex + 1]}`} 
            disabled={imageIndex == files.length}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ImagePage
