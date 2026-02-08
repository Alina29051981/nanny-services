// src/components/Filter.jsx
import React from "react";

const Filter = ({ sort, setSort, filterPrice, setFilterPrice }) => {
  return (
    <div className="flex gap-2 mb-4">
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2 rounded">
        <option value="asc">A → Z</option>
        <option value="desc">Z → A</option>
      </select>

      <input
        type="number"
        placeholder="min price"
        value={filterPrice[0]}
        onChange={(e) => setFilterPrice([Number(e.target.value), filterPrice[1]])}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="max price"
        value={filterPrice[1]}
        onChange={(e) => setFilterPrice([filterPrice[0], Number(e.target.value)])}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default Filter;
