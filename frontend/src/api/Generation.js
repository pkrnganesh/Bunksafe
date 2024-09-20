import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_PORT;

export const Generateanalysis = async ({ file, percentage, fromDate, toDate }) => {
    try {
        console.log("Data received:", { file, percentage, fromDate, toDate });
        
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

        return response.data; // Return the response data directly
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Server error:', error.response.data);
            throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Something went wrong'}`);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server:', error.request);
            throw new Error('No response from server, please try again later.');
        } else {
            // Something else happened
            console.error('Error generating analysis:', error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
};
