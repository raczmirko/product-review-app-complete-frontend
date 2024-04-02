import React, { useState } from 'react';
import { CgSearch, CgDisplayGrid, CgList, CgRedo, CgAddR } from "react-icons/cg";
import '../style/searchbar.css';
import '../style/styles.css';

const SearchBar = ({ searchFunction, filterList, setFilter }) => {

    return (
        <div className="search-bar">
            <div className="search-input">
                <input onChange={searchFunction} type="text" placeholder="Search..." />
                <button><CgSearch /></button>
            </div>
            <div className="selector search-selector">
                <select onChange={(e) => setFilter(filterList[e.target.selectedIndex - 1])}>
                    <option value="">Select a filter</option>
                </select>
            </div>
            <div className="search-display">
                <button><CgDisplayGrid  /></button>
                <button><CgList /></button>
                <button className="button-orange" onClick={searchFunction}><CgRedo /></button>
                <button className="button-confirm"><CgAddR /></button>
            </div>
        </div>
    );
};

export default SearchBar;
