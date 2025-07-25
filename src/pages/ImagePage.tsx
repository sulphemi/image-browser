import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ImagePage() {
  const { filename } = useParams()
  const [ metadata, setMetadata ] = useState(null);
  const sanitizedFilename = encodeURIComponent(filename);

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
      <div className="flex w-[100%] h-screen">
        <div className="bg-black w-[80%]">
          <img src={`/api/files/${sanitizedFilename}`} alt={filename}
            className="mx-auto max-h-[100%]"/>
        </div>
        <div className="rounded-m p-8 bg-white w-[20%] break-words min-w-100">
          <p className="">{JSON.stringify(metadata)}</p>
        </div>
      </div>
    </div>
  )
}

export default ImagePage
