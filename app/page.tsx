import { BsSearch } from "react-icons/bs";
import LeftSidebar from "./components/LeftSidebar";
import MainComponent from "./components/MainComponent";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
      <div className="max-w-screen-xl w-full h-full flex relative">
        <LeftSidebar />
        <MainComponent />
        <section className="fixed flex flex-col space-y-4 right-0">
          <div>
            <div className="relative w-fill h-full ">
              <label
                htmlFor="searchBox"
                className="absolute top-0 left-0 h-full flex items-center justify-center"
              >
                <BsSearch className="w-5 h-5 text-grey-500" />
              </label>
              <input
                id="searchBox"
                type="text"
                placeholder="Search Twitter"
                className="outline-none bg-transparent border-none w-full h-full rounded-xl py-4 px-8"
              />
            </div>
          </div>
          <div></div>
          <div></div>
        </section>
      </div>
    </div>
  );
};

export default Home;
