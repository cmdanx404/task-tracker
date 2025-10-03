import React from "react";

function FilterButtons({ setFilter, filter }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => setFilter("all")}
        style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
      >
        All
      </button>
      <button
        onClick={() => setFilter("completed")}
        style={{ marginLeft: "10px", fontWeight: filter === "completed" ? "bold" : "normal" }}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter("pending")}
        style={{ marginLeft: "10px", fontWeight: filter === "pending" ? "bold" : "normal" }}
      >
        Pending
      </button>
    </div>
  );
}

export default FilterButtons;
