"use server";

import { Database } from "../supabase.types";
import { supabaseServer } from ".";
import { pool } from "../db";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export type TweetType = Database["public"]["Tables"]["tweets"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
};

export const getTweets = async () => {
  const ret = await pool.query(`SELECT tweets.*, COUNT(likes.id) AS likes_count,
    EXISTS (
    SELECT 1
    FROM likes
    WHERE likes.tweet_id = tweets.id
    AND likes.user_id = $1
    ) AS user_has_liked
     FROM tweets
     LEFT JOIN likes ON tweets.id = likes.tweets_id
     GROUP BY tweets.id
     ORDER BY tweets.created_at DESC;
     `, []);

  return await supabaseServer
    .from("tweets")
    .select(
      `
        *,
        profiles (
        full_name,
        username
        )
        `
    )
    .returns<TweetType[]>();
};

export const getLikesCount = async (tweetId: string) => {
  const res = await supabaseServer
    .from("likes")
    .select("id", {
      count: "exact",
    })
    .eq("tweet_id", tweetId);

  return res;
};

export const isLiked = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId?: string;
}) => {
  if (!userId) return false;

  const { data, error } = await supabaseServer
    .from("likes")
    .select("id")
    .eq("tweet_id", tweetId)
    .eq("user_id", userId)
    .single();

  return Boolean(data?.id);
};
