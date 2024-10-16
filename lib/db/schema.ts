import {  InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  uuid,
  AnyPgColumn,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  username: text("username").notNull(),
  fullName: text("full_name").notNull(),
});

export type Profile = InferSelectModel<typeof profiles>

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  tweets: many(tweets),
  likes: many(likes),
  bookmarks: many(bookmarks),
  replies: many(replies),
}));

export const tweets = pgTable("tweets", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Tweet = InferSelectModel<typeof tweets>

export const tweetsRelations = relations(tweets, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [tweets.profileId],
    references: [profiles.id],
  }),
}));

export const hashtags = pgTable("hashtags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const tweetHashtag = pgTable(
  "tweet_hashtag",
  {
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweets.id),
    hashtagId: uuid("hashtag_id")
      .notNull()
      .references(() => hashtags.id),
  },
  (tweet_hashtag) => ({
    tweetHashtagPrimaryKey: primaryKey(
      tweet_hashtag.tweetId,
      tweet_hashtag.hashtagId
    ),
  })
);

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  tweetId: uuid("tweet_id").references(() => tweets.id),
  replyId: uuid("reply_id").references((): AnyPgColumn => replies.id), // self reference
});

export const repliesRelations = relations(replies, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [replies.userId],
    references: [profiles.id],
  }),
}));

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweets.id),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (likes) => ({
    uniqueLikeIndex: uniqueIndex("likes__user_id_tweet_id__idx").on(
      likes.userId,
      likes.tweetId
    ),
  })
);

export type Like = InferSelectModel<typeof likes>;

export const likesRelations = relations(likes, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [likes.userId],
    references: [profiles.id],
  }),
}));

export const bookmarks = pgTable(
  "bookmarks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => profiles.id)
      .notNull(),
    tweetId: uuid("tweet_id")
      .references(() => tweets.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (bookmarks) => ({
    uniqueBookmarkIndex: uniqueIndex("bookmarks__user_id_tweet_id__idx").on(
      bookmarks.userId,
      bookmarks.tweetId
    ),
  })
);

export const bookmarksRelations = relations(bookmarks, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [bookmarks.userId],
    references: [profiles.id],
  }),
}));
