import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const API_URL = process.env.SERVER_PORT;

export const Generateanalysis = async ({ file, percentage, fromDate, toDate }) => {
    try {
        console.log("Data received", file, percentage, fromDate, toDate);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('percentage', percentage);
        formData.append('fromDate', fromDate);
        formData.append('toDate', toDate);

        // Make the POST request to the /basicanalysis endpoint
        const response = await axios.post(`${API_URL}/process/basicanalysis`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Response", response);
        return response;
    } catch (error) {
        console.error('Error generating analysis:', error);
        throw error;
    }
};
