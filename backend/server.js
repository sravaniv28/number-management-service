const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 8008;

// mock APIs
app.get("/primes", (req, res) => {
  res.json({
    numbers: [2, 3, 5, 7, 11]
  });
});

app.get("/fibo", (req, res) => {
  res.json({
    numbers: [1, 2, 3, 5, 8, 13]
  });
});

app.get("/odd", (req, res) => {
  res.json({
    numbers: [1, 3, 5, 7, 9, 11]
  });
});

app.get("/rand", (req, res) => {
  res.json({
    numbers: [4, 7, 9, 13]
  });
});

// main endpoint
app.get("/numbers", async (req, res) => {
  try {
    let urls = req.query.url;

    if (!urls) {
      return res.status(400).json({
        error: "No URL provided"
      });
    }

    if (!Array.isArray(urls)) {
      urls = [urls];
    }

    console.log("URLs:", urls);

    let mergedNumbers = [];

    for (const url of urls) {
      try {
        const response = await fetch(url);

        const data = await response.json();

        if (
          data.numbers &&
          Array.isArray(data.numbers)
        ) {
          mergedNumbers.push(...data.numbers);
        }
      } catch (err) {
        console.log(
          `Failed for ${url}`
        );
      }
    }

    const uniqueSorted = [
      ...new Set(mergedNumbers)
    ].sort((a, b) => a - b);

    res.json({
      numbers: uniqueSorted
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});