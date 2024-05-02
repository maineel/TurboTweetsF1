import React, { useEffect, useState } from "react";
import Card from "./Card";
import Accounts from "./Accounts";

function Threads() {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const subreddit = [
        "formula1",
        "formuladank",
        "Formula1Point5",
        "F1Technical",
      ];
      const posts_array = [];
      for (let i = 0; i < subreddit.length; i++) {
        const url = `https://www.reddit.com/r/${subreddit[i]}.json?limit=100`;
        try {
          const response = await fetch(url);
          const result = await response.json();
          const posts = result.data.children.map((child) => child.data);
          posts_array.push(posts);
        } catch (error) {
          console.error(error);
        }
      }
      setData(posts_array.flat().sort((a, b) => b.ups - a.ups));
    };

    fetchData();
  }, []);

  const [accounts, setAccounts] = useState(null);
  useEffect(() => {
    const fetchAccounts = async () => {
      const url =
        "https://www.reddit.com/subreddits/search.json?q=formula1&limit=15";
      try {
        const response = await fetch(url);
        const result = await response.json();
        setAccounts(result.data.children.map((child) => child.data));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          className="text-3xl font-bold font-mono text-red-500"
        >
          Loading...
        </div>
      ) : (
        <div className="w-3/4 h-full flex flex-row text-black mx-auto border-t-4 border-[#FF0000] m-4">
          <div className="w-3/4 flex flex-col m-2">
            <h1 className="text-xl text-white font-bold ml-4">
              Top Posts: Formula 1
            </h1>
            {data &&
              data.map((item, index) => <Card key={index} data={item} />)}
          </div>
          <div className="bg-white m-2 h-full"></div>
          <div className=" w-1/4 flex flex-col m-2">
            <h1 className="text-xl text-white font-bold ml-4">
              Top Communities: Formula 1
            </h1>
            {accounts &&
              accounts.map((item, index) => (
                <Accounts key={index} accounts={item} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Threads;
