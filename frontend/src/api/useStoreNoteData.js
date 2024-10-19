import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const StoreData = async ({ id, dataValue }) => {
    if (!id || !dataValue) {
        throw new Error('Missing id or dataValue');
    }

    try {
        const response = await axios.post(`${API_URL}/incrementUserCount/storeData`, 
            { id, dataValue },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 120000,
            }
        );

        console.log("Response received:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error storing data:", error);
        throw error;
    }
};