import React, { useState } from 'react';

interface SentimentResponse {
  sentiment: string; 
}

export default function TweetSentiment() {

  const [result, setResult] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setResult(null);

    const tweet = (e.target as any).elements.tweet.value; 

    const response = await fetch('/predict', {
      method: 'POST',
      body: JSON.stringify({text: tweet})
    });
    
    const data: SentimentResponse = await response.json();

    setResult(data.sentiment);
  }

  return (
    <div>
      <form onSubmit={submit}>
        <textarea name="tweet" />
        <button type="submit">Check Sentiment</button>
      </form>

      {result && <p>Sentiment: {result}</p>}
    </div>
  );
}