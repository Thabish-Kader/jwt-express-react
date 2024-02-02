"use client";
import { getTweets } from "@/utils/apis/apis";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";

export const Tweets = () => {
  const [tweets, setTweets] = useState<Tweets[] | undefined>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getTweets(id, setTweets);
  }, []);

  return (
    <div className="mt-10 space-y-4 text-gray-400">
      <h1 className="text-2xl">Tweets</h1>
      {tweets?.map((tweet, i) => (
        <div key={i} className="border p-4 rounded-2xl">
          <p>{tweet.username}</p>
          <p>{tweet.tweet}</p>
          <p>{tweet.likes}</p>
          <p>{tweet.retweets}</p>
        </div>
      ))}
      <Toaster position="top-center" richColors />
    </div>
  );
};
