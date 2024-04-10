'use client';

import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  return (
    <div className='bg-off-white rounded-full w-1/2 overflow-hidden flex items-center gap-4 px-4 py-2'>
      <FiSearch className='text-xl' />
      <input
        type='search'
        name='searchbar'
        id='searchbar'
        className='outline-none bg-transparent w-full text-charcoal-grey'
        placeholder='Search Swagman'
      />
    </div>
  );
};

export default SearchBar;
