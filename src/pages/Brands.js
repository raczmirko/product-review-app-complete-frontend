import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import "../style/styles.css";

const Brands = () => {
    const brands = [];
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
                console.log(data);
                return;
            } catch (error) {
                console.error('Error fetching session length:', error);
                return []; // Return an empty array if an error occurs
            }
        };


    return (
        <div>
            <PageHeader text="Brands" color="#81BE83" textColor="white"/>
            <SearchBar />
        </div>
      );
};

export default Brands;