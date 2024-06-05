import LeftSidebar from "../components/LeftSidebar";
import MainComponent from "../components/MainComponent";
import RigthSection from "../components/RigthSection";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase.types";
import { cookies } from "next/headers";

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data, error } = await supabase.auth.getUser();

  console.log({ data, error });

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
