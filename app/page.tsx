import "../styles/home.css";
import HomeNavbar from "../components/home/HomeNavbar";
import HomeHero from "../components/home/HomeHero";
import HomeFeatures from "../components/home/HomeFeatures";
import HomeStatistics from "../components/home/HomeStatistics";
import HomeReviews from "../components/home/HomeReviews";
import HomeNumbers from "../components/home/HomeNumbers";
import HomeFooter from "../components/home/HomeFooter";

export default function Home() {
  return (
    <>
      <HomeNavbar />
      <HomeHero />
      <HomeFeatures />
      <HomeStatistics />
      <HomeReviews />
      <HomeNumbers />
      <HomeFooter />
    </>
  );
}