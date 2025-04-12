import React, { useState } from "react";
import "./App.css";

const years = Array.from({ length: 10 }, (_, i) => 2016 + i);
const regions = ["North", "South", "East", "West", "Central"];

// Sample data object
const initialData = Object.fromEntries(
  years.map((year) => [
    year,
    Object.fromEntries(regions.map((region) => [region, "N"])),
  ])
);

const App = () => {
  const [data, setData] = useState(initialData);
  const [year, setYear] = useState(2016);

  const handleInput = (y, r, val) => {
    if (val === "Y" || val === "N") {
      setData({
        ...data,
        [y]: { ...data[y], [r]: val },
      });
    }
  };

  const overlays = {
    North: { top: "10%", left: "30%", bg: "rgba(255,0,0,0.4)" },
    South: { top: "60%", left: "30%", bg: "rgba(0,255,0,0.4)" },
    East: { top: "35%", left: "60%", bg: "rgba(0,0,255,0.4)" },
    West: { top: "35%", left: "10%", bg: "rgba(255,255,0,0.4)" },
    Central: { top: "35%", left: "35%", bg: "rgba(255,0,255,0.4)" },
  };

  return (
    <div className="container">
      <div className="map-section">
        <h2>{year}</h2>
        <div className="map" style={{ backgroundImage: "url('/basin.png')" }}>
          {regions.map((r) =>
            data[year][r] === "Y" ? (
              <div
                key={r}
                className="overlay"
                style={{
                  top: overlays[r].top,
                  left: overlays[r].left,
                  backgroundColor: overlays[r].bg,
                }}
              >
                {r}
              </div>
            ) : null
          )}
        </div>
        <div className="controls">
          <button onClick={() => setYear(Math.max(2016, year - 1))}>Prev</button>
          <button onClick={() => setYear(Math.min(2025, year + 1))}>Next</button>
        </div>
      </div>
      <div className="chart-section">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              {regions.map((r) => (
                <th key={r}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {years.map((y) => (
              <tr key={y}>
                <td>{y}</td>
                {regions.map((r) => (
                  <td key={r}>
                    <input
                      value={data[y][r]}
                      onChange={(e) => handleInput(y, r, e.target.value.toUpperCase())}
                      maxLength={1}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
