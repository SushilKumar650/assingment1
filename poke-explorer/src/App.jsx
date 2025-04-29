import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import SearchFilter from './components/SearchFilter';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [typesList, setTypesList] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = res.data.results;

        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const pokeDetails = await axios.get(pokemon.url);
            return {
              id: pokeDetails.data.id,
              name: pokeDetails.data.name,
              image: pokeDetails.data.sprites.front_default,
              types: pokeDetails.data.types.map((t) => t.type.name),
            };
          })
        );

        setPokemons(pokemonData);

        
        const allTypes = new Set(pokemonData.flatMap((p) => p.types));
        setTypesList([...allTypes]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon');
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
    return matchesName && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        typesList={typesList}
      />
      {loading ? (
        <div className="text-center mt-10 text-xl">Loading...</div>
      ) : error ? (
        <div className="text-center mt-10 text-red-500 text-xl">{error}</div>
      ) : filteredPokemons.length === 0 ? (
        <div className="text-center mt-10 text-gray-500 text-xl">No Pokémon found!</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
