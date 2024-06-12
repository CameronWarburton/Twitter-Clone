"use server"

import { randomUUID } from "crypto";
import { supabaseServer } from ".";

export const likeTweet = async ({
    tweetId,
    userId,
  }: {
    tweetId: string;
    userId: string;
  }) => {

  
      const { data, error } = await supabaseServer.from("likes").insert({
        id: randomUUID(),
        tweet_id: tweetId,
        user_id: userId,
      });
  
      console.log({ data, error });
    }