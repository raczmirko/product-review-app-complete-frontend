import React, { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import DynamicTable from "../components/DynamicTable";
import "../style/styles.css";

const Brands = ({ setNotification }) => {
    const [brands, setBrands] = useState([]);

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

    const fetchBrands = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        try {
            const response = await fetch('http://localhost:8080/brand/all', { headers });
            const errorMessage = getNotificationTextByStatusCode(response.status);
            if (!response.ok) {
                setNotification({ type: "error", title:"error", text: "Failed to fetch brands with an error code " + errorMessage});
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setBrands(data);
            return;
        } catch (error) {
            console.error('Error fetching brands:', error);
            setNotification({ type: "error", title:"error", text: error});
            return []; // Return an empty array if an error occurs
        }
    };

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
            fetchBrands();
            setNotification({ type: "success", title:"success", text: "Brand successfully deleted."});
            return;
        } catch (error) {
            setNotification({ type: "error", title:"error", text: error});
            return []; // Return an empty array if an error occurs
        }
    };

    const modifyBrand = async () => {};

    const searchBrands = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(`http://localhost:8080/brand/search/`, {
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                const errorMessage = 'Failed to delete brand.';
                setNotification({ type: "error", title:"error", text: errorMessage});
                throw new Error(errorMessage);
            }
            fetchBrands();
            setNotification({ type: "success", title:"success", text: "Brand successfully deleted."});
            return;
        } catch (error) {
            console.error('Error deleting brand:', error);
            setNotification({ type: "error", title:"error", text: error});
            return []; // Return an empty array if an error occurs
        }
    };

    useEffect(() => {
        fetchBrands(); // Call fetchBrands when the component mounts
    }, []);

    const transformedBrands = brands.map(brand => ({
        id: brand.id,
        name: brand.name,
        nationality: brand.countryOfOrigin.name,
        description: brand.description
    }));

    return (
        <div>
            <PageHeader text="Brands" color="#81BE83" textColor="white"/>
            <SearchBar searchFunction={fetchBrands}/>
            <DynamicTable data={transformedBrands} deleteFunction={deleteBrand}/>
        </div>
      );
};

export default Brands;