"use server";

import { supabaseServer } from ".";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { likes, replies } from "../db/schema";

export const likeTweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  await db
    .insert(likes)
    .values({
      tweetId,
      userId,
    })
    .catch((err) => {
      console.log(err);
    });

  revalidatePath("/");
};
export const unLikeTweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const { data, error } = await supabaseServer
    .from("likes")
    .delete()
    .eq("tweet_id", tweetId)
    .eq("user_id", userId);

  revalidatePath("/");
  console.log({ data, error });
};

export const reply = async ({
  tweetId,
  userId,
  replyText,
}: {
  tweetId: string;
  userId: string;
  replyText: string;
}) => {

  if(replyText === "") return; 

  await db.insert(replies).values({
    text: replyText,
    userId,
    tweetId,
  });
};
