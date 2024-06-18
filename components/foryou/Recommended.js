"use client";
import React, { useEffect, useState } from "react";
import fetchInitialBooks from "@/lib/fetchInitialBooks";
import { SkeletonBook } from "../SkeletonLoader";
import GetAudioTime from "../GetAudioTime";

export default function Recommended() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchInitialBooks();
      setBooks(data.recommended);
      setLoading(false);
    };
    getBooks();
  }, []);
  return (
    <>
      <div className="foryou__title">Recommended For You</div>
      <div className="foryou__subtitle">We think you'll like these</div>
      <div className="foryou__recommended--books">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBook key={index} />
            ))
          : books.map((book) => (
              <a
                key={book.id}
                className="foryou__recommended--books-link"
                href={`/book/${book.id}`}
              >
                {book.subscriptionRequired && (
                  <div className="book__pill book__pill--subscription-required">
                    Premium
                  </div>
                )}
                <figure className="book__image--wrapper">
                  <img
                    className="book__image"
                    src={`${book.imageLink}`}
                    alt="book"
                  />
                </figure>
                <div className="recommended__book--title">{book.title}</div>
                <div className="recommended__book--author">{book.author}</div>
                <div className="recommended__book--subtitle">
                  {book.subTitle}
                </div>
                <div className="recommended__book--details-wrapper">
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
                  <div className="recommended__book--details">
                    <div className="recommended__book--details-icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                      </svg>
                    </div>
                    <div className="recommended__book--details-text">
                      {book.averageRating}
                    </div>
                  </div>
                </div>
              </a>
            ))}
      </div>
    </>
  );
}
