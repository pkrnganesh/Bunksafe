import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const FetchData = async (id) => {
    if (!id) {
        throw new Error('Missing id');
    }

    try {
        const response = await axios.get(`${API_URL}/incrementUserCount/fetchData/${id}`, {
            timeout: 120000,
        });

        console.log("Data fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export default FetchData;