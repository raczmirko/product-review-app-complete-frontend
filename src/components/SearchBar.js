import React, { useState } from 'react';
import { CgSearch, CgDisplayGrid, CgList, CgRedo, CgAddR, CgMore, CgErase, CgArrowDown, CgArrowUp } from "react-icons/cg";
import '../style/searchbar.css';
import '../style/styles.css';

const SearchBar = ({    searchFunction,
                        columnList,
                        setFilter,
                        addFunction,
                        setSearchText,
                        setSearchColumn,
                        setPageSize,
                        setOrderByColumn,
                        setOrderByDirection
                                                }) => {
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [orderAsc, setOrderAsc] = useState(true);

    const toggleAdvancedSearch = () => {
        setAdvancedSearch(!advancedSearch);
    }
    const toggleOrderAsc = () => {
        setOrderAsc(!orderAsc);
        setOrderByDirection(orderAsc ? 'ASC' : 'DESC');
    }

    const handleInputChange = (event) => {
        const searchText = event.target.value;
        setSearchText(searchText);
        setSearchInput(searchText);
    };

    const resetFilters = () => {
        setOrderAsc(true);
        setSearchText("");
        setSearchInput("");
        setSearchColumn("");
        setPageSize("");
        setOrderByColumn("");
        setOrderByDirection("");
        // Reset select elements to their initial or default values (if controlled)
        const selectElements = document.querySelectorAll('.search-selector select');
        selectElements.forEach(select => {
            select.selectedIndex = 0;
        });
    }

    return (
        <div>
            <div className="search-bar">
                <div className="search-input">
                    <input value={searchInput} onChange={handleInputChange} type="text" placeholder="Search..." />
                    <button onClick={searchFunction} ><CgSearch /></button>
                </div>
                <div className="selector search-selector">
                    <select onChange={(e) => setSearchColumn(e.target.value)}>
                        <option value="" disabled selected>Select a filter</option>
                        {columnList.map(column => (
                            <option key={column} value={column}>{column}</option>
                        ))}
                    </select>
                </div>
                <div className="search-display">
                    <button title="Advanced Options" onClick={toggleAdvancedSearch}><CgMore /></button>
                    <button title="Refresh" className="button-orange" onClick={searchFunction}><CgRedo /></button>
                    <button title="Add new" className="button-confirm"><CgAddR /></button>
                </div>
            </div>
            { advancedSearch &&
                <div className="search-bar search-bar-advanced">
                    <div className="selector search-selector">
                        <select onChange={(e) => setPageSize(e.target.value)}>
                            <option value="" disabled selected>Page size</option>
                            <option value="6">page size: 10</option>
                            <option value="12">page size: 25</option>
                            <option value="24">page size: 50</option>
                            <option value="48">page size: 100</option>
                        </select>
                    </div>
                    <div className="selector search-selector">
                        <select onChange={(e) => setOrderByColumn(e.target.value)}>
                            <option value="" disabled selected>Order by</option>
                            {columnList.map(column => (
                                <option key={column} value={column}>{column}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-display">
                        {!orderAsc && <button onClick={toggleOrderAsc} title="ASCENDING"><CgArrowDown /></button>}
                        {orderAsc && <button onClick={toggleOrderAsc} title="DESCENDING"><CgArrowUp /></button>}
                        <button className="button-delete" onClick={resetFilters} title="Reset Filters"><CgErase /></button>
                        <button title="Display mode: CARDS"><CgDisplayGrid  /></button>
                        <button title="Display mode: TABLE"><CgList /></button>
                    </div>
                </div>
            }
        </div>
    );
};

export default SearchBar;
