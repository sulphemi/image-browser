function Card({ file }) {
  return (
    <div className="overflow-hidden rounded-xl shadow-md bg-white p-2">
      <img src={`/api/files/${encodeURIComponent(file)}`} alt={file}
        className="w-full h-80 object-cover rounded-lg transition-transform duration-200 hover:brightness-110"
      />
    </div>
  );
}

export default Card;
