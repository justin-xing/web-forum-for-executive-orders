import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [presidentScores, setPresidentScores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresidentScores = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/president/relevance-score");
        const data = await res.json();
        setPresidentScores(data.presidents);
      } catch (error) {
        console.error("Error fetching president scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPresidentScores();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `/api/document/search?term=${encodeURIComponent(searchTerm)}`
    );
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
            className="mt-2 px-4 py-2 bg-[#264572] text-white rounded-md hover:cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {searchResults?.length > 0 ? (
        <div className="mx-auto max-w-2xl mt-8 mb-4 px-4">
          <div className="text-2xl mb-2">Search Results</div>
          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((doc, i) => (
              <Link
                key={i}
                to={`/document/${doc.executive_order_id}`}
                className="p-4 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <h3 className="font-medium text-blue-600 hover:underline">
                  {doc.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {doc.president} •{" "}
                  {new Date(doc.signing_date).toLocaleDateString()} • {doc.tag}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl  mb-4 px-4 italic text-gray-500">
          No search results found.
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-4 my-8">
        <h2 className="text-2xl font-bold mb-2">Presidents by Engagement</h2>
        {loading ? (
          <div className="text-center">Loading president data...</div>
        ) : (
          <div className="w-full max-w-xl space-y-3">
            {presidentScores?.map((pres, i) => (
              <Link
                className="text-xl hover:text-blue-600 hover:underline flex justify-between items-center px-6 py-3 bg-white shadow-sm rounded-lg border border-gray-200 hover:bg-gray-50"
                to={`/president/${pres.president.split(" ")[1]}`}
                key={i}
              >
                {pres.president}
                <div className="bg-blue-100 text-[#264572] px-3 py-1 rounded-full text-sm font-medium">
                  {pres.relevance_score} interactions
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="w-full max-w-xl mt-4">
          <Link
            className="text-xl hover:text-blue-600 hover:underline"
            to="/admin"
          >
            <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm rounded-lg border border-gray-200 hover:bg-gray-50">
              Admin
            </div>
          </Link>
        </div>

        <div className="w-full max-w-xl">
          <Link
            className="text-xl hover:text-blue-600 hover:underline"
            to="/controversial-comments"
          >
            <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm rounded-lg border border-gray-200 hover:bg-gray-50">
              Controversial Comments
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
