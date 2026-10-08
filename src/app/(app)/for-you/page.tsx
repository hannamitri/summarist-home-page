"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { openAuthModal } from "@/redux/authSlice";
import { useDispatch } from "react-redux";

type Book = {
  id: string;
  title: string;
  author: string;
  authorDescription: string;
  imageLink: string;
  subTitle: string;
  bookDescription: string;
  averageRating: number;
  totalRating: number;
  keyIdeas: number;
  status: string;
  subscriptionRequired: boolean;
  type: string;
  audioLink: string;
  tags: string[];
  summary: string;
};

export default function ForYouPage() {
   const router = useRouter();
const dispatch = useDispatch();

const [selectedBook, setSelectedBook] = useState<Book | null>(null);
const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

  useEffect(() => {
    const fetchSelectedBook = async () => {
      try {

const response = await fetch(
  "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
);

if (!response.ok) {
  throw new Error("Failed to fetch selected book");
}

const data = await response.json();

console.log("Selected book API:", JSON.stringify(data, null, 2));

setSelectedBook(data[0]);
      } catch (error) {
        console.error("Error fetching selected book:", error);
      }
    };
    
const fetchRecommendedBooks = async () => {
  try {

    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommended books");
    }

    const data = await response.json();

    console.log("Recommended books API:", data);

    setRecommendedBooks(data);
  } catch (error) {
    console.error("Error fetching recommended books:", error);
  }
};

const fetchSuggestedBooks = async () => {
  try {
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch suggested books");
    }

    const data = await response.json();

    console.log("Suggested books API:", data);

    setSuggestedBooks(data);
  } catch (error) {
    console.error("Error fetching suggested books:", error);
  }
};

Promise.all([
  fetchSelectedBook(),
  fetchRecommendedBooks(),
  fetchSuggestedBooks(),
]).finally(() => {
  setLoading(false);
});
 }, []);


   const handleBookAccess = () => {
  if (!user) {
    dispatch(openAuthModal());
    return;
  }

  if (selectedBook?.subscriptionRequired) {
    router.push("/choose-plan");
    return;
  }

  router.push(`/player/${selectedBook?.id}`);
};

  return (
    <main>
   <h1 className="selected-heading">Selected Just for you</h1>   
{loading ? (
  <div className="selected-book__skeleton"></div>
) : (
  selectedBook && (
  
<section
  className="selected-book"
  onClick={() => {
    router.push(`/book/${selectedBook.id}`);
  }}
>
  <div className="selected-book__description">
    <p>{selectedBook.subTitle}</p>
  </div>

  <div className="selected-book__image">
    <Image
      src={selectedBook.imageLink}
      alt={selectedBook.title}
      width={120}
      height={180}
    />
  </div>

  <div className="selected-book__content">
    <h2>{selectedBook.title}</h2>

    <p className="selected-book__author">
      {selectedBook.author}
    </p>
<div>
    <button
      type="button"
      className="selected-book__play"
      onClick={handleBookAccess}
      aria-label={`Play ${selectedBook.title}`}
    >
      ▶
    </button>

    <span className="selected-book__duration">
      3 mins 23 secs
    </span>
</div>

  </div>
</section>
  )
)}

<section className="recommended-books">
<h2>Recommended For You</h2>
<p className="recommended-books__subtitle">
  We think you&apos;ll like these
</p>

  <div
  className={
    loading
      ? "recommended-books__list recommended-books__list--loading"
      : "recommended-books__list"
  }
>
  {loading
    ? Array.from({ length: 6 }).map((_, index) => (
     <div
  key={index}
  className="recommended-book__skeleton"
>
  <div className="skeleton__image"></div>
  <div className="skeleton__line skeleton__line--long"></div>
  <div className="skeleton__line skeleton__line--medium"></div>
  <div className="skeleton__line skeleton__line--short"></div>
</div>
      ))
    : recommendedBooks.map((book) => (

<div
  key={book.id}
  className="recommended-book"
  onClick={() => {
    router.push(`/book/${book.id}`);
  }}
> 

  <div className="recommended-book__image book-image">
    <Image
      src={book.imageLink}
      alt={book.title}
        width={180}
  height={270}

    />
{book.subscriptionRequired && (
      <span className="book-pill">Premium</span>
    )}
   
  </div>

  <h3>{book.title}</h3>
  <p >{book.author}</p>
 <p className="book-subtitle">{book.subTitle}</p>
  <p>☆{book.averageRating}</p>
</div>
    ))}
  </div>

</section>
<section className="suggested-books">
  <h2>Suggested Books</h2>
<div
  className={
    loading
      ? "suggested-books__list suggested-books__list--loading"
      : "suggested-books__list"
  }
>
    {loading
  ? Array.from({ length: 6 }).map((_, index) => (
    <div
  key={index}
  className="suggested-book__skeleton"
>
  <div className="skeleton__image"></div>
  <div className="skeleton__line skeleton__line--long"></div>
  <div className="skeleton__line skeleton__line--medium"></div>
  <div className="skeleton__line skeleton__line--short"></div>
</div>
    ))
  : suggestedBooks.map((book) => (
      <div
        key={book.id}
        className="suggested-book"
        onClick={() => {
          router.push(`/book/${book.id}`);
        }}
      >
<div className="suggested-book__image book-image">
  <Image
    src={book.imageLink}
    alt={book.title}
     width={180}
  height={270}

  />

  {book.subscriptionRequired && (
    <span className="book-pill">Premium</span>
  )}
</div>
         <h3>{book.title}</h3>
  <p>{book.author}</p>
  <p className="book-subtitle">{book.subTitle}</p>
  <p>☆{book.averageRating}</p>
      </div>
    ))}
  </div>
</section>

    </main>
  );
}