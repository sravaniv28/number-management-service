function NumberList({ numbers }) {
  return (
    <div className="numbers-section">
      <h3>Numbers</h3>

      {numbers.length === 0 ? (
        <p>No data yet</p>
      ) : (
        <div className="numbers-box">
          {numbers.join(", ")}
        </div>
      )}
    </div>
  );
}

export default NumberList;