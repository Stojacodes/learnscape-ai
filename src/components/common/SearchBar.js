import React, { useState } from 'react';
import styled from '@emotion/styled';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 60%; // Set to the desired percentage of the parent container
  min-width: 600px; // Ensures that it has a larger initial width
  margin: auto; // Center the search bar
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 1rem;
  border: none;
  border-radius: 25px 0 0 25px;
  font-size: 1rem;
  color: var(--greyscale-grey-5);
  &::placeholder {
    color: var(--greyscale-grey-5);
  }
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0 25px 25px 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #007bff;
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="e.g. The French Revolution, Skateboarding, Fermat's Last Theorem..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <SearchButton onClick={handleSearch}>Create Course</SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;



