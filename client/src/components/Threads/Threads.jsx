import React, { useEffect, useState } from "react";
import Card from "./Card";
import Accounts from "./Accounts";

function Threads() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const storedData = sessionStorage.getItem("postData");
      if (storedData) {
        setData(JSON.parse(storedData));
        setIsLoading(false);
      } else {
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
            posts_array.push(...posts); 
          } catch (error) {
            console.error(error);
          }
        }
        const sortedPosts = posts_array.sort((a, b) => b.ups - a.ups);
        setData(sortedPosts);
        sessionStorage.setItem("postData", JSON.stringify(sortedPosts)); 
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const [accounts, setAccounts] = useState(null); 
  useEffect(() => {
    const fetchAccounts = async () => {
      const storedAccounts = sessionStorage.getItem("accountData");
      if (storedAccounts) {
        setAccounts(JSON.parse(storedAccounts));
      } else {
        const url =
          "https://www.reddit.com/subreddits/search.json?q=formula1&limit=15";
        try {
          const response = await fetch(url);
          const result = await response.json();
          const accountsData = result.data.children.map((child) => child.data);
          setAccounts(accountsData);
          sessionStorage.setItem("accountData", JSON.stringify(accountsData));
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="w-full h-full bg-black">
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
              data
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => <Card key={index} data={item} />)}
            <div>
              {isLoading ? null : (
                <div className="flex flex-row justify-between">
                  <button
                    className="md:block px-2 py-1 my-4 mx-4 cursor-pointer bg-[#FF0000] text-black font-bold rounded hover:bg-[#FF0000] hover:text-white flex-end"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="md:block px-2 py-1 my-4 mx-3 cursor-pointer bg-[#FF0000] text-black font-bold rounded hover:bg-[#FF0000] hover:text-white flex-end"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil((data ? data.length : 0) / itemsPerPage)
                    }
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
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
