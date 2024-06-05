import { createServerClient } from "@supabase/ssr";
import LeftSidebar from "./components/LeftSidebar";
import MainComponent from "./components/MainComponent";
import RigthSection from "./components/RigthSection";
import { Database } from "@/lib/supabase.types";
import { headers, cookies } from "next/headers";

const Home = async () => {
  const supabase = createServerClient<Database>({
    headers,
    cookies,
  })


  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
      <div className="max-w-[70vw] w-full h-full flex relative">
        <LeftSidebar />
        <MainComponent />
        <RigthSection />
      </div>
    </div>
  );
};

export default Home;
