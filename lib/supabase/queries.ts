"use server";

import { Database } from "../supabase.types";
import { supabaseServer } from ".";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export type TweetType = Database["public"]["Tables"]["tweets"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
};

export const getTweets = async () => {
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
  }
