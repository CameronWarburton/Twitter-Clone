"use client";

import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";
import { TweetType, likeTweet } from "@/lib/supabase/getTweets";
import React, { useTransition } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

dayjs.extend(relativeTime);

type TweetProps = {
  tweet: TweetType;
};

const Tweet = ({ tweet }: TweetProps) => {
  const user = useUser();
  let [isLikePending, startTransition] = useTransition();

  return (
    <div>
      <div
        key={tweet.id}
        className="border-b-[0.5px] border-gray-600 p-2 flex space-x-4 w-full"
      >
        <div>
          <div className="w-10 h-10 bg-slate-200 rounded-full" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center space-x-1 w-full">
              <div className="font-bold">{tweet.profiles.full_name ?? ""}</div>
              <div className="text-gray-500">@{tweet.profiles.username}</div>
              <div className="text-gray-500">
                <BsDot />
              </div>
              <div className="text-gray-500">
                {dayjs(tweet.created_at).fromNow()}
              </div>
            </div>
            <div>
              <BsThreeDots />
            </div>
          </div>
          <div className="text-white text-base">{tweet.text}</div>
          <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2"></div>
          <div className="flex items-center justify-start space-x-20 mt-2 w-full">
            <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
              <BsChat />
            </div>
            <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
              <AiOutlineRetweet />
            </div>
            <button
              onClick={() => {

                console.log(user)
                if (user) {
                  startTransition(() =>
                    likeTweet({
                      tweetId: tweet.id,
                      userId: user.id,
                    })
                  );
                } else {
                  toast("please login to like a tweet");
                }
              }}
              className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer"
            >
              <AiOutlineHeart />
            </button>
            <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
              <IoStatsChart />
            </div>
            <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
              <IoShareOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
