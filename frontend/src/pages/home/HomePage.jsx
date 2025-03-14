import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  // REPLACE: request query for unique presidents

  const [presidents, setPresidents] = useState([]);

  useEffect(() => {
    const fetchPresidents = async () => {
      const res = await fetch(`/api/president`);
      const data = await res.json();
      setPresidents(data.presidents);
      console.log(data.presidents);
    };
    fetchPresidents();
  }, []);

  return (
    <main>
      <div className="flex justify-around items-center bg-[#192e4c] py-[15px] px-[20px]">
        <div className="flex flex-col gap-5">
          <div className="text-white w-[400px]">
            An easier way to digest executive orders. We are an online forum for
            people to discuss past and present executive orders with their
            community.
          </div>
          <div className="text-white">For the people, by the people.</div>
        </div>
        <img src="home-pic.webp" alt="home-pic" className="h-[300px]" />
      </div>
      <div className="text-6xl text-center m-10">Options</div>
      <div className="flex gap-10 justify-center text-2xl">
        {presidents.map((pres, i) => (
          <Link
            className="hover:cursor-pointer hover:underline hover:text-blue-400"
            key={i}
            to={`/president/${pres}`}
          >
            {pres}
          </Link>
        ))}
        <div>
          <Link
            className="hover:cursor-pointer hover:underline hover:text-blue-400"
            to="/delete"
          >
            Delete
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
