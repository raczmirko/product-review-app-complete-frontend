import React from 'react';
import "../style/table.css";

const DynamicTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  // Extract column names from the keys of the first object
  const columnNames = Object.keys(data[0]);

  return (
    <table className="table">
      <thead>
        <tr>
          {/* Render table headers with column names */}
          {columnNames.map((columnName, index) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Render table rows with data */}
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columnNames.map((columnName, index) => (
              <td key={index}>{row[columnName]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;