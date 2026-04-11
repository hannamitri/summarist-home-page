import Container from "../ui/Container";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

export default function HomeNumbers() {
  return (
    <section id="numbers">
      <Container>
        <div className="section__title">Start growing with Summarist now</div>

        <div className="numbers__wrapper">
          <div className="numbers">
            <div className="numbers__icon">
              <BiCrown />
            </div>
            <div className="numbers__title">3 Million</div>
            <div className="numbers__sub--title">Downloads on all platforms</div>
          </div>

          <div className="numbers">
            <div className="numbers__icon numbers__star--icon">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
            </div>
            <div className="numbers__title">4.5 Stars</div>
            <div className="numbers__sub--title">
              Average ratings on iOS and Google Play
            </div>
          </div>

          <div className="numbers">
            <div className="numbers__icon">
              <RiLeafLine />
            </div>
            <div className="numbers__title">97%</div>
            <div className="numbers__sub--title">
              Of Summarist members create a better reading habit
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}