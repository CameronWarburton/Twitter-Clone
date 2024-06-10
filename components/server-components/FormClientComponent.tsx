"use client";

import { PostgrestError } from "@supabase/supabase-js";
import React from "react";
import { toast } from "sonner";

type FormClientComponentProps = {
  serverAction: (
    formData: FormData
  ) => Promise<
    | { error: { message: string }; data?: undefined }
    | { data: null; error: PostgrestError | null }
    | undefined
  >;
};

const FormClientComponent = ({ serverAction }: FormClientComponentProps) => {
  const handleSubmitTweet = async (data: any) => {
    try {
      const res = await serverAction(data);
      if (res?.error) {
        return toast.error(res.error.message);
      }
      toast.success("Tweet sent successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action={handleSubmitTweet as any}
      className="flex flex-col w-full h-full"
    >
      <input
        type="text"
        name="tweet"
        className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
        placeholder="What's happening?"
      />
      <div className="w-full justify-between items-center flex">
        <div></div>
        <div className="w-full max-w-[100px]">
          <button
            type="submit"
            className="rounded-full bg-twitterColor px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold"
          >
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormClientComponent;
