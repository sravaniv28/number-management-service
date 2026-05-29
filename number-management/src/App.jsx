import { useState } from "react";
import UrlInput from "./components/UrlInput";
import UrlList from "./components/UrlList";
import NumberList from "./components/NumberList";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addUrl = () => {
    if (!url.trim()) return;

    setUrls((prev) => [...prev, url]);
    setUrl("");
  };

  const removeUrl = (index) => {
    const updated = urls.filter((_, i) => i !== index);
    setUrls(updated);
  };

  const fetchNumbers = async () => {
    if (urls.length === 0) {
      setError("Please add at least one URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const query = urls
        .map((u) => `url=${encodeURIComponent(u)}`)
        .join("&");

      const api = `http://localhost:8008/numbers?${query}`;

      const response = await fetch(api);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setNumbers(data.numbers || []);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Number Management Frontend</h1>

        <UrlInput
          url={url}
          setUrl={setUrl}
          addUrl={addUrl}
        />

        <UrlList
          urls={urls}
          removeUrl={removeUrl}
        />

        <button
          className="fetch-btn"
          onClick={fetchNumbers}
        >
          Fetch Numbers
        </button>

        {loading && (
          <p className="loading">
            Loading...
          </p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <NumberList numbers={numbers} />
      </div>
    </div>
  );
}

export default App;