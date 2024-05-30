import { BsSearch } from "react-icons/bs";
import LeftSidebar from "./components/LeftSidebar";
import MainComponent from "./components/MainComponent";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
      <div className="max-w-[70vw] w-full h-full flex relative">
        <LeftSidebar />
        <MainComponent />
        <section className="w-full mt-2 flex flex-col items-stretch h-screen px-6">
          <div className="sticky top-2 ">
            <div className="relative w-full h-full group">
              <input
                id="searchBox"
                type="text"
                placeholder="Search Twitter"
                className="outline-none peer focus:border-primary focus:border bg-neutral-900/90 w-full h-full rounded-xl py-4 pl-14 pr-4"
              />
              <label
                htmlFor="searchBox"
                className="absolute top-0 left-0 h-full flex items-center justify-center p-4 text-gray-500 peer-focus:text-primary"
              >
                <BsSearch className="w-5 h-5" />
              </label>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
            <h3 className="font-bold text-xl my-2 px-4">What's happening</h3>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="hover:bg-white/10 p-4 last:rounded-b-xl transition duration-200">
                  <div className="font-bold text-lg">#trending ${i + 1}</div>
                  <div className="text-xs text-neutral-400">35.4k</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
            <h3 className="font-bold text-xl my-2 px-4">Who to follow</h3>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="hover:bg-white/10 p-4 last:rounded-b-xl transition duration-200">
                  <div className="font-bold text-lg">#trending ${i + 1}</div>
                  <div className="text-xs text-neutral-400">35.4k</div>
                </div>
              ))}
            </div>
          </div>
          </div>
          <div></div>
        </section>
      </div>
    </div>
  );
};

export default Home;
