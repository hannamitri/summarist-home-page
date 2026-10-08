"use client";

import { useEffect, useRef, useState } from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchNavbar({ onMenuClick, menuOpen }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(true);

  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setShowSearchResults(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      return;
    }

    const fetchBooks = async () => {
      try {
        setResults([]);
        setLoading(true);

        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            debouncedSearch,
          )}`,
        );

        const data = await response.json();

        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search__Navbar">
      <div className="search__books" ref={searchRef}>
        <div className="search__input-wrapper">
          <input
            type="text"
            className="search__input"
            placeholder="Search for books"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="search__button">
            <FiSearch />
          </button>
        </div>
        {search.trim() && loading && (
          <div className="results__wrapper">
            <div className="search__skeleton">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="skeleton__shadowBox"></div>
              ))}
            </div>
          </div>
        )}

        {search.trim() && !loading && results.length > 0 && (
          <div className="results__wrapper">
            <div className="search__results">
              {results.map((book) => (
                <div
                  key={book.id}
                  className="search__result"
                  onClick={() => {
                    setResults([]);
                    router.push(`/book/${book.id}`);
                    setSearch("");
                  }}
                >
                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={64}
                    height={96}
                  />

                  <div className="search__bookInfo">
                    <h3 className="book__title">{book.title}</h3>
                    <p className="searchBook__author">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {search.trim() &&
          showSearchResults &&
          !loading &&
          results.length === 0 &&
          debouncedSearch && <div className="no__results">No books found</div>}
      </div>
<button
  type="button"
  className="search__menu"
  onClick={onMenuClick}
  aria-label={menuOpen ? "Close menu" : "Open menu"}
>
  {menuOpen ? "✖" : <FiMenu />}
</button>
    </div>
  );
}
