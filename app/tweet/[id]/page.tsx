import Tweet from "@/components/client-components/tweet";
import { db } from "@/lib/db";
import { likes, profiles, tweets } from "@/lib/db/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { and, eq, exists } from "drizzle-orm";
import { getTweets } from "@/lib/supabase/queries";

const TweetPage = async ({ params }: { params: { id: string } }) => {
  const supabaseClient = createServerComponentClient({
    cookies,
  });

  const { data: userData, error: userError } =
    await supabaseClient.auth.getUser();

  const tweet = await getTweets(userData.user?.id, params.id);

  const replies = await db.query.replies.findMany({
    with: {
      profile: true,
    },
  });

  console.log(replies);

  return (
    <main className="flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      {tweet ? (
        <Tweet
          hasLiked={Boolean(tweet[0].hasLiked)}
          likesCount={tweet[0].likes.length ?? 0}
          tweet={{
            tweetDetails: tweet[0].tweet,
            userProfile: tweet[0].profile,
          }}
          currentUserId={userData.user?.id}
        />
      ) : (
        <div>no tweet found</div>
      )}
    </main>
  );
};

export default TweetPage;
