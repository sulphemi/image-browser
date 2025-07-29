import { Link } from "react-router-dom"

interface CardProps {
  file: string
}

function Card({ file }: CardProps) {
  return (
    <Link to={`./image/${file}`}>
      <div className="rounded-xl shadow-md bg-white p-2 cursor-pointer">
        <div className="w-full aspect-[1/1] overflow-hidden">
          <img src={`/api/files/${encodeURIComponent(file)}/thumb`} alt={file}
            className="w-full h-full object-cover rounded-lg transition-transform duration-200 hover:brightness-110"
          />
        </div>
      </div>
    </Link>
  );
}

export default Card;
