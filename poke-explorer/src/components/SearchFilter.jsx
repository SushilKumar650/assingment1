function SearchFilter({ searchTerm, setSearchTerm, selectedType, setSelectedType, typesList }) {
    return (
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="">All Types</option>
          {typesList.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default SearchFilter;
  