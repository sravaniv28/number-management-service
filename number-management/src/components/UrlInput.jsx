function UrlInput({ url, setUrl, addUrl }) {
  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Enter API URL"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
      />

      <button onClick={addUrl}>
        Add URL
      </button>
    </div>
  );
}

export default UrlInput;