import React, { useState } from 'react';
import { CgSearch, CgDisplayGrid, CgList, CgRedo, CgAddR, CgMore, CgErase } from "react-icons/cg";
import '../style/searchbar.css';
import '../style/styles.css';

const SearchBar = ({ searchFunction, filterList, setFilter, addFunction }) => {
    const [advancedSearch, setAdvancedSearch] = useState(false);

    const toggleAdvancedSearch = () => {
        setAdvancedSearch(!advancedSearch);
    }

    return (
        <div>
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
                    <button title="Advanced Options" onClick={toggleAdvancedSearch}><CgMore /></button>
                    <button title="Refresh" className="button-orange" onClick={searchFunction}><CgRedo /></button>
                    <button title="Add new" className="button-confirm"><CgAddR /></button>
                </div>
            </div>
            { advancedSearch &&
                <div className="search-bar search-bar-advanced">
                    <div className="selector search-selector">
                        <select onChange={(e) => setFilter(filterList[e.target.selectedIndex - 1])}>
                            <option value="">Maximum results per page</option>
                        </select>
                    </div>
                    <div className="selector search-selector">
                        <select onChange={(e) => setFilter(filterList[e.target.selectedIndex - 1])}>
                            <option value="">Order by</option>
                        </select>
                    </div>
                    <div className="search-display">
                        <button title="Reset Filters"><CgErase /></button>
                        <button title="Display mode: CARDS"><CgDisplayGrid  /></button>
                        <button title="Display mode: TABLE"><CgList /></button>
                    </div>
                </div>
            }
        </div>
    );
};

export default SearchBar;
