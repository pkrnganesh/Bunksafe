import { useState, useEffect } from 'react';

const useAttendanceData = () => {
  const [data, setData] = useState({
    summaryData: {},
    subjectData: [],
    attendanceData: [],
    holidays: [],
    timetable: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating API call or data fetching
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        const mockData = {
          summaryData: {
            'Total Days': 96,
            'Days to Attend': 72,
            'Days Can Skip': 24,
          },
          subjectData: [
            { subject: 'DWDM', 'Total Classes': 29, 'Required for 75%': 22, 'Required for 40%': 12 },
            { subject: 'OOAD', 'Total Classes': 32, 'Required for 75%': 24, 'Required for 40%': 13 },
            // Add more subjects here
          ],
          attendanceData: [
            { day: '2024-01-01', value: 0 },
            { day: '2024-01-02', value: 1 },
            // Add more attendance data here
          ],
          holidays: ['New Year', 'Independence Day', 'Christmas'],
          timetable: {
            Monday: ['DWDM', 'OOAD'],
            Tuesday: ['DM LAB', 'ADS LAB'],
            // Add more days here
          },
        };

        setData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading };
};

export default useAttendanceData;