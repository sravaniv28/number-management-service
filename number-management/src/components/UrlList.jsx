function UrlList({ urls, removeUrl }) {
  return (
    <div className="url-list">
      <h3>Added URLs</h3>

      {urls.length === 0 ? (
        <p>No URLs added</p>
      ) : (
        <ul>
          {urls.map((url, index) => (
            <li key={index}>
              <span>{url}</span>

              <button
                onClick={() =>
                  removeUrl(index)
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UrlList;