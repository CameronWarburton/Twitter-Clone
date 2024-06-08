import LeftSidebar from "../components/LeftSidebar";
import MainComponent from "../components/MainComponent";
import RigthSection from "../components/RigthSection";

const Home = async () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
      <div className="xl:max-w-[70vw] w-full h-full flex relative">
        <LeftSidebar />
        <MainComponent />
        <RigthSection />
      </div>
    </div>
  );
};

export default Home;
