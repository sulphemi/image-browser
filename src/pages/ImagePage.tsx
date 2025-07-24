import { useParams } from 'react-router-dom'

function ImagePage() {
  const { filename } = useParams()

  return (
    <div>
      <img src={`/api/files/${encodeURIComponent(filename)}`} alt={filename} />
    </div>
  )
}

export default ImagePage
