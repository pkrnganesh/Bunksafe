import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const GenerateAnalysis = async ({ file, percentage, fromDate, toDate, onProgressUpdate }) => {
    console.log("Data received:", { file, percentage, fromDate, toDate });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('percentage', percentage);
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    console.log("API_URL:", API_URL);

    try {
        // Step 1: Initiate analysis
        const initiateResponse = await axios.post(`${API_URL}/process/initiate-analysis`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload progress: ${percentCompleted}%`);
                    onProgressUpdate(`Uploading: ${percentCompleted}%`);
                }
            },
        });
        
        const { jobId } = initiateResponse.data;
        console.log("Job initiated:", jobId);
        onProgressUpdate('Analysis initiated');

        // Step 2: Continue analysis until completion
        let status = 'processing';
        while (status !== 'completed' && status !== 'error') {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds

            const continueResponse = await axios.post(`${API_URL}/process/continue-analysis/${jobId}`, {
                percentage,
                fromDate,
                toDate
            });
            status = continueResponse.data.status;
            console.log("Current status:", status);
            onProgressUpdate(`Analysis status: ${status}`);
        }

        // Step 3: Get final result
        const finalResponse = await axios.get(`${API_URL}/process/analysis-status/${jobId}`);
        
        if (finalResponse.data.status === 'completed') {
            console.log("Analysis completed:", finalResponse.data.result);
            onProgressUpdate('Analysis completed');
            return finalResponse.data.result;
        } else {
            throw new Error('Analysis failed');
        }
    } catch (error) {
        console.error("Error in GenerateAnalysis:", error);
        onProgressUpdate('Error occurred during analysis');
        throw error;
    }
};
