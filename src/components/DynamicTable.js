import React, { useState } from 'react';
import { CgTrash } from "react-icons/cg";
import "../style/table.css";

const DynamicTable = ({ data }) => {
    const [tableData, setTableData] = useState(data);

      if (!data || data.length === 0) {
        return <p>No data available.</p>;
      }

      // Extract column names from the keys of the first object
      const columnNames = Object.keys(data[0]);

      const handleEdit = (id, field, value) => {
          // Find the record in the table data array
          const updatedData = tableData.map(item => {
            if (item.id === id) {
              return { ...item, [field]: value };
            }
            return item;
          });

          setTableData(updatedData);
        };

        const handleDelete = id => {
            console.log('deleting: ' + id)
            const updatedData = tableData.filter(item => item.id !== id);
            setTableData(updatedData);
        };

      return (
        <table className="table">
          <thead>
            <tr>
              {/* Render table headers with column names */}
              {columnNames.map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
                <th key="delete">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Render table rows with data */}
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columnNames.map((columnName, index) => (
                  <td key={index}>{row[columnName]}</td>
                ))}
                <td>
                  <button className="button-delete" onClick={() => handleDelete(row.id)}><CgTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
};

export default DynamicTable;