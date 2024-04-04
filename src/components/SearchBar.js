import React, { useState, useEffect } from 'react';
import { CgSearch, CgDisplayGrid, CgList, CgRedo, CgAddR, CgMore, CgErase,
    CgArrowDown, CgArrowUp } from "react-icons/cg";
import '../style/searchbar.css';
import '../style/styles.css';

const SearchBar = ({    searchFunction,
                        columnList,
                        addFunction
                                                }) => {

    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [searchColumn, setSearchColumn] = useState('');
    const [searchText, setSearchText] = useState('');
    const [orderByColumn, setOrderByColumn] = useState('name');
    const [orderByDirection, setOrderByDirection] = useState('ASC');
    const [pageSize, setPageSize] = useState(6);

    useEffect(() => {
            searchFunction(searchText, searchColumn, orderByColumn, orderByDirection, pageSize);
    }, [searchText, searchColumn, orderByColumn, orderByDirection, pageSize]);

    const manualSearchCall = () => {
        searchFunction(searchText, searchColumn, orderByColumn, orderByDirection, pageSize);
    }

    const resetFilters = () => {
        setSearchText('');
        setSearchColumn('name');
        setOrderByColumn('name');
        setOrderByDirection('ASC');
    }

     const handleInputChange = function(text) {
        setTextInput(text);
        setSearchText(text);
     }

     const handlePageSizeChange = (pageSize) => {
        setPageSize(pageSize);
     }

    const toggleAdvancedSearch = () => {
        setAdvancedSearch(!advancedSearch);
    }

    const toggleOrderByDirection = () => {
        setOrderByDirection(orderByDirection === 'DESC' ? 'ASC' : 'DESC');
    }

    const eraseFilters = () => {
        setTextInput("");
        // Reset select elements to their initial or default values (if controlled)
        const selectElements = document.querySelectorAll('.search-selector select');
        selectElements.forEach(select => {
            select.selectedIndex = 1;
        });
        const searchInput = document.querySelectorAll('.search-input input');
        searchInput.forEach(input => {
            input.value = "";
        });
        resetFilters();
    }

    return (
        <div>
            <div className="search-bar">
                <div className="search-input">
                    <input
                        onChange={(e) => handleInputChange(e.target.value)}
                        value={textInput}
                        type="text"
                        placeholder="Search..."
                    />
                    <button onClick={() => manualSearchCall()}><CgSearch /></button>
                </div>
                <div className="selector search-selector">
                    <select
                        defaultValue=""
                        onChange={(e) => setSearchColumn(e.target.value)}
                    >
                        <option disabled>Column to filter: </option>
                        {columnList.map(column => (
                            <option key={column} value={column}>Search column: {column}</option>
                        ))}
                    </select>
                </div>
                <div className="search-display">
                    <button title="Advanced Options" onClick={() => toggleAdvancedSearch()}><CgMore /></button>
                    <button title="Reset filters" className="button-delete" onClick={() => eraseFilters()} title="Reset Filters"><CgErase /></button>
                    <button title="Add new" className="button-confirm"><CgAddR /></button>
                </div>
            </div>
            { advancedSearch &&
                <div className="search-bar search-bar-advanced">
                    <div className="selector search-selector">
                        <select
                            defaultValue=""
                            onChange={(e) => handlePageSizeChange(e.target.value)}
                        >
                            <option disabled>Page size</option>
                            <option value="6">page size: 6</option>
                            <option value="12">page size: 12</option>
                            <option value="24">page size: 24</option>
                            <option value="48">page size: 48</option>
                        </select>
                    </div>
                    <div className="selector search-selector">
                        <select
                            defaultValue=""
                            onChange={(e) => setOrderByColumn(e.target.value)}
                        >
                            <option disabled>Order by</option>
                            {columnList.map(column => (
                                <option key={column} value={column}>Order by: {column}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-display">
                        {orderByDirection === 'DESC' && <button title="DESCENDING" onClick={() => toggleOrderByDirection()} ><CgArrowDown /></button>}
                        {orderByDirection === 'ASC' && <button title="ASCENDING" onClick={() => toggleOrderByDirection()} ><CgArrowUp /></button>}
                        <button title="Refresh" className="button-orange" onClick={() => manualSearchCall()}><CgRedo /></button>
                        <button title="Display mode: CARDS"><CgDisplayGrid  /></button>
                        <button title="Display mode: TABLE"><CgList /></button>
                    </div>
                </div>
            }
        </div>
    );
};

export default SearchBar;
