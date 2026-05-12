// src/components/SearchBar.jsx
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-surface border border-border rounded-l-full px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      />
      <button type="submit" className="bg-surface-elevated border border-l-0 border-border rounded-r-full px-5 hover:bg-surface transition-colors flex items-center justify-center">
        <Search size={18} className="text-text-secondary" />
      </button>
    </form>
  );
}