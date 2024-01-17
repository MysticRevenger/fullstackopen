import React from "react";

const Search = ({searchQuery, handleSearch}) => {
  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name"
      />
    </div>
  );
};

export default Search;
