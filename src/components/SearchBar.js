import React, { useState } from 'react';
import { CgSearch } from "react-icons/cg";
import '../style/searchbar.css';
import '../style/styles.css';

const SearchBar = ({ searchFunction, filterList, setFilter }) => {

    return (
        <div className="search-bar">
            <div className="search-input">
                <input type="text" placeholder="Search..." />
                <button><CgSearch /></button>
            </div>
            <div className="selector">
                <select onChange={console.log("Typed something")}>
                    <option value="">Select a filter</option>

                </select>
            </div>
            <div className="search-display">
                <input type="text" placeholder="Search..." />
                <button><CgSearch /></button>
            </div>
        </div>
    );
};

export default SearchBar;
