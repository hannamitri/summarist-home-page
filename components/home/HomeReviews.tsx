import Container from "../ui/Container";
import Button from "../ui/Button";
import { BsStarFill } from "react-icons/bs";

const reviews = [
  {
    name: "Hanna M.",
    body: (
      <>
        This app has been a <b>game-changer</b> for me! It's saved me so much
        time and effort in reading and comprehending books. Highly recommend it
        to all book lovers.
      </>
    ),
  },
  {
    name: "David B.",
    body: (
      <>
        I love this app! It provides <b>concise and accurate summaries</b> of
        books in a way that is easy to understand. It's also very user-friendly
        and intuitive.
      </>
    ),
  },
  {
    name: "Nathan S.",
    body: (
      <>
        This app is a great way to get the main takeaways from a book without
        having to read the entire thing.{" "}
        <b>The summaries are well-written and informative.</b> Definitely worth
        downloading.
      </>
    ),
  },
  {
    name: "Ryan R.",
    body: (
      <>
        If you're a busy person who{" "}
        <b>loves reading but doesn't have the time</b> to read every book in
        full, this app is for you! The summaries are thorough and provide a
        great overview of the book's content.
      </>
    ),
  },
];

export default function HomeReviews() {
  return (
    <section id="reviews">
      <Container>
        <div className="section__title">What our members say</div>

        <div className="reviews__wrapper">
          {reviews.map((review) => (
            <div className="review" key={review.name}>
              <div className="review__header">
                <div className="review__name">{review.name}</div>
                <div className="review__stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <BsStarFill key={index} />
                  ))}
                </div>
              </div>

              <div className="review__body">{review.body}</div>
            </div>
          ))}
        </div>

        <div className="reviews__btn--wrapper">
          <Button className="home__cta--btn">Login</Button>
        </div>
      </Container>
    </section>
  );
}