"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import SkeletonSearchLoader from "./SkeletonLoader";
import GetAudioTime from "./GetAudioTime";

export default function Search({ initialBooks = { Search: [] } }) {
  const [booksData, setBooksData] = useState(initialBooks);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const latestSearchValueRef = useRef(searchValue);

  const debounce = (func, wait) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  const searchTerm = useCallback(
    async (value) => {
      if (value.trim() === "") {
        setBooksData(initialBooks);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            value
          )}`
        );
        if (latestSearchValueRef.current === value) {
          setBooksData(response.data);
          console.log("Fetched books data:", response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooksData([]);
        setLoading(false);
      }
    },
    [initialBooks]
  );

  // wrapped debouce in a Callback to memoize it and ensure reference stays the same between renders unless searchTerm changes
  const debouncedSearchTerm = useCallback(
    debounce((value) => {
      searchTerm(value);
    }, 300),
    [searchTerm]
  );

  useEffect(() => {
    const searchElement = document.getElementById("inputSearch");
    if (searchElement) {
      const handleInput = (event) => {
        const value = event.target.value;
        latestSearchValueRef.current = value;
        setSearchValue(value);
        if (value.trim() !== "") {
          setLoading(true); // Set loading to true immediately when user types
        }
        debouncedSearchTerm(value);
      };
      searchElement.addEventListener("input", handleInput);
      return () => {
        searchElement.removeEventListener("input", handleInput);
      };
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure>
          <img src="logo" alt="" />
        </figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                id="inputSearch"
                placeholder="Search for books"
                type="text"
                value={searchValue}
                onChange={(event) => {
                  const value = event.target.value;
                  latestSearchValueRef.current = value;
                  setSearchValue(value);
                  if (value.trim() !== "") {
                    setLoading(true); // Set loading to true immediately when user types
                  }
                  debouncedSearchTerm(value);
                }}
              />
              {searchValue.length === 0 ? (
                <div className="search__icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                  </svg>
                </div>
              ) : (
                <div className="search__icon">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="search__delete--icon"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {searchValue.length > 0 && (
          <div className="search__books--wrapper">
            {loading ? (
              <SkeletonSearchLoader />
            ) : booksData.length > 0 ? (
              booksData.map((book) => (
                <a
                  key={book.id}
                  className="search__book--link"
                  href={`/book/${book.id}`}
                >
                  <figure
                    className="book__image--wrapper"
                    style={{
                      height: "80px",
                      width: "80px",
                      minWidth: "80px",
                    }}
                  >
                    <img
                      className="book__image"
                      style={{ display: "block" }}
                      src={book.imageLink}
                      alt={book.title}
                    />
                  </figure>
                  <div>
                    <div className="search__book--title">{book.title}</div>
                    <div className="search__book--author">{book.author}</div>
                    <div className="search__book--duration">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                            <path d="M13 7h-2v6h6v-2h-4z"></path>
                          </svg>
                        </div>
                        <div className="recommended__book--details-text">
                          <GetAudioTime audioLink={book.audioLink} />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p>No books found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
