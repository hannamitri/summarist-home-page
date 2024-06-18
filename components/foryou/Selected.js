"use client";
import React, { useEffect, useState } from "react";
import { SkeletonSelected } from "../SkeletonLoader";
import fetchInitialBooks from "@/lib/fetchInitialBooks";
import GetAudioTime from "../GetAudioTime";

export default function Selected() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchInitialBooks();
      setBooks(data.selected);
      setLoading(false);
      console.log(data.selected);
    };
    getBooks();
  }, []);
  return (
    <div className="selected__foryou--wrapper">
      <h2 className="foryou__title">Selected just for you</h2>
      {loading ? (
        <SkeletonSelected />
      ) : (
        books.map((book) => (
          <a className="selected__book" key={book.id} href={`/book/${book.id}`}>
            <div className="selected__book--subtitle">{book.subTitle}</div>

            <div className="selected__book--line"></div>
            <div className="selected__book--content">
              <figure className="book__image--wrapper">
                <img className="book__image" src={book.imageLink}></img>
              </figure>
              <div className="selected__book--text">
                <div className="selected__book--title">{book.title}</div>
                <div className="selected__book--author">{book.author}</div>
                <div className="selected__book--duration-wrapper">
                  <div className="selected__book--icon">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                    </svg>
                  </div>
                  <div className="selected__book--duration">
                    <GetAudioTime audioLink={book.audioLink} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))
      )}
    </div>
  );
}
