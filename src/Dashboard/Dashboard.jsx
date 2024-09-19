import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate=useNavigate();
  const data = [
    {
      aadharNumber: '1233 1542 1542',
      name: 'Rajesh Kumar',
      mobileNumber: '9876543210',
      RoomNumber: '1',
      checkInTime: '2024-09-10 14:30',
      checkOutTime: 'NULL',
    },
    {
      aadharNumber: '1233 8574 1542',
      name: 'Amit Sharma',
      mobileNumber: '9876543211',
      RoomNumber: '2',
      checkInTime: '2024-09-10 15:00',
      checkOutTime: '2024-09-10 17:00',
    },
    {
      aadharNumber: '7854 1542 1542',
      name: 'Suresh Singh',
      mobileNumber: '9876543212',
      RoomNumber: '3',
      checkInTime: '2024-09-10 14:15',
      checkOutTime: '2024-09-10 16:45',
    },
    {
      aadharNumber: '1233 1542 1458',
      name: 'Vijay Patel',
      mobileNumber: '9876543213',
      RoomNumber: '4',
      checkInTime: '2024-09-10 13:00',
      checkOutTime: 'NULL',
    },
    {
      aadharNumber: '7854 1542 1542',
      name: 'Rahul Desai',
      mobileNumber: '9876543214',
      RoomNumber: '5',
      checkInTime: '2024-09-10 14:45',
      checkOutTime: '2024-09-10 17:30',
    },
    {
      aadharNumber: '2313 5478 3241',
      name: 'Arjun Yadav',
      mobileNumber: '9876543215',
      RoomNumber: '6',
      checkInTime: '2024-09-10 12:00',
      checkOutTime: 'NULL',
    },
    {
      aadharNumber: '8547 3214 7896',
      name: 'Kunal Roy',
      mobileNumber: '9876543216',
      RoomNumber: '7',
      checkInTime: '2024-09-10 12:45',
      checkOutTime: '2024-09-10 15:15',
    },
    {
      aadharNumber: '1452 8741 3652',
      name: 'Prakash Gupta',
      mobileNumber: '9876543217',
      RoomNumber: '8',
      checkInTime: '2024-09-10 11:30',
      checkOutTime: '2024-09-10 13:45',
    },
    {
      aadharNumber: '9875 1247 6589',
      name: 'Deepak Verma',
      mobileNumber: '9876543218',
      RoomNumber: '9',
      checkInTime: '2024-09-10 16:30',
      checkOutTime: '2024-09-10 18:45',
    },
    {
      aadharNumber: '2541 9865 1475',
      name: 'Manoj Thakur',
      mobileNumber: '9876543219',
      RoomNumber: '10',
      checkInTime: '2024-09-10 10:00',
      checkOutTime: '2024-09-10 12:00',
    },
  ];

  const handleLogout=()=>
  {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("name");
      localStorage.removeItem("adminId");
      localStorage.removeItem("mobileNumber");
      localStorage.removeItem("email");
      navigate("/");
  }

  return (
    <div className='dashboard_main'>
      <p className='dashboard-logout' onClick={handleLogout}>Logout</p>
      <h1 className='verification_title'>Next Gen Auth Face Authentication</h1>
      <h2 className='verification_subtitle'>Admin Dashboard</h2>
      
      <div className='dashboard_search'>
        <label>Search:</label>
        <input
          className='dashboard_searchInput'
          type='text'
          placeholder='Enter Aadhar Number'
        />
        <button className='dashboard_searchButton'>Search</button>
      </div>
      
      <table className='dashboard_table'>
        <thead>
          <tr>
            <th className='dashboard_tableHeader'>Aadhar Number</th>
            <th className='dashboard_tableHeader'>Name</th>
            <th className='dashboard_tableHeader'>Mobile Number</th>
            <th className='dashboard_tableHeader'>Room Number</th>
            <th className='dashboard_tableHeader'>Check-in Time</th>
            <th className='dashboard_tableHeader'>Check-out Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className='dashboard_tableCell'>{row.aadharNumber}</td>
              <td className='dashboard_tableCell'>{row.name}</td>
              <td className='dashboard_tableCell'>{row.mobileNumber}</td>
              <td className='dashboard_tableCell'>{row.RoomNumber}</td>
              <td className='dashboard_tableCell'>{row.checkInTime}</td>
              <td className='dashboard_tableCell'>{row.checkOutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
