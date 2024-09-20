import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_PORT;

export const Generateanalysis = async ({ file, percentage, fromDate, toDate }) => {
    console.log("Data received:", { file, percentage, fromDate, toDate });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('percentage', percentage);
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);

    try {
        const response = await axios.post(`${API_URL}/process/basicanalysis`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 120000, // 2 minutes timeout
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
                // You can update UI here to show upload progress
            }
        });
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server error:', error.response.data);
                throw new Error(`Server error ${error.response.status}: ${error.response.data.message || 'Something went wrong'}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response from server:', error.request);
                if (error.code === 'ECONNABORTED') {
                    throw new Error('Request timed out. The server took too long to respond.');
                } else {
                    throw new Error('No response from server. Please check your internet connection and try again.');
                }
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
                throw new Error(`Error: ${error.message}`);
            }
        } else {
            // Something else happened
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
};
