import Tweet from "@/components/client-components/tweet";
import { db } from "@/lib/db";
import { likes, profiles, tweets } from "@/lib/db/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { and, eq, exists } from "drizzle-orm";

const TweetPage = async ({ params }: { params: { id: string } }) => {

    const supabaseClient = createServerComponentClient({
        cookies,
      });
    
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

    const tweet = await db
    .select({
        tweets,
        profiles,
        ...(userData.user?.id
          ? {
              hasLiked: exists(
                db
                  .select()
                  .from(likes)
                  .where(
                    and(
                      eq(likes.tweetId, tweets.id),
                      eq(likes.userId, userData.user?.id)
                    )
                  )
              ),
            }
          : {}),
        likes,
      })
      .from(tweets)
      .leftJoin(likes, eq(tweets.id, likes.tweetId))
      .innerJoin(profiles, eq(tweets.profileId, profiles.id))
      .limit(10)

  return (
    <main className="flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
     <Tweet 
     hasLiked
     />
    </main>
  );
};

export default TweetPage;
