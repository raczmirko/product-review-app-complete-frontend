import React, { useState } from 'react';
import { CgTrash, CgCheckO, CgClose } from "react-icons/cg";
import "../style/table.css";

const DynamicTable = ({ data, deleteFunction }) => {
    const [tableData, setTableData] = useState(data);
    const [confirmDeleteRowId, setConfirmDeleteRowId] = useState(null);

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
            deleteFunction(id);
            const updatedData = tableData.filter(item => item.id !== id);
            setTableData(updatedData);
        };

        const showConfirmDelete = (rowId) => {
            setConfirmDeleteRowId(rowId);
        };

        const cancelDelete = () => {
            setConfirmDeleteRowId(null);
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
                <td className="action-table-cell">
                    {confirmDeleteRowId === row.id ? (
                        <>
                            <button className="button-confirm" onClick={() => handleDelete(row.id)}><CgCheckO  /></button>
                            <button className="button-delete" onClick={cancelDelete}><CgClose /></button>
                        </>
                    ) : (
                        <button className="button-delete" onClick={() => showConfirmDelete(row.id)}><CgTrash /></button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
};

export default DynamicTable;