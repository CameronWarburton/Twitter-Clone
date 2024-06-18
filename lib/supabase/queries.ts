"use server";

import { Database } from "../supabase.types";
import { supabaseServer } from ".";
import { db } from "../db";
import { likes, profiles, tweets } from "../db/schema";
import { desc, eq } from "drizzle-orm";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export type TweetType = Database["public"]["Tables"]["tweets"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
};

// const queryWithCurrentUserId = `
// SELECT
//   tweets.*,
//   profiles.username,
//   profiles.full_name,
//   COUNT(likes.id) AS likes_count,
//   EXISTS (
//     SELECT 1
//     FROM likes
//     WHERE likes.tweet_id = tweets.id
//     AND likes.user_id = $1
//   ) AS user_has_liked
// FROM tweets
// LEFT JOIN likes ON tweets.id = likes.tweet_id
// JOIN profiles ON tweets.profile_id = profiles.id
// GROUP BY tweets.id, profiles.username, profiles.full_name
// ORDER BY tweets.created_at DESC;
// `;

// const queryWithoutCurrentUserId = `
// SELECT
//   tweets.*,
//   profiles.username,
//   profiles.full_name,
//   COUNT(likes.id) AS likes_count
// FROM tweets
// LEFT JOIN likes ON tweets.id = likes.tweet_id
// JOIN profiles ON tweets.profile_id = profiles.id
// GROUP BY tweets.id, profiles.username, profiles.full_name
// ORDER BY tweets.created_at DESC;
// `;

export const getTweets = async (currentUserID?: string) => {
  try {
    // const res = await db.query.tweets.findMany({
    //   with: {
    //     profile: {
    //       columns: {
    //         username: true,
    //         fullName: true,
    //       },
    //     },
    //   },
    // });
    let err = ""
    console.log(currentUserID);

    const res = await db
      .select()
      .from(tweets)
      .leftJoin(likes, eq(tweets.id, likes.tweetId))
      .innerJoin(profiles, eq(tweets.profileId, profiles.id))
      .orderBy(desc(tweets.createdAt))
      .limit(1)
      .catch(() => {
        err = "something went wrong while fetching all the tweets"
      })

      return {data:res, error:err}
  } catch (error) {
    console.log(error);
    return { error: "something wrong with querying the db" };
  }
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
