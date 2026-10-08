import { BiCrown } from "react-icons/bi";
import { BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

export default function Numbers() {
  return (
    <section id="numbers">
      <div className="container">
        <div className="row">
          <div className="numbers__wrapper">
            <div className="numbers">
              <div className="numbers__icon">
                <BiCrown />
              </div>

              <div className="numbers__title">
                3 Million
              </div>

              <div className="numbers__sub--title">
                Downloads on all platforms
              </div>
            </div>

            <div className="numbers">
              <div className="numbers__icon numbers__star--icon">
                <BsStarHalf />
              </div>

              <div className="numbers__title">
                4.5 Stars
              </div>

              <div className="numbers__sub--title">
                Average ratings on iOS and Android
              </div>
            </div>

            <div className="numbers">
              <div className="numbers__icon">
                <RiLeafLine />
              </div>

              <div className="numbers__title">
                97%
              </div>

              <div className="numbers__sub--title">
                Of our users create a better reading habit
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}