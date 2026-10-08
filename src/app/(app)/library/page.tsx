"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type Book = {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  subTitle: string;
  averageRating: number;
};

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        return;
      }

      try {
        const libraryRef = collection(db, "users", currentUser.uid, "library");
        const finishedBooksRef = collection(
          db,
          "users",
          currentUser.uid,
          "finishedBooks",
        );

        const snapshot = await getDocs(libraryRef);
        const finishedSnapshot = await getDocs(finishedBooksRef);

        const savedBooks = snapshot.docs.map((doc) => doc.data() as Book);
        const finishedBooks = finishedSnapshot.docs.map(
          (doc) => doc.data() as Book,
        );

        setBooks(savedBooks);
        setFinishedBooks(finishedBooks);
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="library-page">
      <section className="library-section">
        <h2>Saved Books </h2>
        <div className="book__count">{books.length} items</div>
        {books.length === 0 ? (
          <p>You haven&apos;t saved any books yet.</p>
        ) : (
          <div className="library-books">
            {books.map((book) => (
              <div
                key={book.id}
                className="library-book book-image"
                onClick={() => {
                  router.push(`/book/${book.id}`);
                }}
              >
                <Image
                  src={book.imageLink}
                  alt={book.title}
                  width={180}
                  height={270}
                />

                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.subTitle}</p>
                <p>⭐ {book.averageRating}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="library-section">
        <h2>Finished Books</h2>
        <div className="book__count">{finishedBooks.length} items</div>
        {finishedBooks.length === 0 ? (
          <p>You haven&apos;t finished any books yet.</p>
        ) : (
          <div className="library-books">
            {finishedBooks.map((book) => (
              <div
                key={book.id}
                className="library-book book-image"
                onClick={() => {
                  router.push(`/book/${book.id}`);
                }}
              >
                <Image
                  src={book.imageLink}
                  alt={book.title}
                  width={180}
                  height={270}
                />

                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.subTitle}</p>
                <p>⭐ {book.averageRating}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
