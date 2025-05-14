export default function MemoryCard({ gif, onClick }) {
  return (
    <div className="bg-gray-200 p-2">
      <img
        src={gif.images.fixed_height.url}
        alt={gif.title}
        className="w-full h-48 object-cover"
        onClick={() => onClick(gif)} // Call the onClick function passed from the parent to shuffle the cards
      />
    </div>
  );
}
