"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { openAuthModal } from "@/redux/authSlice";

type Book = {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  authorDescription: string;
  bookDescription: string;
  summary: string;
  imageLink: string;
  audioLink: string;
  averageRating: number;
  totalRating: number;
  type: string;
  subscriptionRequired: boolean;
  keyIdeas: number;
  tags: string[];
};

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);

      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    };

export default function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [book, setBook] = useState<Book | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [book]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      const { id } = await params;
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const data = await response.json();

        console.log("Book API:", data);

        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params]);

  if (loading) {
    return (
      <main className="book__container">
        <div className="book-page">
          <section className="book-page__summary">
            <div className="book-page__content">
              <div className="skeleton__line skeleton__line--long"></div>
              <div className="skeleton__line skeleton__line--short"></div>
              <div className="skeleton__line skeleton__line--thick"></div>
              <div className="skeleton__line skeleton__line--medium"></div>
            </div>{" "}
            <div className="skeleton__line skeleton__line--short"></div>
            <div className="skeleton__line skeleton__line--thick">
              <div className="skeleton__line skeleton__line--medium"></div>
              <div className="skeleton__line skeleton__line--long"></div>
              <div className="skeleton__line skeleton__line--long"></div>
            </div>
            <div className="skeleton__text-block"></div>
            <div className="skeleton__text-block"></div>
            <div className="skeleton__text-block"></div>
          </section>

          <section className="book-page__hero">
            <div className="skeleton__book-image"></div>
          </section>
        </div>
      </main>
    );
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  const handleBookAccess = () => {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }

    if (book?.subscriptionRequired) {
      router.push("/choose-plan");
      return;
    }

    router.push(`/player/${book?.id}`);
  };

  const handleAddToLibrary = async () => {
    console.log("1. handleAddToLibrary ran");

    if (!user || !book) {
      console.log("2. Missing user or book");
      return;
    }

    console.log("3. User and book exist");

    try {
      console.log("4. About to save to Firestore");

      const libraryRef = doc(db, "users", user.uid, "library", book.id);

      console.log("4.5 Library reference created:", libraryRef.path);

      await setDoc(libraryRef, {
        ...book,
      });

      console.log("5. Firestore save succeeded");
      alert("Book added to your library!");
    } catch (error) {
      console.error("6. Firestore error:", error);
    }
  };

  return (
    <main className="book__container">
      <div className="book-page">
        <section className="book-page__summary">
          <div className="book-page__content">
            <h1>{book.title}</h1>
            <p className="book-page__author">By {book.author} </p>
            <h2>{book.subTitle}</h2>

            <audio ref={audioRef} src={book.audioLink} />
            <div className="book__icons">
              <div className="book-page__rating icon__info">
                ⭐ {book.averageRating}
                <span> ({book.totalRating} ratings)</span>
              </div>
              <div className="icon__info">🎙️ Audio & Text</div>
              <div className="book__keyIdeas icon__info">
                💡 {book.keyIdeas} Key ideas
              </div>
              <div className="book__duration">🕘 {formatTime(duration)}</div>
            </div>

            <div className="book-page__buttons">
              <button type="button" onClick={handleBookAccess}>
                🕮 Read
              </button>

              <button type="button" onClick={handleBookAccess}>
                ▶︎ •၊|၊|။ Listen
              </button>
            </div>
            <button
              type="button"
              className="library__add"
              onClick={() => {
                if (!user) {
                  dispatch(openAuthModal());
                  return;
                }
                handleAddToLibrary();
              }}
            >
              𖤘 Add to My Library
            </button>

            <h3 className="book__descriptionTitle">What&apos;s it about?</h3>
            <div className="book__tags">
              {book.tags.map((tag) => (
                <span key={tag} className="book__tag">
                  {tag}
                </span>
              ))}
            </div>

            <p className="book-page__description">{book.bookDescription}</p>
          </div>

          <section className="summary__author">
            <h2>Summary</h2>
            <p>{book.summary}</p>
            <h2 className="author__sub">About the Author</h2>
            <p>{book.authorDescription}</p>
          </section>
        </section>

        <section className="book-page__hero">
          <div className="book-page__image">
            <Image
              src={book.imageLink}
              alt={book.title}
              width={300}
              height={300}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
