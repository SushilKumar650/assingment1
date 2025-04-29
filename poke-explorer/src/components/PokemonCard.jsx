function PokemonCard({ pokemon }) {
    return (
      <div className="bg-white shadow-md rounded p-4 text-center">
        <img src={pokemon.image} alt={pokemon.name} className="mx-auto h-24" />
        <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
        <p>ID: {pokemon.id}</p>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span key={type} className="bg-pink-200 px-2 py-1 rounded text-xs capitalize">
              {type}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  export default PokemonCard;
  