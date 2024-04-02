import React, { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import DynamicTable from "../components/DynamicTable";
import "../style/styles.css";

const Brands = ({ setNotification }) => {
    const [brands, setBrands] = useState([]);

    const fetchBrands = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        try {
            const response = await fetch('http://localhost:8080/brand/all', { headers });
            if (!response.ok) {
                throw new Error('Failed to fetch brands.');
            }
            const data = await response.json();
            setBrands(data);
            return;
        } catch (error) {
            console.error('Error fetching session length:', error);
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

    const modifyBrand = async () => {};

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