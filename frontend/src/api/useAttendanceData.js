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
            { subject: 'DM LAB', 'Total Classes': 32, 'Required for 75%': 24, 'Required for 40%': 13 },
            { subject: 'ADS', 'Total Classes': 30, 'Required for 75%': 23, 'Required for 40%': 12 },
            { subject: 'DM', 'Total Classes': 28, 'Required for 75%': 21, 'Required for 40%': 11 },
            { subject: 'Subject 1', 'Total Classes': 20, 'Required for 75%': 15, 'Required for 40%': 8 },
            { subject: 'Subject 2', 'Total Classes': 25, 'Required for 75%': 19, 'Required for 40%': 10 },
            { subject: 'Subject 3', 'Total Classes': 22, 'Required for 75%': 17, 'Required for 40%': 9 },
            { subject: 'Subject 4', 'Total Classes': 27, 'Required for 75%': 20, 'Required for 40%': 11 },
            { subject: 'Subject 5', 'Total Classes': 24, 'Required for 75%': 18, 'Required for 40%': 10 },
          ],
          attendanceData: [
            { day: '2024-01-01' },
            { day: '2024-01-02' },
            { day: '2024-01-03' },
            { day: '2024-01-04' },
            { day: '2024-01-05' },
            { day: '2024-01-06' },
            { day: '2024-01-07' },
            { day: '2024-01-08' },
            { day: '2024-01-09' },
            { day: '2024-01-10' },
            { day: '2024-01-11' },
            { day: '2024-01-12' },
            { day: '2024-01-13' },
            { day: '2024-01-14' },
            { day: '2024-01-15' },
            { day: '2024-01-16' },
            { day: '2024-01-17' },
            { day: '2024-01-18' },
            { day: '2024-01-19' },
            { day: '2024-01-20' },
            { day: '2024-01-21' },
            { day: '2024-01-22' },
            { day: '2024-01-23' },
            { day: '2024-01-24' },
            { day: '2024-01-25' },
            { day: '2024-01-26' },
            { day: '2024-01-27' },
            { day: '2024-01-28' },
            { day: '2024-01-29' },
            { day: '2024-01-30' },
          ],
          holidays: ['New Year', 'Independence Day', 'Christmas'],
          timetable: {
            Monday: ['DWDM', 'OOAD'],
            Tuesday: ['DM LAB', 'ADS LAB'],
            Wednesday:['OOAD', 'DWDM'],
            Thursday: ['ADS', 'DM'],
            Friday: ['DWDM', 'OOAD'],
            Saturday: ['ADS LAB', 'DM LAB'],
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