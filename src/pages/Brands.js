import React, { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import DynamicTable from "../components/DynamicTable";
import "../style/styles.css";

const Brands = () => {
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
            <SearchBar />
            <DynamicTable data={transformedBrands} />
        </div>
      );
};

export default Brands;