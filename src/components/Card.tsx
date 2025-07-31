import { Link } from "react-router-dom"

interface CardProps {
  index: number
  file: string
}

function Card({ index, file }: CardProps) {
  return (
    <Link to={`./image/${file}`}
      onClick={ () => {localStorage.setItem("imageIndex", index.toString())}}
    >
      <div className="rounded-xl shadow-md bg-white p-2 cursor-pointer hover:scale-105 transition-transform duration-200">
        <div className="w-full aspect-[1/1] overflow-hidden">
          <img src={`/api/files/${encodeURIComponent(file)}/thumb`} alt={file}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </Link>
  );
}

export default Card;
