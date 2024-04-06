import React, { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import DynamicTable from "../components/DynamicTable";
import DynamicCards from "../components/DynamicCards";
import CreateBrandModal from "../components/modals/CreateBrandModal";
import "../style/styles.css";
import { CgChevronRight , CgChevronLeft } from "react-icons/cg";

const Brands = ({ setNotification }) => {
    const [brands, setBrands] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [columnList, setColumnList] = useState(['name', 'countryOfOrigin', 'description']);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [displayMode, setDisplayMode] = useState('TABLE');

    const toggleShowModal = () => {
        setModalActive(!modalActive);
    }

    const transformedBrands = brands.map(brand => ({
        id: brand.id,
        name: brand.name,
        nationality: brand.countryOfOrigin.name,
        description: brand.description
    }));

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    const getNotificationTextByStatusCode = (code) => {
        let text = code + ": An error occurred, please try again later!";
        if(code === 400) {
            text = code + ": Bad request.";
        }
        if(code === 401) {
            text = code + ": Authentication failed. Log in again!";
        }
        if(code === 403) {
            text = code + ": You cannot access this page. Your session might have expired or you might need admin privileges to view.";
        }
        if(code === 404) {
            text = code + ": NOT FOUND.";
        }
        return text;
    }

    const deleteBrand = async (id) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(`http://localhost:8080/brand/${id}/delete`, {
                method: 'POST',
                headers,
            });
            const errorMessage = getNotificationTextByStatusCode(response.status);
            if (!response.ok) {
                setNotification({ type: "error", title:"error", text: "Failed to delete brand with an error code " + errorMessage});
                throw new Error(errorMessage);
            }
            searchBrands();
            setNotification({ type: "success", title:"success", text: "Brand successfully deleted."});
            return;
        } catch (error) {
            setNotification({ type: "error", title:"error", text: error});
            return []; // Return an empty array if an error occurs
        }
    };

    const modifyBrand = async () => {};

    const searchBrands = async (searchText, searchColumn, orderByColumn, orderByDirection, pageSize) => {
        if(searchText === undefined) searchText = '';
        if(searchColumn === undefined || searchColumn === '') searchColumn = 'name';
        if(orderByColumn === undefined || searchColumn === '') orderByColumn = 'name';
        if(orderByDirection === undefined) orderByDirection = 'ASC';
        if(pageSize === undefined) pageSize = 6;

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        let queryParams = `?pageSize=${pageSize}&pageNumber=${pageNumber}&orderByColumn=${orderByColumn}&orderByDirection=${orderByDirection}`;
        if (searchText) queryParams += `&searchText=${searchText}`;
        if (searchColumn) queryParams += `&searchColumn=${searchColumn}`;

        try {
            const response = await fetch(`http://localhost:8080/brand/search${queryParams}`, {
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                const errorMessage = 'Failed to find brands.';
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setBrands(data.content);
            setTotalPages(data.totalPages);
            return;
        } catch (error) {
            console.error('Error deleting brand:', error);
            return []; // Return an empty array if an error occurs
        }
    };

    useEffect(() => {
        searchBrands();
    }, [pageNumber, modalActive]);

    return (
        <div>
            <div className={`main-content ${modalActive ? 'blurred-background' : ''}`}>
                <PageHeader text="Brands" color="#81BE83" textColor="white"/>
                <SearchBar
                    searchFunction={searchBrands}
                    columnList={columnList}
                    setDisplayMode={setDisplayMode}
                    addFunction={toggleShowModal}
                />
                {displayMode === 'TABLE' && <DynamicTable data={transformedBrands} deleteFunction={deleteBrand}/>}
                {displayMode === 'CARDS' && <DynamicCards data={transformedBrands} deleteFunction={deleteBrand}/>}
            </div>
            {modalActive &&
                <div className="modal-container">
                    <CreateBrandModal
                        entityToAdd="brand"
                        closeFunction={toggleShowModal} />
                </div>
            }
            <div className={`pagination-container ${modalActive ? 'blurred-background' : ''}`}>
                <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}><CgChevronLeft /></button>
                <span>Page {pageNumber} of {totalPages}</span>
                <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === totalPages}><CgChevronRight /></button>
            </div>
        </div>
      );
};

export default Brands;