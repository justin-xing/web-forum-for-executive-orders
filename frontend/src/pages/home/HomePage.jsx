import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  // REPLACE: request query for unique presidents

  const [presidents, setPresidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPresidents = async () => {
      const res = await fetch("/api/president");
      const data = await res.json();
      setPresidents(data.presidents);
    };
    fetchPresidents();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/document/search?term=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    setSearchResults(data.documents);
  };

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
      <div className="mx-auto max-w-2xl mt-8 mb-4 px-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search executive orders by title..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      {searchResults?.length > 0 && (
        <div className="mx-auto max-w-2xl mt-8 mb-4 px-4">
          <div className="text-2xl mb-2">Search Results</div>
          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((doc, i) => (
              <Link
                key={i}
                to={`/document/${doc.executive_order_id}`}
                className="p-4 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <h3 className="font-medium text-blue-600 hover:underline">{doc.title}</h3>
                <p className="text-sm text-gray-600">
                  {doc.president} • {new Date(doc.signing_date).toLocaleDateString()} • {doc.tag}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
      
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
            to="/admin"
          >
            Admin
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
