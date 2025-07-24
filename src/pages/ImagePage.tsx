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

  return (
    <div>
      <img src={`/api/files/${sanitizedFilename}`} alt={filename} />
      <p>{JSON.stringify(metadata)}</p>
    </div>
  )
}

export default ImagePage
