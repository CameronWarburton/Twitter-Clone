import Link from "next/link";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import {
  BsBell,
  BsBookmark,
  BsTwitter,
  BsEnvelope,
  BsThreeDots,
} from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import LeftSidebar from "./components/LeftSidebar";

const NAVIGATION_ITEMS = [
  {
    title: "Twitter",
    icon: BsTwitter,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  {
    title: "Message",
    icon: BsEnvelope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
];

export const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative">
        {/* left sidebar for navigation */}
       <LeftSidebar/>
        {/* <main>home timeline</main> */}
        {/* <section>right section</section> */}
      </div>
    </div>
  );
};

export default Home;
