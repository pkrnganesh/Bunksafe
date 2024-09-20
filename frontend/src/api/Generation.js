import axios from 'axios';
const API_URL = process.env.REACT_APP_SERVER_URL;

export const GenerateAnalysis = async ({ file, percentage, fromDate, toDate }) => {
    console.log("Data received:", { file, percentage, fromDate, toDate });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('percentage', percentage);
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    console.log("API_URL:", API_URL);  

    try {
        const response = await axios.post(${API_URL}/process/basicanalysis, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 120000,  
            onUploadProgress: (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(Upload progress: ${percentCompleted}%);
                 }
            },
        });

        console.log("Response received:", response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Utility function to handle Axios errors more cleanly
const handleAxiosError = (error) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // Server responded with a status code outside the range of 2xx
            console.error('Server error:', error.response.data);
            throw new Error(Server error ${error.response.status}: ${error.response.data.message || 'Something went wrong'});
        } else if (error.request) {
            // No response from the server
            console.error('No response from server:', error.request);
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timed out. The server took too long to respond.');
            } else {
                throw new Error('No response from server. Please check your internet connection and try again.');
            }
        } else {
            // Something happened in setting up the request
            console.error('Error setting up the request:', error.message);
            throw new Error(Error: ${error.message});
        }
    } else {
        // Some other error
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred. Please try again.');
    }
};
